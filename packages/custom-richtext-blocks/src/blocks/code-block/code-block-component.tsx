'use client';

import type { SelectField } from 'payload/types';
import { useFormFields } from '@payloadcms/ui/forms/Form';
import { Code as CodeField } from '@payloadcms/ui/fields/Code';

export interface CodeBlockComponentProps {
  field?: SelectField & { path?: string };
  languages: Record<string, string>;
}

function CodeBlockComponent(props: CodeBlockComponentProps) {
  const { field, languages } = props;
  const language = useFormFields(([fields]) => {
    return fields.language;
  });
  const key = language?.value ?? 'typescript';
  const label = languages[key as keyof typeof languages];

  return (
    <CodeField
      width='full'
      language={key}
      name={field?.name}
      path={field?.path}
      label={label}
    />
  );
}

export default CodeBlockComponent;
