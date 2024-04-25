import dynamic from 'next/dynamic';

const ShowReel = dynamic(
  () => import('@website/src/components/common/show-reel'),
  {
    ssr: false,
  },
);

export default function ShowReelBlockComponent() {
  return <ShowReel />;
}
