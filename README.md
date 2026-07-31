# thinkbookdot

Personal dotfiles managed with [chezmoi](https://www.chezmoi.io/).

Contains my Linux configuration, shell setup, window manager, system configs, and provisioning.

## !!IMPORTANT!!

This setup is only for Arch/ Arch-based distos.

## What's included

| Category | Tools / Configs |
|---|---|
| **Shell** | bash, git |
| **WM / Desktop** | niri, sddm (silent-theme), ghostty, mako |
| **System** | pacman.conf, paru.conf, sudoers, vconsole, locale, hostname, zram-generator |
| **Apps** | fastfetch, fuzzel, spicetify, dolphin |
| **Boot** | GRUB theme & config |
| **Provisioning** | Ansible playbook (packages, AUR, flatpak) |

## Setup

```bash
# Install chezmoi
sudo pacman -S chezmoi

# Apply dotfiles
chezmoi init --apply https://github.com/murcdemurc/thinkbookdot.git
```

You'll be prompted for your sudo password where needed.

## Daily use

```bash
chezmoi update         # pull & apply latest changes
chezmoi git push       # push local changes
chezmoi status         # check what's modified
chezmoi diff           # see pending changes
```

## Structure

```
~/.local/share/chezmoi/
├── ansible/              # Ansible provisioning (packages, services)
├── grub/                 # GRUB theme & config
├── sddm-theme/           # SDDM login theme
├── dot_bash*             # shell configs
├── dot_gitconfig         # git config
├── dot_local/            # ~/.local/ state (noctalia, etc.)
├── private_dot_config/   # ~/.config/ (niri, ghostty, spicetify, …)
├── etc_*                 # /etc/ configs (pacman, sudoers, systemd, …)
└── .chezmoiscripts/      # post-apply scripts (bootstrap, grub, sddm)
```

## Notes

- The Ansible playbook requires `ask_become_pass` (configured in `ansible.cfg`).
- Some files are marked `private_` (age-encrypted secrets).
- `.chezmoiignore` excludes runtime state files (e.g. Noctalia notification history).
