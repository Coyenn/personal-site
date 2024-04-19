import '@website/src/styles/globals.scss';
import type React from 'react';

/* Our app sits here to not cause any conflicts with payload's root layout  */
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    // biome-ignore lint/a11y/useHtmlLang: <explanation>
    <html>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default Layout;
