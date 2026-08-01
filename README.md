# thinkbookdot

Personal Thinkbook dotfiles managed with [chezmoi](https://www.chezmoi.io/), in style of the "Everforest" color-scheme.

Contains my Linux configuration, shell setup, window manager, system configs, and provisioning.

## !! IMPORTANT !!

This setup is only for Arch / Arch-based distros.

## What's included

| Category | Tools / Configs |
|---|---|
| **Shell** | bash, git |
| **WM / Desktop** | niri, sddm (silent-theme), ghostty, mako |
| **System** | pacman.conf, paru.conf, sudoers, vconsole, locale, hostname, zram-generator |
| **Apps** | fastfetch, fuzzel, spicetify, dolphin, librewolf |
| **Boot** | GRUB theme & config |
| **Provisioning** | Ansible playbook (packages, AUR, flatpak, themes) |

## Setup

```bash
# Install chezmoi and git (git is required for chezmoi init)
sudo pacman -S chezmoi git
```

```bash
# Apply dotfiles (installs Ansible and runs the playbook automatically)
chezmoi init --apply https://github.com/murcdemurc/thinkbookdot.git
```

You'll be prompted for your sudo password where needed.

## Daily use

```bash
chezmoi update         # pull & apply latest changes (+ LibreWolf-Backup läuft)
chezmoi git push       # push local changes (inkl. Backup-Exports)
chezmoi status         # check what's modified
chezmoi diff           # see pending changes
chezmoi apply --force-run-scripts   # nur Backup erneut ausführen
```

## LibreWolf backup

`run_after_30_librewolf-backup.sh.tmpl` exportiert bei jedem `chezmoi apply`
(bzw. `chezmoi update`) die wiederherstellbaren Daten **aller** Profile aus
`~/.librewolf/` als Text nach `.librewolf-backup/<profil>/`:

| Datei | Inhalt |
|---|---|
| `prefs.js` | alle Browser-Einstellungen |
| `user.js` | eigene managed Prefs |
| `bookmarks.html` | Lesezeichen (sqlite3-Export aus `places.sqlite`) |
| `extensions.json` | installierte Erweiterungen |
| `containers.json` | Multi-Account-Container |
| `search.json.mozlz4` | Suchmaschinen |
| `chrome/` | Themes / `userChrome.css` |
| `backup-info.txt` | Zeitpunkt, Version, Hinweise |

Danach committen: `chezmoi git add -A && chezmoi git push`.

**Bewusst ausgenommen** (sensitive / binär / flüchtig): `logins.json`,
`key4.db`, `cert9.db`, Cookies, `storage/`, Caches, Session-State. Willst du
Passwörter & Zertifikate mit sichern, muss erst age-Verschlüsselung in chezmoi
eingerichtet werden.

Der Ordner `.librewolf-backup/` beginnt mit einem Punkt und wird von chezmoi
**nicht** ins Home-Verzeichnis angewendet – er wird nur im git-Repo versioniert
(siehe `.chezmoiignore`).

Managed Einstellungen & Theme liegen dagegen in `dot_librewolf/` und werden bei
jedem Setup automatisch wiederhergestellt:

- `dot_librewolf/profiles.ini` → deterministisches Profil `Profiles/Default`
- `dot_librewolf/Profiles/Default/user.js` → Einstellungen (about:config-Prefs)
- `dot_librewolf/Profiles/Default/chrome/userChrome.css` → Theme

> Hinweis: Das deterministische Profil wird über `profiles.ini` definiert.
> Existiert auf einem Rechner bereits ein LibreWolf-Profil mit eigenem Namen,
> wird ein zweites Profil angelegt statt das bestehende zu übernehmen.

## How it works

`chezmoi init --apply` copies all dotfiles into place and then runs
`.chezmoiscripts/run_after_10_bootstrap-ansible.sh.tmpl`, which:

1. Installs Ansible if missing
2. Installs the required collections (`kewlfft.aur`, `community.general`) from `ansible/requirements.yml`
3. Runs `ansible-playbook -i localhost, -c local ansible/site.yml --ask-become-pass`

All provisioning is idempotent and controlled via feature flags in `ansible/site.yml`.

## Structure

```
~/.local/share/chezmoi/
|-- ansible/                       # Ansible provisioning
|   |-- site.yml                   # playbook with feature toggles
|   |-- ansible.cfg                # local inventory, fact caching
|   |-- requirements.yml           # Ansible collections
|   `-- roles/
|       |-- essential/             # base packages, services, paru bootstrap, sudoers
|       |-- grub_theme/            # GRUB nord theme & config (+ handler to regen grub.cfg)
|       |-- sddm_theme/            # SDDM "silent" theme, fonts, theme.conf
|       |-- noctalia_git/          # noctalia-git (AUR) + wallpaper
|       |-- noctalia_shell/        # noctalia-shell (AUR) + wallpaper
|       |-- aur_leisure/           # deezer, spotify
|       |-- aur_work/              # onlyoffice-bin
|       |-- librewolf/             # librewolf-bin (AUR) + sqlite (für Backup-Export)
|       |-- gaming/                # linux-rt, steam, gamescope, wine, lact
|       |-- utils/                 # btop, fastfetch, fuzzel, ranger, ...
|       |-- productivity/          # thunderbird, reaper, waydroid, flatpak apps
|       `-- ltr/                   # placeholder
|-- dot_bash*                      # shell configs
|-- dot_gitconfig                  # git config
|-- dot_librewolf/                 # LibreWolf: profiles.ini, user.js, chrome/ (Theme)
|-- dot_local/                     # ~/.local/ state (noctalia, etc.)
|-- private_dot_config/            # ~/.config/ (niri, ghostty, spicetify, ...)
|-- etc_*                          # /etc/ configs (pacman, sudoers, systemd, ...)
|-- .librewolf-backup/             # LibreWolf-Backup-Exporte (git-versioniert, nicht angewendet)
`-- .chezmoiscripts/               # post-apply scripts (Ansible bootstrap, LibreWolf-Backup)
```

## Notes

- The Ansible playbook requires `--ask-become-pass` (passed by the bootstrap script).
- Some files are marked `private_` (age-encrypted secrets).
- `.chezmoiignore` excludes runtime state files (e.g. Noctalia git plugins, notification history).
