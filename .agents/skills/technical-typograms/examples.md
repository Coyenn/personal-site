# Examples

Drafts first. Implement these grids; do not restyle them into CSS boxes.
Primary goes on `[ TITLE ]` and the taught marks (blue in the references,
`--primary` on this site).

## Nested geometry

Claim: inner radius is outer minus inset.

```
+ - - - - - - - - [ NESTED RADII ] - - - - - - - - +
|                                                  |
|           ╭ - - - - - - - - - - ╮                |
|           |     outer 16px      |                |
|           |   ╭ - - - - - - ╮   |                |
|         ◀ - ▶ | inner 12px  |   |                |
|           |   ╰ - - - - - - ╯   |                |
|           ╰ - - - - - - - - - - ╯                |
|                  inset 4px                       |
|                                                  |
|           inner = outer - inset                  |
|           12px  = 16px  - 4px                    |
|                                                  |
+ - - - - - - - - - - - - - - - - - - - - - - - - +
```

Primary: title and the eight corner glyphs. Pulse those corners if motion
must show "these are the radii." Do not slide the inner box.

## Table

Claim: what the research cost.

```
+ - - - - [ WHAT THE RESEARCH COST ] - - - - +
|                                            |
| Agent                  Tokens  Calls  Time |
| - - - - - - - - - - - - - - - - - - - - -  |
| Inks and paper         115,207   120   16m |
| Overprint and drift    135,218   164   16m |
| Naming the patterns    186,716   112   18m |
| - - - - - - - - - - - - - - - - - - - - -  |
| Total                  437,141   396  ~50m |
|                                            |
+ - - - - - - - - - - - - - - - - - - - - - +
```

Right-align every numeric column. If animated: count tokens and calls up;
switch the active row to primary (or full opacity) while the others stay
dim. The total row is the reduced-motion frame.

## Flow / pictorial

Claim: AI is an amplifier.

```
+ - - - - - [ AI IS AN AMPLIFIER ] - - - - - +
|                                            |
|      ▄                          ▄          |
|      █ ▄                      ▄███▄        |
|    ▄ █ █ ▄        AI        ▄███████▄      |
|    █ █ █ █   - - - >        █████████      |
|   your taste                 amplified     |
|                                            |
+ - - - - - - - - - - - - - - - - - - - - - +
```

Primary: title and both bar charts. Motion walks the dashed arrow
(`- - - >` → `= - - >` → `- = - >` → `- - = >`) or grows the right-hand
bars by swapping ` ` for `▄`/`█`. The charts never move.

## State machine

```
+ - - - - - - [ UPDATE STATES ] - - - - - - - +
|                                             |
|   * kNew ----> kChecking ----> kCanUpdate   |
|       |              |              |       |
|       |           error          yes|       |
|       v              v              v       |
|   kUpdateError   kUpToDate      kUpdated    |
|                                             |
+ - - - - - - - - - - - - - - - - - - - - - - +
```

Swap `*` onto the active state. Dim the rest. Keep every node in place.

## Tree

```
+ - - - - - - [ FRAME TREE ] - - - - - - +
|                                        |
|   Site A                               |
|   |-- Site B                           |
|   +-- Site C                           |
|       |-- Site A                       |
|       +-- Site A                       |
|                                        |
+ - - - - - - - - - - - - - - - - - - - +
```

## Memory / aligned

```
+ - - - - - [ WORD LAYOUT ] - - - - - +
|                                     |
|  31            16 15              0 |
|  +---------------+---------------+  |
|  |     flags     |     index     |  |
|  +---------------+---------------+  |
|                                     |
+ - - - - - - - - - - - - - - - - - - +
```

## Reduced motion

For every animated example, the still frame is the finished diagram with
the last state already shown. No spinner, no half-counted total.
