import { getPosts } from '@/src/app/writing/posts';

export default function Sitemap() {
  const allPosts = getPosts();
  const posts = allPosts.map((post) => ({
    url: `https://tim-ritter.com/writing/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));
  const routes = ['', '/writing', '/colophon'].map((route) => ({
    url: `https://tim-ritter.com${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes, ...posts];
}
