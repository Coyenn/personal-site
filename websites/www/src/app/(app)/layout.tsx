import '@website/src/styles/globals.scss';
import type React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout(props: LayoutProps) {
  const { children } = props;

  return (
    <html lang='en'>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}

export default Layout;
