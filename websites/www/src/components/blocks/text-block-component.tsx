import type { TextBlock as TextBlockType } from '@payload-types';
import lexicalToHTML from '@website/src/utilities/lexical-to-html';
import type { Payload } from 'payload/types';

export default async function TextBlockComponent(
  props: TextBlockType & { payload: Payload },
) {
  const html = await lexicalToHTML(props.text, props.payload);

  // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
  return <div className='prose' dangerouslySetInnerHTML={{ __html: html }} />;
}
