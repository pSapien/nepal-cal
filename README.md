# @pSapien/nepal-cal 🇳🇵

A command line utility to display a formatted Nepali calendar in the terminal.
Think `cal` but for Nepali calendar.

## Installation

Install the package directly via npm:

```bash
npm install -g @psapien/nepal-cal
```

## How to use

Once installed, execute the package via the global `ncal` shortcut

1. View the current month
Prints out the current ongoing Bikram Sambat month with today's date highlighted

```bash
ncal
```

2. View specific month
Print out a specific month using its 1–12 index, formal name, or common colloquial spellings (e.g., asar, asoj, chait).

```
ncal -m 2
ncal -m asoj
```

3. View Entire Year
Print out a full 12-month calendar grid. Leaving it blank defaults to current year, or you can specify any year between `2000 BS`  and `2999 BS`

```
ncal -y
ncal -y 2085
```

4. Help Menu
Display the usuage instructions and available commands

```bash
ncal -h
ncal --help
```