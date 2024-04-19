import configPromise from '@payload-config';
import { RootLayout } from '@payloadcms/next/layouts';
/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import type React from 'react';

import '@payloadcms/next/css';
import '@website/src/styles/globals.scss';

type Args = {
  children: React.ReactNode;
};

const Layout = ({ children }: Args) => (
  <RootLayout config={configPromise}>{children}</RootLayout>
);

export default Layout;
