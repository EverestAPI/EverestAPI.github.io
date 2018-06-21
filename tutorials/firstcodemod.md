---
title: "Your First Code Mod"
_description: "What project template do I use? How do I make my options show up? This page lists some common code mod setup information."
---

# Your First Code Mod

----

<!-- TODO: Get > [!PREREQUISITES] working -->
<div class="PREREQUISITES">
<h5>PREREQUISITES</h5>
<p>
<li>Everest: [Website](/)</li>
<li>Visual Studio 2015 or newer. MonoDevelop instructions are different.</li>
</p>
</div>

----

Every Everest code mod starts out as a C# (.NET Framework) class library targeting the .NET Framework 4.5.2 (same as Celeste itself).

## Project setup

> [!NOTE]
> If you want a more traditional C# project setup, follow the [old advanced project setup instructions](https://github.com/EverestAPI/EverestAPI.github.io/blob/a789878761965db62c4f3c98f2bda58828e307a4/tutorials/firstcodemod.md#project-setup).

This setup doesn't require NuGet or git, but if you're a Windows user, you'll need to switch to the OpenGL branch. Linux and macOS users are already using FNA. **Everest will relink your mod from FNA to XNA at runtime.**
- In Steam, right-click the game in your library, select "Properties" and select the `opengl` "beta".
- In itch, &lt;insert itch instructions here&gt;

After the update has finished, make sure to reinstall Everest.

- Open your C# IDE (f.e. Visual Studio 2015).
- Create a new project.
- In the top bar, select `.NET Framework 4.5.2`
- In the left bar, select `Installed` > `Visual C#`
- Select the template `Class Library` or `Class Library (.NET Framework)` (**not** `Standard`, `Core`, `Portable`, `Universal Windows`, ...).
- Create your mod in Celeste/Mods

The dialog should look like this:

![1-newproj](/images/firstcodemod/1-newproj.png)

- Create a new `everest.yaml` text file with the following content:

```yaml
- Name: YourMod
  Version: 1.0.0
  DLL: Code/bin/Debug/YourMod.dll
  Dependencies:
    - Name: Everest
      Version: 1.0.0
```

> [!NOTE]
> For more info about the mod structure, the `everest.yaml` format, how to add extra content and on how to zip up your mod, [read the mod structure page](/tutorials/modstruct.html).

- Right-click your project's "References" and select "Add Reference...", then "Browse..." into your Celeste installation directory and setup your references like on the following screenshot:

![2-refs](/images/firstcodemod/2-refs.png)

> [!IMPORTANT]
> Make sure to select all those references, right-click > "Properties" and set "Copy Local" to "False", or you will accidentally include copies of those files in your mod!

> [!IMPORTANT]
> If you want to maintain cross-platform compatibility, make sure to only use .NET Framework system libraries from this list.
> - System
> - System.Configuration
> - System.Core
> - System.Data
> - System.Drawing (available, but behaves unpredictably)
> - System.Runtime.Serialization
> - System.Security
> - System.Xml
> - System.Xml.Linq
>
> This means: Microsoft.CSharp, System.Windows.Anything, System.IO.Compression and other libraries must be removed from your references.  
> For an up-to-date list, check the [list of precompiled MonoKickstart libraries](https://github.com/flibitijibibo/MonoKickstart/tree/master/precompiled), as Celeste uses them for Linux / macOS.

## Module class

Your module class should look similar to the example.

> [!NOTE]
> This example only shows a subset of Everest's capabilities.  
> [**Read the full `EverestModule` documentation here.**](/api/Celeste.Mod.EverestModule.html)

```cs
// Example usings.
using Celeste.Mod.UI;
using FMOD.Studio;
using Microsoft.Xna.Framework;
using Monocle;
using Celeste;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Celeste.Mod.Example {
    public class ExampleModule : EverestModule {

        // Only one alive module instance can exist at any given time.
        public static ExampleModule Instance;

        public ExampleModule() {
            Instance = this;
        }

        // If you don't need to store any settings, => null
        public override Type SettingsType => typeof(ExampleSettings);
        public static ExampleSettings Settings => (ExampleSettings) Instance._Settings;

        // If you don't need to store any save data, => null
        public override Type SaveDataType => typeof(ExampleSaveData);
        public static ExampleSaveData SaveData => (ExampleSaveData) Instance._SaveData;

        // Set up any hooks, event handlers and your mod in general here.
        // Load runs before Celeste itself has initialized properly.
        public override void Load() {
        }

        // Optional, initialize anything after Celeste has initialized itself properly.
        public override void Initialize() {
        }

        // Optional, do anything requiring either the Celeste or mod content here.
        public override void LoadContent() {
        }

        // Unload the entirety of your mod's content, remove any event listeners and undo all hooks.
        public override void Unload() {
        }

    }
}
```

## Settings / SaveData class

Your settings class should look similar to the example.

Save data classes are very similar, but inherit from `EverestModuleSaveData` and the `Setting*` attributes are ignored.

> [!NOTE]
> **All entries must be properties**, unless you're overriding `LoadSettings` and `SaveSettings` / `LoadSaveData` and `SaveSaveData` to bypass YamlDotNet's restrictions.
>
> This example only shows a subset of Everest's capabilities.  
[**Read the full `EverestModuleSettings` documentation here.**](/api/Celeste.Mod.EverestModuleSettings.html)
>
> For all settings attributes, search for `Celeste.Mod.Setting` in the Everest API.

```cs
// Example usings.
using Celeste;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using YamlDotNet.Serialization;

namespace Celeste.Mod.Example {
    // If no SettingName is applied, it defaults to
    // modoptions_[typename without settings]_title
    // The value is then used to look up the UI text in the dialog files.
    // If no dialog text can be found, Everest shows a prettified mod name instead.
    [SettingName("modoptions_examplemodule_title")]
    public class ExampleModuleSettings : EverestModuleSettings { 

        // SettingName also works on props, defaulting to
        // modoptions_[typename without settings]_[propname]

        // Example ON / OFF property with a default value.
        public bool ExampleSwitch { get; set; } = false;

        [SettingIgnore] // Hide from the options menu, but still load / save it.
        public string ExampleHidden { get; set; } = "";

        [SettingRange(0, 10)] // Allow choosing a value from 0 (inclusive) to 10 (inclusive).
        public int ExampleSlider { get; set; } = 5;

        [SettingRange(0, 10)]
        [SettingInGame(false)] // Only show this in the main menu.
        public int ExampleMainMenuSlider { get; set; } = 5;

        [SettingRange(0, 10)]
        [SettingInGame(true)] // Only show this in the in-game menu.
        public int ExampleInGameSlider { get; set; } = 5;

        [YamlIgnore] // Don't load / save it, but show it in the options menu.
        [SettingNeedsRelaunch] // Tell the user to restart for changes to take effect.
        public bool LaunchInDebugMode {
            get {
                return Settings.Instance.LaunchInDebugMode;
            }
            set {
                Settings.Instance.LaunchInDebugMode = value;
            }
        }

        public int SomethingWeird { get; set; } = 42;

        // Custom entry creation methods are always called Create[propname]Entry
        // and offer an alternative to overriding CreateModMenuSection in your module class.
        public void CreateSomethingWeirdEntry(TextMenu menu, bool inGame) {
            // Create your own menu entry here.
            // Maybe you want to create a toggle for an int property?
        }

    }
}
```

## Hooking Methods
You should only care about the following two ways to hook methods:

- **Everest.Events:** This is a very restricted event listening method built into Everest, and is only used when Everest needs to do work behind the scenes for you. You can't control when the original method runs.
- **MMHOOK_Celeste.dll:** This auto-generated file allows you to hook to all Celeste methods as if they were events. You are responsible to run the original method. Also, **you need to install Everest on the OpenGL / FNA version of the game to auto-generate a working .dll**, otherwise you'll need the Windows-only and obsolete XNA Framework to even compile your mod. [Take a look at an example in GhostNet here.](https://github.com/EverestAPI/GhostMod/blob/75bfd526210d151b20ec417757e4cbe4436de16c/GhostNetMod/GhostNetHooks.cs#L18)

If you're interested in lower-level runtime detouring, take a look at [HookedMethod.Hook](https://github.com/EverestAPI/HookedMethod/blob/master/Examples/Program.cs), available via NuGet. Make sure to set it and its dependencies' "Copy Local" property to "False", as Everest provides them for you.  
If you're interested in the lowest level of detouring, take a look at [MonoMod.RuntimeDetour](https://github.com/0x0ade/MonoMod/tree/master/MonoMod.RuntimeDetour), which also powers `MMHOOK_Celeste.dll`.

