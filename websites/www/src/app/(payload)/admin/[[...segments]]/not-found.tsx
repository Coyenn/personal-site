import type { Metadata } from 'next';
import config from '@payload-config';
import { NotFoundPage, generatePageMetadata } from '@payloadcms/next/views';

type Args = {
  params: {
    segments: string[];
  };
  searchParams: {
    [key: string]: string | string[];
  };
};

export const generateMetadata = ({
  params,
  searchParams,
}: Args): Promise<Metadata> =>
  generatePageMetadata({ config, params, searchParams });

const NotFound = ({ params, searchParams }: Args) =>
  NotFoundPage({ config, params, searchParams });

export default NotFound;
