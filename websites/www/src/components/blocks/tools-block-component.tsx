import type { ToolsBlock } from '@payload-types';
import { Tools } from '@website/src/components/common/tools';

export default function StatsBlockComponent(props: ToolsBlock) {
  const { tools } = props;

  return (
    <Tools
      tools={
        tools?.map((tool) => ({
          name: tool.title,
          description: tool.description,
          href: tool.link,
        })) ?? []
      }
    />
  );
}
