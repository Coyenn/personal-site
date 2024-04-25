import CraftGrid from '@website/src/components/craft/craft-grid';
import type { Payload } from 'payload/types';

export default async function CraftBlockComponent(props: {
  payload: Payload;
}) {
  const items = await props.payload.find({
    collection: 'craft-items',
    limit: 999,
  });

  return <CraftGrid items={items.docs} />;
}
