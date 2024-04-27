import type { TextBlock as TextBlockType } from '@payload-types';
import CodeHighlight from '@website/src/components/media/code-hightlight';
import lexicalToHTML from '@website/src/utilities/lexical-to-html';
import type { Payload } from 'payload/types';

export default async function TextBlockComponent(
  props: TextBlockType & { payload: Payload },
) {
  const html = await lexicalToHTML(props.text, props.payload);

  return (
    <CodeHighlight>
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
      <div className='prose' dangerouslySetInnerHTML={{ __html: html }} />
    </CodeHighlight>
  );
}
