import lexicalToHTML from '@website/src/utilities/lexical-to-html'
import { TextBlock as TextBlockType } from '@payload-types'
import { Payload } from 'payload/types'

export default async function TextBlockComponent(props: TextBlockType & { payload: Payload }) {
  const html = await lexicalToHTML(props.text, props.payload)

  return <div className='prose' dangerouslySetInnerHTML={{ __html: html }} />
}
