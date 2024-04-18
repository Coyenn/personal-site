import {
  convertLexicalToHTML,
  consolidateHTMLConverters,
  sanitizeServerEditorConfig,
  defaultEditorConfig,
} from '@payloadcms/richtext-lexical'
import { Payload } from 'payload'

async function lexicalToHTML(editorData: any, payload: Payload) {
  const editorConfig = sanitizeServerEditorConfig(defaultEditorConfig)

  return await convertLexicalToHTML({
    converters: consolidateHTMLConverters({ editorConfig }),
    data: editorData,
    payload: payload,
  })
}

export default lexicalToHTML
