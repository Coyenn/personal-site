import Aurora from '@/src/components/aurora';
import DownloadIcon from '@/src/components/icons/download-icon';
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
            <DownloadIcon />
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
