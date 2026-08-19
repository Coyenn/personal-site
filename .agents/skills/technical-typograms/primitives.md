# Primitives

Typograms are a small set of marks plus rules for joining them
([Google Typograms](https://google.github.io/typograms/)). Combine; do not
invent a new visual language per figure.

## Marks

| Role       | Characters                          |
| ---------- | ----------------------------------- |
| Pipes      | `\|` `-` `_` `\` `/` `:` `~`        |
| Connectors | `+` `.`                             |
| Arrows     | `>` `<` `^` `v` `→` `←` `↑` `↓`     |
| Dots       | `*` `o` `#` `·`                     |
| Corners    | `+` `╭` `╮` `╰` `╯` `┌` `┐` `└` `┘` |
| Measures   | `◀` `▶` `-`                         |
| Fills      | `█` `▄` `▀` `■`                     |
| Title      | `[ NAME ]`                          |

This site frames with `+ - |`. Use rounded corners (`╭╮╰╯`) only as primary
highlights on the geometry being taught. Space dashes in frames (`- - -`)
to match the north star.

Join rules from Typograms:

- Two pipes in a line connect.
- A `+` joins a horizontal pipe to a vertical one.
- `.` rounds a corner.
- Arrows, dots, and text attach to pipes without breaking the line.
- Diagonals (`/` `\`) make slopes and small triangles, not organic curves.

If a shape needs a curve that characters cannot hold (cloud, circle), draw a
rectangle and label it. That is also how [D2 ASCII](https://d2lang.com/blog/ascii/)
handles unsupported shapes.

## Pick a kind

Choose the encoding first
([ASCII Diagrams catalog](https://asciidiagrams.github.io/)), then the
Typograms genre.

### Encoding

| Encoding        | Use when                          | Draw                                                   |
| --------------- | --------------------------------- | ------------------------------------------------------ |
| Linear          | One path, a protocol, a pipeline  | A line of arrows and named steps                       |
| Tree            | Hierarchy, parse, filesystem      | `\|` `--` `+-` children under a root                   |
| Graph           | Many-to-many, a state machine     | Named nodes; arrows carry the condition                |
| Table           | Comparison, cost, a register map  | Columns; numbers right-aligned; header and total rules |
| Nested          | Inset, padding, clipping, layers  | Boxes inside boxes; mark the gap                       |
| Sequential      | Order without branching           | A numbered column or a left-to-right strip             |
| Aligned         | Memory, bits, a struct            | Fixed-width cells; bit indices on the rule             |
| Math            | A relationship the picture proves | Picture above; formula below, still in the frame       |
| Pictorial       | Scale, amplification, a UI sketch | Block letters (`█`) or a labeled wireframe             |
| Code annotation | A comment beside a function       | The same grid, no site frame required                  |

### Genre

Protocols, mocks, architecture (components, layers), tables, flowcharts,
trees, shapes, grids, time series, chips, circuits, mindmaps, scribbles,
state machines, memory layouts, data flow, actor boxes.

One figure, one encoding. A second encoding is a second figure.

## Annotate

- Point: one label on the thing it names.
- Range: `◀ - ▶` or a dashed span with a name under it.
- Legend: only when a letter or mark repeats (`A = Site A`).
- Elide with `...` on a ruled gap, not with a fade.

## Size

- Fit the site column when possible. Scroll horizontally rather than shrink
  glyphs.
- Prefer a wide shallow frame over a tall dense one.
- Leave a full blank cell between the frame and the content.
