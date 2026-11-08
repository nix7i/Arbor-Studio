<div align="center">

# Arbor Studio

**A node-based visual designer for building, balancing, and simulating game progression systems.**

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Platform](https://img.shields.io/badge/platform-Windows%2010%20%7C%2011-0078D4)
![Architecture](https://img.shields.io/badge/architecture-serverless-success)
![License](https://img.shields.io/badge/license-All%20Rights%20Reserved-lightgrey)

[Download](https://github.com/nix7i/Arbor-Studio/releases/latest) · [Features](#-features) · [Quick Start](#-quick-start) · [Formula Reference](#-formula-reference) · [License](#-license)

</div>

---

## Overview

Arbor Studio is a node-based visual designer built for creating, balancing, and simulating game progression systems. It lets developers map out upgrade paths, write mathematical formulas for currency scaling, and configure mechanics such as automation, milestone unlocks, and rebirth resets.

With the integrated real-time simulator, you can test your game's balance instantly and export the structured tree data straight into your project workflow.

## Table of Contents

- [Metadata](#metadata)
- [Features](#-features)
- [Quick Start](#-quick-start)
- [Node Types](#-node-types)
- [Formula Reference](#-formula-reference)
- [Simulator](#-simulator)
- [Keyboard & Mouse](#-keyboard--mouse)
- [Data Format](#-data-format)
- [System Requirements](#-system-requirements--prerequisites)
- [Building from Source](#-building-from-source)
- [Releasing](#-releasing)
- [Troubleshooting](#-troubleshooting)
- [Roadmap](#-roadmap)
- [License](#-license)

---

## Metadata

| | |
|---|---|
| **Version** | 1.0.0 |
| **Author** | fluffyboysoren |
| **Platform** | Windows 10 (64-bit) / Windows 11 |
| **Repository** | [nix7i/Arbor-Studio](https://github.com/nix7i/Arbor-Studio) |

---

## Features

### Design
- **Visual node editor** with pan, zoom, snap-to-grid, undo/redo, and automatic saving in your browser storage.
- **Multi-node selection:** Shift-drag a box or Shift-click nodes, then move, copy, paste, or delete the whole group.
- **Search & filter:** instantly highlight nodes by ID, name, effect, cost currency, or `#tag`.
- **Colours, tags & icons:** categorise sections of your tree (e.g. all blue nodes are "Combat"), with emoji or image-URL icons.
- **Connection styles:** smooth curves, straight lines, or right-angle steps, plus glowing neon or animated-flow wires.
- **VFX editor:** design and test particle bursts, floating text, screen shake, ripples, and flashes, then attach them to any node.

### Mechanics
- **Custom formulas** anywhere an effect or requirement is needed (e.g. `log10(points)`), with autocomplete.
- **Global variables:** define constants like `base_speed` once and reuse them in every formula.
- **Boards:** progress bars that level up automatically from a currency, with their own live stat lines.
- **Rebirth / reset layers:** convert your whole balance through a formula and reset only the upgrades you choose.
- **Automation:** nodes that buy upgrades for you, instantly or with a delay, with permanent variants.
- **Blocking & disabling:** nodes can lock other nodes, switch off their effects, or stop resets from touching them.
- **Type changes:** an owned node can change the type of others (e.g. turn a node permanent).
- **Achievements & challenges:** goal-based unlocks and hard-mode penalties (`^0.5` and more).
- **Softcaps & logic in formulas:** `softcap()`, `if()`, comparisons, `&&`, `||`.

### Testing
- **Real-time simulator** with adjustable speed and update rate.
- **Dev panel:** grant currencies, toggle infinite resources, and see an exact production breakdown per currency.
- **Buy Max** for repeatable upgrades (Shift-click or by setting).
- **Play mode:** locks editing and cheats so you can test as a player would.
- **Save strings:** export and import an encoded simulator state.

---

## Quick Start

1. Download the latest installer from the [Releases page](https://github.com/nix7i/Arbor-Studio/releases/latest).
2. Run the installer and launch **Arbor Studio**.
3. Add a few nodes, connect them, set their costs and effects, then press **▶ Test** to simulate.

> **Windows SmartScreen:** builds that are not code-signed may show a "Windows protected your PC" screen. Choose **More info → Run anyway**. See [Troubleshooting](#-troubleshooting).

---

## Node Types

| Type | Behaviour |
|---|---|
| **Normal** | Bought once. Its effects apply while owned. |
| **Repeatable** | Bought many times with a growing cost; plain effects scale per level. |
| **Permanent Unlock** | Bought once and kept through resets. |
| **Milestone** | A one-time goal node. |
| **Board** | Fills a progress bar from a currency and levels up automatically. |
| **Rebirth (Reset)** | Converts your balance through a formula, then resets what you choose. |
| **Automation Unlock** | Buys matching upgrades for you; resets like a normal node. |
| **Perma-Automation Unlock** | Same as above, but survives resets. |
| **Achievement** | Free; unlocks by itself when its condition is true. |
| **Challenge** | Applies a penalty while active; completing its goal unlocks the reward. |

---

## Formula Reference

Anywhere a modifier, requirement, condition, or stat line accepts a formula, you can use:

| Category | Available |
|---|---|
| **Operators** | `+  -  *  /  %  ^` and parentheses |
| **Comparisons** | `>  <  >=  <=  ==  !=` and `&&`, `\|\|` |
| **Functions** | `log10 log2 ln log(x, base) exp sqrt cbrt abs floor ceil round trunc sign sin cos tan atan pow min max clamp if softcap` |
| **Constants** | `pi`, `e` |
| **Numbers** | Plain (`1500`), scientific (`1e6`), and suffixes (`5K`) |
| **Variables** | Currency names in lowercase with underscores (`points`, `rebirth_points`) · any node or board ID (`u7` gives its level) · `level` · `time` · `<rebirth id>_gain` · your own global variables |

**Effect modifiers**

| Modifier | Meaning |
|---|---|
| `x2`, `x1.5` | Multiply the target currency (per level on repeatables and boards) |
| `+1/s` | Add per second |
| `x(1+log10(points))` | Formula multiplier (needs a target currency) |
| `+sqrt(points)/s` | Formula per-second addition |
| `^0.5` | Raise the currency's production to a power |

**Examples**

```text
softcap(1 + sqrt(honey), 1e6, 0.5)    # slow growth past 1 million
if(points > 1000, 2, 1)               # conditional multiplier
rebirth_points = (points / 100000)^0.5  # rebirth gain formula
```

---

## Simulator

| Tool | What it does |
|---|---|
| **▶ Test / ▶ Play** | Starts the simulation. With **Play mode** enabled in Settings, editing and cheats are locked. |
| **Dev panel** | Grant or set currencies, infinite resources, and a breakdown such as `×3 N7 Swarm Doctrine` for each currency. |
| **Buy Max** | Shift-click a repeatable upgrade, or configure it in Settings. |
| **Locked-node display** | Dimmed, shown as "???", or hidden until unlocked. |
| **Updates per second** | Choose from 5 to 60 to balance smoothness and performance. |
| **Save strings** | Export or import an encoded simulator state from the Dev panel. |

---

## Keyboard & Mouse

| Action | Control |
|---|---|
| Pan | Drag empty canvas |
| Zoom | Mouse wheel |
| Box select | `Shift` + drag on empty canvas |
| Add / remove from selection | `Shift` + click a node |
| Select all | `Ctrl` + `A` |
| Copy / paste | `Ctrl` + `C` / `Ctrl` + `V` |
| Delete | `Delete` or `Backspace` |
| Undo / redo | `Ctrl` + `Z` / `Ctrl` + `Y` |
| Ignore grid snapping while dragging | Hold `Alt` |
| Cancel / clear selection | `Esc` |

---

## Data Format

Trees are stored as plain JSON that you can export, import, version-control, and read from your own game code. A tree contains your currencies, nodes (with positions, parents, costs, and effects), global variables, and VFX definitions.

```json
{
  "format": "upgrade-tree-designer",
  "version": 1,
  "currencies": [{ "name": "Points", "start": 0, "rate": 1 }],
  "nodes": [
    {
      "id": "U1",
      "title": "Double Points",
      "type": "normal",
      "parents": [],
      "costs": { "Points": 10 },
      "effects": [{ "target": "Points", "modifier": "x2" }]
    }
  ]
}
```

---

## System Requirements & Prerequisites

### Minimum Requirements
- **Operating System:** Windows 10 (64-bit) or Windows 11
- **Environment:** Local desktop execution environment (self-contained packaged build)

### Architecture Notes
- **Serverless Architecture:** No server-side code (PHP, Python, etc.) runs inside or is required by the app. All processing, graph evaluation, and simulations occur completely on the client side.

---

## Building from Source

**Prerequisites:** [Node.js](https://nodejs.org/) 20 or newer and npm.

```bash
git clone https://github.com/nix7i/Arbor-Studio.git
cd Arbor-Studio
npm install

npm start        # run the app in development
npm run dist     # build the Windows installer into /dist
```

---

## Releasing

Releases are built automatically by GitHub Actions. Push a version tag and the workflow builds the Windows installer and attaches it to a GitHub release:

```bash
git tag v1.0.1
git push origin v1.0.1
```

---

## Troubleshooting

**Windows says "Windows protected your PC" or Defender flags the installer.**
Unsigned installers trigger SmartScreen. Choose **More info → Run anyway**. If you believe it is a false positive, you can submit the file to Microsoft's Security Intelligence portal.

**My tree isn't saving.**
Check that *Autosave the tree in this browser* is enabled in Settings, and export a JSON backup regularly.

**A formula shows a ⚠ warning.**
Currency names are lowercase with underscores (`rebirth_points`), and plain numbers like `x2` apply once per level on repeatables and boards, while formulas are evaluated exactly as written.

---

## Roadmap

- Standalone player export (a single file you can publish as a playable game)
- Script nodes for custom logic
- Mini-map navigation

---

## License

**Copyright © 2026 fluffyboysoren. All rights reserved.**

No license is granted for this software or its source code. You may not copy, modify, merge, publish, distribute, sublicense, or sell copies of it, in whole or in part, without prior written permission from the copyright holder. Use of the compiled application is permitted for personal and evaluation purposes only.

For permission requests, please open an issue on the [GitHub repository](https://github.com/nix7i/Arbor-Studio/issues).

---

<div align="center">

Made by **claude**
Made by **fluffyboysoren**

</div>
