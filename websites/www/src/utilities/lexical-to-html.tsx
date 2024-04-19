import {
  consolidateHTMLConverters,
  convertLexicalToHTML,
  defaultEditorConfig,
  sanitizeServerEditorConfig,
} from '@payloadcms/richtext-lexical';
import type { Payload } from 'payload';

// biome-ignore lint/suspicious/noExplicitAny: Lexical to HTML is a complex function that requires any
async function lexicalToHTML(editorData: any, payload: Payload) {
  const editorConfig = sanitizeServerEditorConfig(defaultEditorConfig);

  return await convertLexicalToHTML({
    converters: consolidateHTMLConverters({ editorConfig }),
    data: editorData,
    payload: payload,
  });
}

export default lexicalToHTML;
