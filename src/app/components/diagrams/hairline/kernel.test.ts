import { expect, test } from "bun:test";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

// kernel.js is hairline-create's kernel with one line added at the end to export
// HL. The kernel's first line is a sha256 of everything after it, so an edit to
// the copy, which would stop the figures building in the skill, shows up here.
test("the vendored kernel is the skill's kernel, unchanged", () => {
  const source = readFileSync(new URL("./kernel.js", import.meta.url), "utf8");
  const [, hash, body] =
    source.match(/^\/\* hairline kernel sha256:(\w+) \*\/\n([\s\S]*)\nexport \{ HL \};\n$/) ?? [];

  expect(body).toBeDefined();
  expect(createHash("sha256").update(body).digest("hex")).toBe(hash);
});
