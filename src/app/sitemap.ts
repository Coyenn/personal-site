import { getPosts } from '@/src/app/writing/posts';

export default function Sitemap() {
  const allPosts = getPosts();
  const posts = allPosts.map((post) => ({
    url: `https://tim.cv/writing/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));
  const routes = ['', '/writing', '/colophon', '/craft'].map((route) => ({
    url: `https://tim.cv${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes, ...posts];
}
