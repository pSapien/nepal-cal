# @pSapien/nepal-cal 🇳🇵

A terminal-based Nepali Calendar (B.S). Think `cal` but built for the Bikram Sambat System

![demo1](assets/demo.gif)

## Installation

Install the package directly via npm:

```bash
npm install -g @psapien/nepal-cal
```

## How to use

This package exposes a global `ncal` shortcut in your terminal

#### 1. Current Mahina
Running this bare command gives you the current ongoing mahina with today's gatey highlighted

```bash
ncal
```

####  2. Specific Mahina (`-m`)
You can pull up a specific mahina using number (1-12), formal name or common colloquial spellings and shortcuts like (asoj, chait, or bai)

```
ncal -m 2
ncal -m asoj
```

Tip: Run `ncal --help` to see a full list of supported names and shortcuts.

#### 3. Purai Saal (`-y`)
Print out a full 12-mahina calendar grid. Leaving it blank defaults to current saal, or you can specify any saal between `2000`  and `2999`

```
ncal -y
ncal -y 2085
```

#### 4. Help Menu (`-h` `--help`)
If you want help, then it shall come your way!

```bash
ncal -h
ncal --help
```