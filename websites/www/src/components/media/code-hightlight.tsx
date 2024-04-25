'use client';

import hljs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import yaml from 'highlight.js/lib/languages/yaml';
import type React from 'react';
import { useEffect } from 'react';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('yaml', yaml);
hljs.registerLanguage('bash', bash);

export interface CodeHighlightProps {
  children: React.ReactNode;
}

export default function CodeHighlight(props: CodeHighlightProps) {
  const { children } = props;

  useEffect(() => {
    hljs.highlightAll();

    const allSourceCodeBlocks = document.querySelectorAll('.prose pre > code');

    // Add copy button to all source code blocks
    // biome-ignore lint/complexity/noForEach: <explanation>
    allSourceCodeBlocks.forEach((block) => {
      const copyButton = document.createElement('button');
      const existingCopyButton = block.parentElement?.querySelector('button');

      if (existingCopyButton) {
        existingCopyButton.remove();
      }

      block.parentElement?.classList.add('relative');
      const copyIcon =
        '<?xml version="1.0" encoding="UTF-8"?><svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 5C2 3.34315 3.34315 2 5 2H12C13.6569 2 15 3.34315 15 5C15 5.55228 14.5523 6 14 6C13.4477 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4H5C4.44772 4 4 4.44772 4 5V13C4 13.5523 4.44772 14 5 14H6C6.55228 14 7 14.4477 7 15C7 15.5523 6.55228 16 6 16H5C3.34315 16 2 14.6569 2 13V5ZM9 10.8462C9 9.20041 10.42 8 12 8H19C20.58 8 22 9.20041 22 10.8462V19.1538C22 20.7996 20.58 22 19 22H12C10.42 22 9 20.7996 9 19.1538V10.8462ZM12 10C11.3708 10 11 10.4527 11 10.8462V19.1538C11 19.5473 11.3708 20 12 20H19C19.6292 20 20 19.5473 20 19.1538V10.8462C20 10.4527 19.6292 10 19 10H12Z" fill="currentColor"/></svg>';
      const tickIcon =
        '<?xml version="1.0" encoding="UTF-8"?><svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M19.7071 7.29289C20.0976 7.68342 20.0976 8.31658 19.7071 8.70711L9.70711 18.7071C9.31658 19.0976 8.68342 19.0976 8.29289 18.7071L4.29289 14.7071C3.90237 14.3166 3.90237 13.6834 4.29289 13.2929C4.68342 12.9024 5.31658 12.9024 5.70711 13.2929L9 16.5858L18.2929 7.29289C18.6834 6.90237 19.3166 6.90237 19.7071 7.29289Z" fill="currentColor"/></svg>';

      copyButton.innerHTML = copyIcon;
      copyButton.className =
        'absolute top-0 right-0 p-1 text-gray4 hover:text-gray3 bg-gray6 hover:bg-gray6 dark:bg-gray6 dark:text-gray5 dark:hover:text-gray4 text-xs transition-all duration-300 rounded-bl-md';
      copyButton.addEventListener('click', () => {
        // Get the innerHTML of the code block without the <span> tags
        const codeBlockInnerHTML = (block as HTMLElement).innerText;

        // Copy the code block's innerHTML to the clipboard
        navigator.clipboard.writeText(codeBlockInnerHTML);

        // Change the button text to "Copied!"
        copyButton.innerHTML = tickIcon;

        // Change the button text back to "Copy" after 2 seconds
        setTimeout(() => {
          copyButton.innerHTML = copyIcon;
        }, 2000);
      });

      block.parentElement?.appendChild(copyButton);
    });
  });

  return <>{children}</>;
}
