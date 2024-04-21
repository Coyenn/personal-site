import type React from 'react';
import { Analytics } from '@vercel/analytics/react';

import '@website/src/styles/globals.scss';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout(props: LayoutProps) {
  const { children } = props;

  return (
    <html lang='en'>
      <body>
        <main>{children}</main>
        <Analytics />
      </body>
    </html>
  );
}

export default Layout;
