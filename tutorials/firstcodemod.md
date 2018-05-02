---
title: "Your First Code Mod"
_description: "What project template do I use? How do I make my options show up? This chapter lists some common code mod setup information."
---

# Your First Code Mod

----

<!-- TODO: Get > [!PREREQUISITES] working -->
<div class="PREREQUISITES">
<h5>PREREQUISITES</h5>
<p>
<li>Everest: [Website](/)</li>
<li>Visual Studio 2015 or newer. MonoDevelop instructions are different.</li>
<li>NuGet, both for CLI and VS: [Downloads](https://www.nuget.org/downloads)
    <ul>
        <li>Mono already ships with the `nuget` command-line command.</li>
        <li>Make sure that `nuget.exe` is in a directory on your PATH. If you're on Windows and lazy, drop it in System32 **at your own risk.**</li>
    </ul>
</li>
<li>_Optional:_ git, either [CLI](https://git-scm.com/downloads) or GUI client (f.e. [GitHub Desktop](https://desktop.github.com/))</li>
</p>
</div>

----

## Project setup

Every Everest code mod starts out as a C# (.NET Framework) class library targeting the .NET Framework 4.5.2 (same as Celeste itself).

- Create a new project.
- In the top bar, select `.NET Framework 4.5.2`
- In the left bar, select `Installed` > `Visual C#`
- Select the template `Class Library` or `Class Library (.NET Framework)` (**not** `Standard`, `Core`, `Portable`, `Universal Windows`, ...).
- Name your mod appropriately and create it in a new solution.
- Create a new directory for the solution.

The dialog should look like this:

![1-newproj](/images/firstcodemod/1-newproj.png)

## Adding Everest and Celeste

Now that you've created a new, empty project, it's time to add the Everest API.

### Adding Everest files

If your new project is a git repository, add Everest as a submodule.  
CLI command:

```
git submodule add https://github.com/EverestAPI/Everest.git
```

Otherwise, download the Everest source code .zip ([master](https://github.com/EverestAPI/Everest/archive/master.zip), [stable](https://github.com/EverestAPI/Everest/archive/stable.zip)) and place it as `Everest` in your project directory.

After adding Everest, open a terminal (cmd, bash) in the Everest directory and execute the following command:

```
nuget restore Everest.sln
```

The file layout should look similar to this:

![2-everestdir](/images/firstcodemod/2-everestdir.png)

### Adding Everest project

In Visual Studio, right-click the _solution_ and add the existing Everest project.

![3-addeverestproj](/images/firstcodemod/3-addeverestproj.png)

Navigate to where your project is, then into the Everest submodule, then Celeste.Mod.mm, then the matching `.csproj` project file.

Afterwards, right-click on Celeste.Mod.mm and build it.

Everest (Celeste.Mod.mm) should now exist as a project in your solution like this:

![4-addedeverestproj](/images/firstcodemod/4-addedeverestproj.png)

### Adding References

**Everest comes with most of its dependencies in the `lib` and `lib-stripped` subdirectories.**
- `lib` contains `.dlls` (and `MonoMod.exe`) ready to be used by your mod as-is.
- `lib-stripped` contains copies of a select few game binaries, stripped with `mono-cil-strip`. They don't contain any executable code and only contain the definitions for you to compile against.

> [!NOTE]
> Everest mods are built with the [FNA branch of Celeste](https://fna-xna.github.io/) to make use of its [API extensions](https://github.com/FNA-XNA/FNA/wiki/5:-FNA-Extensions) and for cross-platform compatibility. **Everest will relink your mod from FNA to XNA at runtime.**

Right-click your project's "References" and select "Add Reference...", then set up the references so that they look like in the following screenshot:

![5-addedeverestrefs](/images/firstcodemod/5-addedeverestrefs.png)

> [!IMPORTANT]
> Make sure to go into the properties of each included reference and set "Copy Local" to "False", otherwise Visual Studio will include outdated / conflicting copies in your mod.

> [!IMPORTANT]
> If you want to maintain cross-platform compatibility, make sure to remove any .NET Framework references not on this list.
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
> This means: Microsoft.CSharp, System.Windows.Anything, System.IO.Compression and other libraries are not available on Linux / macOS.  
> For an up-to-date list, check the [list of precompiled MonoKickstart libraries](https://github.com/flibitijibibo/MonoKickstart/tree/master/precompiled), as Celeste uses them for Linux / macOS.

## Recommended NuGet packages

**We're recommending you to install the following NuGet packages:**
- `Microsoft.Net.Compilers` - Maintain build compatibility on systems with older C# compilers installed. **Latest version recommended**
- `System.ValueTuple` - Used by HookedMethod.
- `Mono.Cecil` - Used by HookedMethod and MonoMod. IL manipulation library. **0.10.0 or newer required**
- `HookedMethod` - Hook methods with ease at runtime. **0.3.1 or newer required**

> [!IMPORTANT]
> Make sure to go into the properties of the Mono.Cecil and HookedMethod references and set "Copy Local" to "False", otherwise Visual Studio will include outdated / conflicting copies in your mod.

## Module class

Your module class should look similar to the example.

> [!NOTE]
> This example only shows a subset of Everest's capabilities.  
> [**Read the full `EverestModule` documentation here.**](https://everestapi.github.io/api/Celeste.Mod.EverestModule.html)

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
[**Read the full `EverestModuleSettings` documentation here.**](https://everestapi.github.io/api/Celeste.Mod.EverestModuleSettings.html)
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

- **Everest.Events:** This is a very restricted event listening method built in to Everest, and is only used when Everest needs to do work behind the scenes for you. You can't control when the original method runs.
- **MMHOOK_Celeste.dll:** This auto-generated file allows you to hook to all Celeste methods as if they were events. You are responsible to run the original method. Also, **you need to install Everest on the OpenGL / FNA version of the game to auto-generate a working .dll**, otherwise you'll need the Windows-only and obsolete XNA Framework to even compile your mod. [Take a look at an example in GhostNet here.](https://github.com/EverestAPI/GhostMod/blob/75bfd526210d151b20ec417757e4cbe4436de16c/GhostNetMod/GhostNetHooks.cs#L18)

If you're interested in runtime lower-level detouring, take a look at [HookedMethod.Hook](https://github.com/EverestAPI/HookedMethod/blob/master/Examples/Program.cs). If you're interested in the lowest level of detouring, take a look at [MonoMod.RuntimeDetour](https://github.com/0x0ade/MonoMod/tree/master/MonoMod.RuntimeDetour), which also powers `MMHOOK_Celeste.dll`.

