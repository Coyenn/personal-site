import Aurora from '@/src/components/aurora';
import { Button } from '@/src/components/ui/button';
import Link from 'next/link';

export interface DownloadButtonProps {
  text: string;
  href: string;
  github?: string;
  target?: string;
}

export default function DownloadButton(props: DownloadButtonProps) {
  const { text, href, github, target } = props;

  return (
    <div className="relative overflow-hidden">
      <Aurora
        gradient="[--aurora:repeating-linear-gradient(100deg,#FFD3C6_15%,#FF8580_10%,#FEAF9E_20%,#FF16FF_25%,#FF0044_30%)] dark:[--aurora:repeating-linear-gradient(100deg,#002C39_15%,#007A7F_10%,#015061_20%,#00E980_25%,#00FFBB_30%)]"
        className="!absolute !w-[150%] !h-[150%] !inset-0 !left-[-25%] !object-cover !m-0 !border-0 z-0 !block"
        gradientClassName="!opacity-30"
      />
      <div className="flex flex-col sm:flex-row gap-2 border border-input dark:border-muted rounded-lg p-4 sm:p-6 lg:p-8 justify-center z-[1] relative">
        <Button asChild variant={'default'}>
          <Link href={href} target={target}>
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 3C12.5523 3 13 3.44772 13 4V13.0858L16.2929 9.79289C16.6834 9.40237 17.3166 9.40237 17.7071 9.79289C18.0976 10.1834 18.0976 10.8166 17.7071 11.2071L12.7071 16.2071C12.3166 16.5976 11.6834 16.5976 11.2929 16.2071L6.29289 11.2071C5.90237 10.8166 5.90237 10.1834 6.29289 9.79289C6.68342 9.40237 7.31658 9.40237 7.70711 9.79289L11 13.0858V4C11 3.44772 11.4477 3 12 3ZM4 13C4.55228 13 5 13.4477 5 14V18C5 18.5523 5.44772 19 6 19H18C18.5523 19 19 18.5523 19 18V14C19 13.4477 19.4477 13 20 13C20.5523 13 21 13.4477 21 14V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V14C3 13.4477 3.44772 13 4 13Z"
                fill="currentColor"
              />
            </svg>
            {text}
          </Link>
        </Button>
        {github && (
          <Button variant={'secondary'} className="gap-0" asChild>
            <Link href={github} target="_blank">
              View on GitHub
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
