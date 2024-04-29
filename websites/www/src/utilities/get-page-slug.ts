export function getPageSlug(slug?: string | string[]) {
  let pageSlug = '/';

  if (typeof slug === 'string') {
    pageSlug = pageSlug + slug;
  }

  if (Array.isArray(slug)) {
    pageSlug = pageSlug + slug.join('/');
  }

  if (pageSlug === '/index') {
    pageSlug = '/';
  }

  return pageSlug;
}
