'use client';

import { useMemo, useEffect } from 'react';

import type { CheckboxField, TextField } from 'payload/types';
import { useField } from '@payloadcms/ui/forms/useField';
import { useFormFields } from '@payloadcms/ui/forms/Form';
import { CheckboxInput } from '@payloadcms/ui/fields/Checkbox';
import { FieldLabel } from '@payloadcms/ui/forms/FieldLabel';
import { FieldDescription } from '@payloadcms/ui/forms/FieldDescription';
import { TextInput } from '@payloadcms/ui/fields/Text';
import slugify from 'slugify';

import '../../styles/fields/slug-component.scss';

type SlugifyOptions = {
  replacement?: string | undefined;
  remove?: RegExp | undefined;
  lower?: boolean | undefined;
  strict?: boolean | undefined;
  locale?: string | undefined;
  trim?: boolean | undefined;
};

type SlugComponentProps = TextField & {
  path: string;
  readOnly?: boolean;
  placeholder?: string;
  className?: string;
  custom: {
    watchFields: string[];
    slugifyOptions?: SlugifyOptions;
    editFieldConfig: CheckboxField;
    enableEditSlug: boolean;
  };
};

function SlugComponent(props: SlugComponentProps) {
  const {
    path,
    label,
    required,
    readOnly,
    className,
    admin,
    custom = {
      watchFields: ['title'],
      slugifyOptions: {
        lower: true,
        replacement: '-',
        remove: /[*+~\/\\.()'"!?#\.,:@]/g,
      },
      editFieldConfig: {
        name: 'editSlug',
        label: 'Edit slug',
      },
      enableEditSlug: true,
    },
    ...others
  } = props;
  const { watchFields, slugifyOptions, editFieldConfig, enableEditSlug } =
    custom;
  const { value, setValue, showError, errorMessage } =
    useField<SlugComponentProps>({
      path,
    });
  const beforeInput = admin?.components?.beforeInput;
  const afterInput = admin?.components?.afterInput;
  const checkboxPath = path.includes('.')
    ? `${path.slice(0, path.lastIndexOf('.'))}.${editFieldConfig.name}`
    : editFieldConfig.name;

  const editSlugField = useField<SlugComponentProps>({ path: checkboxPath });

  const classes = [
    'field-type',
    'text',
    className,
    showError && 'error',
    readOnly && 'read-only',
    'container',
  ]
    .filter(Boolean)
    .join(' ');

  const fields = useFormFields(([fields]) => {
    return watchFields.map((watch) => fields[watch]);
  });

  const isRequired = required;
  const isReadonly = readOnly || !editSlugField.value;

  const processedValue = useMemo(() => {
    const separator = slugifyOptions?.replacement ?? '-';

    return fields
      .filter((item) => Boolean(item?.value))
      .reduce((accumulator, currentValue, currentIndex) => {
        return (
          String(accumulator) +
          (currentIndex > 0 ? separator : '') +
          slugify(String(currentValue?.value), slugifyOptions)
        );
      }, '');
  }, [fields]);

  useEffect(() => {
    if (isReadonly) {
      /* @ts-expect-error */
      if (processedValue !== value) {
        setValue(processedValue);
      }
    }
  }, [isReadonly, processedValue]);

  const handleCheckbox: React.FormEventHandler<HTMLInputElement> = (e) => {
    editSlugField.setValue(!editSlugField.value);
    e.stopPropagation();
  };

  return (
    <div className={'slug-field-wrapper field-type'}>
      <FieldLabel
        htmlFor={`field-${path.replace(/\./gi, '__')}`}
        label={label}
        required={isRequired}
      />
      {Array.isArray(beforeInput) &&
        beforeInput.map((Component, i) => <Component key={i} />)}
      <div className={classes}>
        <TextInput
          path={path}
          name={others.name}
          label={false}
          required={isRequired}
          description={admin?.description}
          readOnly={isReadonly}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          className={'slug-input'}
          /* @ts-expect-error */
          value={value}
          showError={showError}
          errorMessage={errorMessage}
          style={{
            marginBottom: 0,
          }}
        />
        {enableEditSlug && (
          <div className={'checkbox'}>
            <div className={'sr-only'}>
              <FieldLabel
                htmlFor={`field-${checkboxPath.replaceAll('.', '-')}`}
                label={editFieldConfig?.label ?? ''}
              />
            </div>
            <CheckboxInput
              id={`field-${checkboxPath.replaceAll('.', '-')}`}
              onToggle={handleCheckbox}
              defaultChecked={editSlugField.value}
              /* @ts-expect-error */
              checked={editSlugField.value ?? false}
              label={''}
              name={checkboxPath}
            />
          </div>
        )}
      </div>
      {Array.isArray(afterInput) &&
        afterInput.map((Component, i) => <Component key={i} />)}
      <FieldDescription
        className={`field-description-${path.replace(/\./g, '__')}`}
        description={admin?.description as string}
      />
    </div>
  );
}

export { SlugComponent, type SlugComponentProps, type SlugifyOptions };
