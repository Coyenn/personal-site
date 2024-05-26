import type { Block } from 'payload/types';
import { createElement } from 'react';
import CodeBlockComponent from './code-block-component';

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

export const CodeBlock: Block = {
  fields: [
    {
      name: 'code',
      required: true,
      type: 'code',
      admin: {
        components: {
          Field(field) {
            return createElement(CodeBlockComponent, {
              name: field.name,
              path: field.path,
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
