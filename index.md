---
title: "Everest - Celeste Mod Loader"
_appTitle: ""
---

<!-- .h1 is styled by the default DocFX theme. -->
<h1 class="h1 main-header">Everest</h1>

----

<p style="float: right;">[![Discord invite](/images/invite.png)](https://discord.gg/6qjaePQ)</p>

Everest is an [open-source](https://github.com/EverestAPI) mod loader and modding API, making texture replacements, custom level sets and endless code mods a reality.

**Install Everest before installing other mods. For a list of mods, visit [GameBanana](https://gamebanana.com/games/6460)**

If you've got any issues with Everest, we're in the #game_modding channel of this Discord server to help you:

## Installing Everest

### Windows auto-installer
- [**Download the latest installer `.exe`**](https://gamebanana.com/tools/download/6449) and run it.
- If Windows SmartScreen blocks it, tell it to run anyway.
- Follow the steps in the installer.

### Linux auto-installer (EverInst)
- [**Download the latest installer AppImage**](https://gamebanana.com/tools/download/6630) and run it.
- Follow the steps in the installer.

### Cross-platform manual installation
- Download the latest autobuild ([latest version](https://dev.azure.com/EverestAPI/Everest/_build/latest?definitionId=3&branchName=master), [latest stable version](https://dev.azure.com/EverestAPI/Everest/_build/latest?definitionId=3&branchName=stable)). Click the "Artifacts" button on the top-right of the page, then "main" to download it.
- Extract the `.zip`'s main folder to where Celeste is installed. `Celeste.Mod.mm.dll` should be right next to `Celeste.exe`
    - macOS: Right-click and browse the Celeste app in Finder, then naviagte to `Contents`, then `MacOS`.
- Delete the `orig` folder if it exists.
- Run `MiniInstaller.exe`
    - Linux / macOS: [Install the mono runtime](https://www.mono-project.com/download/stable/), open a terminal window where Celeste is and run `mono MiniInstaller.exe`

## Features
In no specific order:
- In-game Everest updater
- Cross-version and cross-platform compatibility
- Easy mod support without messing with your original files
    - Code mods
    - Audio replacements and additions via custom FMOD banks
    - Graphic replacements and additions
    - Custom texts (f.e. map names, dialogues)
    - Custom maps
    - Your own content via the highly flexible mod content and hooking API
- Easily change hidden options in-game (debug mode and FMOD sync)
- Sound test
- Quality of life improvements:
    - Discord Rich Presence
    - Keyboard input when renaming your savegame
    - Info about saved and lost progress when returning to map
- Debug mode improvements:
    - F5 to reload the map .bin without losing progress
    - CTRL + F5 to quick-reload the entire game and all mods without losing progress
    - F6 to quickly open the leftover in-game map layout utility
    - `.` to open and `q<enter>` to close the command line on keyboards without tilde key
- Features for custom maps:
    - Unhardcoded Badeline chasers with custom ending barrier
    - Custom core messages and memorials without replacing the original texts / sprites
    - Session flag triggers
    - Restore beta "trigger spikes"
    - Unhardcoded dust entities for non-resort levels
    - Unhardcoded crystal colors
    - Two new cassette blocks: emerald and marigold
    - Stationary fireballs without crashing the game
    - Fixed rotating blade starting angle calculation
    - Auto-fix and auto-fill, f.e. strawberry order, checkpoints in menu, fixed screen wrap in space rooms
    - Map `.meta.yaml` for previously hardcoded properties, f.e. cassette song or default core mode
    - Custom chapter complete screens
- And many other smaller changes

## Installing mods
- Find a mod you like on [GameBanana](https://gamebanana.com/games/6460)
- Press the 1-click installation button.
    - If the 1-click installer doesn't work, put the mod `.zip` into the `Mods` directory where Celeste is.
    - For prototyping, feel free to use a folder instead of a `.zip`
- That's it. No need to extract anything.

## Compiling Everest yourself
- ***If you just want to install Everest, go to [Installing Everest](#installing-everest).***
- If you've **previously installed Everest and updated Celeste** or switched betas / branches, delete the `orig` directory where Celeste is installed.
    - macOS: Right-click and browse the Celeste app in Finder, then naviagte to `Contents`, then `MacOS`.
- Clone the [Everest repo](https://github.com/EverestAPI/Everest), either in your IDE, via the CLI, or by downloading the .zip from GitHub.
- Restore Nuget packages either via your IDE or the command line.

### Windows
- Open the .sln in the repo with Visual Studio
- Build all
- Copy everything in `MiniInstaller\bin\Debug` and `Celeste.Mod.mm\bin\Debug` to your Celeste directory
- Run MiniInstaller.exe

### macOS / Linux (no Nix)
- [Install the mono runtime](https://www.mono-project.com/download/stable/)
- Build all
    - _With MonoDevelop:_ Open the .sln in the repo with MonoDevelop
    - _Manually:_ Open the terminal in the Everest directory and run `msbuild` or `xbuild`
- Copy everything in `MiniInstaller/bin/Debug` and `Celeste.Mod.mm/bin/Debug` to your Celeste directory
    - macOS: `Celeste.app/Contents/MacOS`
- Run `mono MiniInstaller.exe`

### Nix
- Run `nix-env -f . -iA everest` in the Everest repo
- Wait for it to install
- Run `miniinstaller ~/Celeste`, where `~/Celeste` is your Celeste path.
    - **`miniinstaller` is a *wrapper* over the MiniInstaller.exe in the other methods.**
