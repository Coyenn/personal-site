'use client';

import { Code as CodeField } from '@payloadcms/ui/fields/Code';
import { useFormFields } from '@payloadcms/ui/forms/Form';
import type { SelectField } from 'payload/types';

export interface CodeBlockComponentProps {
  name: string;
  path: string;
  languages: Record<string, string>;
}

function CodeBlockComponent(props: CodeBlockComponentProps) {
  const { languages, name, path } = props;
  const language = useFormFields(([fields]) => {
    return fields.language;
  });
  const key = language?.value ?? 'typescript';
  const label = languages[key as keyof typeof languages];

  return (
    <CodeField
      width='full'
      language={key}
      name={name}
      path={path}
      label={label}
    />
  );
}

export default CodeBlockComponent;
