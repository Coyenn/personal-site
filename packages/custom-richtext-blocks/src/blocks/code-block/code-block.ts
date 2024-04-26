import type { LexicalBlock } from '@payloadcms/richtext-lexical';
import CodeBlockComponent from './code-block-component';
import { createElement } from 'react';

const LANGUAGES = {
  css: 'CSS',
  dockerfile: 'Dockerfile',
  go: 'Go',
  graphql: 'GraphQL',
  handlebars: 'Handlebars',
  html: 'HTML',
  java: 'Java',
  javascript: 'JavaScript',
  kotlin: 'Kotlin',
  markdown: 'Markdown',
  pgsql: 'PostgresQL',
  python: 'Python',
  rust: 'Rust',
  scss: 'SCSS',
  swift: 'Swift',
  typescript: 'TypeScript',
  xml: 'XML',
  yaml: 'YAML',
};

export const CodeBlock: LexicalBlock = {
  fields: [
    {
      name: 'code',
      required: true,
      type: 'code',
      admin: {
        components: {
          Field(field) {
            return createElement(CodeBlockComponent, {
              field: field,
              languages: LANGUAGES,
            });
          },
        },
        language: 'typescript',
      },
    },
    {
      name: 'language',
      options: (Object.entries(LANGUAGES) as [string, string][]).map(
        ([key, value]) => ({
          label: value,
          value: key,
        }),
      ),
      required: true,
      type: 'select',
      defaultValue: 'typescript',
    },
  ],
  slug: 'code',
};
