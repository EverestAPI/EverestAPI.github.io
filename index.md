---
title: "Everest - Celeste Mod Loader"
_appTitle: ""
---

<!-- .h1 is styled by the default DocFX theme. -->
<h1 class="h1 main-header">EVEREST</h1>

----

Everest is an [open-source](https://github.com/EverestAPI) mod loader and modding API, making texture replacements, custom level sets and endless code mods a reality.

**Install Everest before installing other mods. For a list of mods, visit [Nexus Mods](https://www.nexusmods.com/celeste/)**

If you've got any issues with Everest, we're in the #game_modding channel of this Discord server to help you:

[![Discord invite](/images/invite.png)](https://discord.gg/6qjaePQ)

## Installing Everest
- For developers: If you want to build your own version of Everest, go to [Building Everest](#building-everest).
- If you've **previously installed Everest and updated Celeste** or switched betas / branches, delete the `orig` directory where Celeste is installed.
    - macOS: Open the Celeste app in Finder, then naviagte to `Contents`, then `MacOS`.
- [**Download the latest `Everest.zip` on Nexus Mods**](https://www.nexusmods.com/celeste/mods/1?tab=files)
    - If you want to use Everest without any issues, use the [latest stable version on Nexus Mods](https://www.nexusmods.com/celeste/mods/1?tab=files).
    - If you want to help testing the newest updates _and are okay with bugs_, download the latest [`build-XYZ.zip` Travis devbuild](https://ams3.digitaloceanspaces.com/lollyde/index.html).
- Extract `Everest.zip` to where Celeste is installed. `Celeste.Mod.mm.dll` should be right next to `Celeste.exe`
    - macOS: Open the Celeste app in Finder, then naviagte to `Contents`, then `MacOS`.
- Run `MiniInstaller.exe`
    - Linux / macOS: [Install the mono runtime](https://www.mono-project.com/download/stable/), open a terminal window where Celeste is and run `mono MiniInstaller.exe`

## Installing mods
- Find a mod on [Nexus Mods](https://www.nexusmods.com/celeste/)
- Move the mod `.zip` into the `Mods` directory where Celeste is.
    - For prototyping: Feel free to use a subdirectory instead of a `.zip`
- That's it. No need to extract anything.

## Building Everest
- ***If you just want to install Everest, go to [Installing Everest](#installing-everest).***
- If you've **previously installed Everest and updated Celeste** or switched betas / branches, delete the `orig` directory where Celeste is installed.
    - macOS: Open the Celeste app in Finder, then naviagte to `Contents`, then `MacOS`.
- Clone the [Everest repo](github.com/EverestAPI/Everest), either in your IDE, via the CLI, or by downloading the .zip from GitHub.

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
