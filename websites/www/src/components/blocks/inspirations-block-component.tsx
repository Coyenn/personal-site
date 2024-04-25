import Inspirations from '@website/src/components/common/inspirations';
import type { Payload } from 'payload/types';

export default async function InspirationsBlockComponent(props: {
  payload: Payload;
}) {
  const items = await props.payload.find({
    collection: 'inspiration-items',
    limit: 999,
  });

  return <Inspirations items={items.docs} />;
}
