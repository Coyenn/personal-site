import type { FieldHook } from 'payload/types';
import slugify from 'slugify';
import type { SlugifyOptions } from '../fields/slug/slug-component';
import getItemInNestObject from './get-item-in-nest-object';

const beforeValidate =
  (
    watchFields: string[],
    enableEditSlug: boolean,
    editFieldName: string,
    slugifyOptions: SlugifyOptions,
  ): FieldHook =>
  ({ siblingData, value, originalDoc, data, req }) => {
    if (enableEditSlug && Boolean(siblingData[editFieldName])) {
      return value;
    }

    const missingFields: string[] = [];

    const fields = watchFields.map((field) => {
      /* @ts-expect-error */
      const nestedItem = getItemInNestObject(field, data) as string;

      if (!nestedItem) {
        missingFields.push(field);
      } else {
        return nestedItem;
      }
    });

    /* Repeat the same but in the original doc to make sure we get all the data we can */
    if (missingFields.length > 0 && Boolean(originalDoc)) {
      for (const field of missingFields) {
        const nestedItem = getItemInNestObject(field, originalDoc) as string;

        if (nestedItem) {
          fields.push(nestedItem);
        }
      }
    }

    const separator = slugifyOptions?.replacement ?? '-';

    const processedValue = fields
      .filter((item) => Boolean(item))
      .reduce((accumulator, currentValue, currentIndex) => {
        return (
          String(accumulator) +
          (currentIndex > 0 ? separator : '') +
          slugify(String(currentValue), slugifyOptions)
        );
      }, '');

    return processedValue;
  };

export default beforeValidate;
