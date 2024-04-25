import BlogPosts from '@website/src/components/common/blog-posts';
import type { Payload } from 'payload/types';

export default async function TextBlockComponent(props: { payload: Payload }) {
  const blogPosts = await props.payload.find({
    collection: 'blog-posts',
    limit: 10,
  });

  return <BlogPosts items={blogPosts.docs} />;
}
