import configPromise from '@payload-config';
import { RootLayout } from '@payloadcms/next/layouts';

import type { Metadata } from 'next';
import type React from 'react';

import '@payloadcms/next/css';
import '@website/src/styles/admin.scss';
import '@website/src/styles/globals.scss';

export const metadata: Metadata = {
  title: 'Tim Ritter - CMS',
};

type Args = {
  children: React.ReactNode;
};

const Layout = ({ children }: Args) => (
  <RootLayout config={configPromise}>{children}</RootLayout>
);

export default Layout;
