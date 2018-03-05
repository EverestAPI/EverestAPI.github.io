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
- Select the template `Class Library` (or `Class Library (.NET Framework)` or matching).
- Name your mod appropriately and create it in a new solution.
- Create a new directory for the solution.

The dialog should look like this:

![1-newproj](/images/firstcodemod/1-newproj.png)

## Adding Everest and Celeste

Now that you've created a new, empty project, it's time to add the Everest API.

### Adding Everest files

If your new project is a git repository, add Everest as a submodule.  
CLI command: `git submodule add https://github.com/EverestAPI/Everest.git`

Otherwise, download the Everest source code .zip ([master](https://github.com/EverestAPI/Everest/archive/master.zip), [stable](https://github.com/EverestAPI/Everest/archive/stable.zip)) and place it as `Everest` in your project directory.

The file layout should look similar to this:

![2-everestdir](/images/firstcodemod/2-everestdir.png)

### Adding Everest project

In Visual Studio, right-click the _solution_ and add the existing Everest project.

![3-addeverestproj](/images/firstcodemod/3-addeverestproj.png)

Navigate to where your project is, then into the Everest submodule, then Celeste.Mod.mm, then the matching `.csproj` project file.

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

## Recommended NuGet packages

**We're recommending you to install the following NuGet packages:**
- `Microsoft.Net.Compilers` - Maintain build compatibility on systems with older C# compilers installed.
- `System.ValueTuple` - Used by HookedMethod.
- `Mono.Cecil` - Used by HookedMethod and MonoMod. IL manipulation library. **0.10.0 or newer required**
- `HookedMethod` - Hook Celeste methods witr ease at runtime. **0.3.1 or newer required**

> [!IMPORTANT]
> Make sure to go into the properties of the Mono.Cecil and HookedMethod references and set "Copy Local" to "False", otherwise Visual Studio will include outdated / conflicting copies in your mod.

## Module class

## Settings class

## SaveData class
