import type { StatsBlock } from '@payload-types';
import { Stats } from '@website/src/components/common/stats';

export default function StatsBlockComponent(props: StatsBlock) {
  const { stats } = props;

  return (
    <Stats
      stats={
        stats?.map((stat) => ({
          name: stat.title,
          value: stat.value,
        })) ?? []
      }
    />
  );
}
