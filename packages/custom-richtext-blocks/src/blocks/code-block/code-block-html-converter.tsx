import type {
  HTMLConverter,
  SerializedBlockNode,
} from '@payloadcms/richtext-lexical';

export const CodeBlockHTMLConverter: HTMLConverter = {
  converter: async ({ node }) => {
    const serializedNode = node as SerializedBlockNode;

    if (serializedNode.fields.blockType === 'code') {
      const code = serializedNode.fields.code;
      const language = serializedNode.fields.language;

      return `<pre class="relative"><code class="language-${language}">${code}</code></pre>`;
    }

    return '';
  },

  // This is the type of the lexical node that this converter can handle.
  nodeTypes: ['block'],
};
