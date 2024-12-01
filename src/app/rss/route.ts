import { getPosts } from '@/src/app/writing/posts';

export const GET = () => {
  const posts = getPosts();

  const itemsXml = posts
    .sort((a, b) => {
      if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
        return -1;
      }
      return 1;
    })
    .map(
      (post) =>
        `<item>
          <title>${post.metadata.title}</title>
          <link>https://tim-ritter.com/writing/${post.slug}</link>
          <description>${post.metadata.summary}</description>
          <pubDate>${new Date(post.metadata.publishedAt).toUTCString()}</pubDate>
        </item>`,
    )
    .join('\n');

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
        <title>Tim Ritter | Writing</title>
        <link>https://tim-ritter.com</link>
        ${itemsXml}
    </channel>
  </rss>`;

  return new Response(rssFeed, { headers: { 'Content-Type': 'text/xml' } });
};
