import type { CSSProperties, ReactNode } from "react";
import type { LanguageName } from "sugar-high";
import { generate, parse, type GeneratedLine, type GeneratedToken } from "sugar-high/core";
import { languages } from "sugar-high/lang";

import { AsciiGlyph } from "./diagrams/ascii-glyph";

function highlightLines(code: string, lang: LanguageName) {
  const config = languages.find((language) => language.id === lang)?.config;
  return generate(parse(code, config));
}

function tokenText(token: GeneratedToken) {
  return token.children.map((child) => child.value).join("");
}

function splitCodeLines(code: string) {
  const normalized = code.replace(/\r\n/g, "\n").replace(/^\n/, "").replace(/\n$/, "");
  return normalized.length === 0 ? [""] : normalized.split("\n");
}

function padLineNumber(value: number, width: number) {
  return String(value).padStart(width, "0");
}

function PlusMark() {
  return (
    <span className="shrink-0 text-secondary select-none" aria-hidden="true">
      <AsciiGlyph character="+" />
    </span>
  );
}

function DashFill() {
  return (
    <span
      className="grid h-4 min-w-6 flex-1 auto-rows-[16px] grid-cols-[repeat(auto-fit,16px)] justify-center overflow-hidden px-1 text-secondary select-none"
      aria-hidden="true"
    >
      {Array.from({ length: 80 }, (_, index) => (
        <span className="flex justify-center" key={index}>
          <AsciiGlyph character="-" />
        </span>
      ))}
    </span>
  );
}

function CodeSnippetFrame({ caption, children }: { caption: string; children: ReactNode }) {
  return (
    <figure className="code-snippet my-6 grid w-full max-w-full gap-3">
      <figcaption className="sr-only">{caption}</figcaption>
      {children}
    </figure>
  );
}

function CodeSnippetRule({ children }: { children?: ReactNode }) {
  return (
    <div className="flex min-w-0 items-center select-none" aria-hidden="true">
      <PlusMark />
      {children ? (
        <>
          <DashFill />
          {children}
          <DashFill />
        </>
      ) : (
        <DashFill />
      )}
      <PlusMark />
    </div>
  );
}

function CodeSnippetCount({ children }: { children: ReactNode }) {
  return (
    <span className="shrink-0 whitespace-pre text-secondary">
      {" [ "}
      {children}
      {" ] "}
    </span>
  );
}

function CodeSnippetLine({ line, number }: { line: GeneratedLine; number: string }) {
  const tokens = line.children.filter((token) => token.tokenType !== "break");
  const isEmpty = tokens.every((token) => tokenText(token).trim() === "");

  return (
    <div className="col-span-full grid grid-cols-subgrid items-start">
      <span className="select-none text-secondary" aria-hidden="true">
        {number}
      </span>
      <span className="select-none text-secondary" aria-hidden="true">
        <AsciiGlyph character="|" />
      </span>
      <code className="min-w-0 whitespace-pre-wrap break-all">
        {isEmpty
          ? " "
          : tokens.map((token, index) => (
              <span
                key={index}
                className={String(token.properties.className ?? "")}
                style={token.properties.style as CSSProperties}
              >
                {tokenText(token)}
              </span>
            ))}
      </code>
    </div>
  );
}

function CodeSnippetLines({ lang, lines }: { lang: LanguageName; lines: GeneratedLine[] }) {
  const lineWidth = Math.max(2, String(lines.length).length);

  return (
    <pre
      className="m-0 grid max-w-full grid-cols-[auto_auto_minmax(0,1fr)] gap-x-3 leading-5"
      data-sh-language={lang}
    >
      {lines.map((line, index) => (
        <CodeSnippetLine key={index} line={line} number={padLineNumber(index + 1, lineWidth)} />
      ))}
    </pre>
  );
}

function CodeSnippetWriting({
  children,
  label,
  lang,
}: {
  children: string;
  label: string;
  lang: LanguageName;
}) {
  const code = splitCodeLines(children).join("\n");
  const lines = highlightLines(code, lang);
  const lineWidth = Math.max(2, String(lines.length).length);
  const countLabel = padLineNumber(lines.length, lineWidth);

  return (
    <CodeSnippetFrame caption={`${label} listing, ${countLabel} lines.`}>
      <CodeSnippetRule />
      <CodeSnippetLines lang={lang} lines={lines} />
      <CodeSnippetRule>
        <CodeSnippetCount>{countLabel}</CodeSnippetCount>
      </CodeSnippetRule>
    </CodeSnippetFrame>
  );
}

function CodeSnippetRust({ children, label }: { children: string; label: string }) {
  return (
    <CodeSnippetWriting label={label} lang="rust">
      {children}
    </CodeSnippetWriting>
  );
}

function CodeSnippetShell({ children, label }: { children: string; label: string }) {
  return (
    <CodeSnippetWriting label={label} lang="shell">
      {children}
    </CodeSnippetWriting>
  );
}

function CodeSnippetYaml({ children, label }: { children: string; label: string }) {
  return (
    <CodeSnippetWriting label={label} lang="yaml">
      {children}
    </CodeSnippetWriting>
  );
}

export const CodeSnippet = {
  Count: CodeSnippetCount,
  Frame: CodeSnippetFrame,
  Line: CodeSnippetLine,
  Lines: CodeSnippetLines,
  Rule: CodeSnippetRule,
  Rust: CodeSnippetRust,
  Shell: CodeSnippetShell,
  Writing: CodeSnippetWriting,
  Yaml: CodeSnippetYaml,
};
