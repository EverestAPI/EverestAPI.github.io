---
title: "Mod Structure"
---

# Mod Structure

----

<div class="prerequisites">
<li>Everest: [Website](/)</li>
<li>Zipping software, f.e. 7zip: [Website](http://7-zip.org/)</li>
</div>

----

### Formats

**Everest currently supports the following formats:**
- Mod `.zip`s: Best used when using other's mods or when uploading your mod somewhere.
- Mod subdirectories: Best used for prototyping mods on your own machine.

A mod can't contain "submods", unless a code mod loads the "submods" dynamically.

A mod `.zip` shouldn't contain the content in a subdirectory. All of its contents should be accessible on the top level (root) by just opening the `.zip` file.

### File Layout

Mods can contain custom content, both overrides / replacements (when supported) and new content. The content paths match the originals as close as possible.

**The following content mappings are supported out of the box:**
- `Graphics/Atlases/*.png`: Replace or add textures.
    - Supports `.meta` definition files.
    - `Graphics/Atlases/Gui/title.png` = Atlas: `Gui`; Texture: `title`
    - `Graphics/Atlases/Gameplay/characters/player/bigfall00.png` = Atlas: `characters/player`; Texture: `bigfall00`
- `Maps/*.bin`: Add new maps.
    - Supports `.meta` definition files.
    - Replacing vanilla maps not supported.
    - `Maps/Author/LevelSet/1-Name.bin` = SID: `Author/LevelSet/1-Name`; LevelSet: `Author/LevelSet`; Name: `1-Name`
- `Dialog/*.txt`: Add new texts.
    - Only contains the texts belonging to the mod.
    - Multiple mods are allowed to occupy the same path. F.e. two mods can contain their own `Dialog/English.txt` files.
    - Replacing existing texts not supported.
    - `Dialog/English.txt` is always used when a dialog key cannot be found in another language.

**With a few exceptions, each file path can only be occupied by one file.**
- If mod #1 contains `Graphics/Atlases/Gui/title.png` and `Graphics/Atlases/Gui/title.meta.yaml`, it overrides the texture shipped with Celeste.
- If an additional mod #2 contains `Graphics/Atlases/Gui/title.png`, it overrides the texture shipped with #1. The meta definitions of #1 still apply.

All "supported" mod content can be loaded with the usual Celeste methods. For example, a texture in an atlas can be accessed with the matching atlas.

All "unsupported" mod content can be loaded by codemods via [`Everest.Content.Get*` (usage)](/api/Celeste.Mod.Everest.Content.html#Celeste_Mod_Everest_Content_Get_System_String_System_Boolean_).

### Metadata

The `metadata.yaml` file in your mod defines its name (ID), version, (optional) DLL path and any dependencies.

**The version should match the [semver (semantic versioning) format](https://semver.org/):**
- The MAJOR version must match to prevent breakages caused by API changes.
- The MINOR version must rise with each backwards-compatible change. If the mod depends on a new version but an older version is installed, the mod won't load.
- The PATCH version isn't checked.

Adding a dependency to a mod with version `0.0.*` ignores the above checks at your own risk.

### Example: Code Mod

**File list:**
- `/metadata.yaml`
- `/GhostMod.dll`

**Metadata:**
```yaml
Name: GhostMod
Version: 1.0.0
DLL: GhostMod.dll
Dependencies:
  - Name: Everest
    Version: 2.1.0
```

- The mod will load with Everest `2.1+.*`, meaning `2.1.*`, `2.2.*`, `2.3.*`, ...
- The mod won't load with Everest `2.0.*` as the MINOR version is too old. The mod depends on a newer API.
- The mod won't load with Everest `1.*.*`, `3.*.*`, `4.*.*` or similar. The API has changed in a way that could break the mod.

### Example: Level Mod

**File list:**
- `/Dialog/English.txt`: LevelSet and chapter names.
- `/Maps/Cruor-Secret.bin`: A-side map binary.
- `/Maps/Cruor-Secret.meta.yaml`: Chapter metadata. Always the `.meta` of the A-side binary.
- `/Maps/Cruor-Secret-B.bin`: B-side map binary. The A-side / chapter `.meta` links to this.
- `/Graphics/Atlases/Gui/areas/secret.png`, `secret_back.png`: The chapter selection screen icon and its backside (when flipping).
- `/Graphics/Atlases/Gameplay/decals/cruor-secret/*.png`: Any decals used by the A-side or B-side map `.bin`s.
- `/Graphics/Atlases/Ending-Cruor-Secret-1/*.png`, ...: Chapter completion screen textures. The chapter `.meta` links to this.
