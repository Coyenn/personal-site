export default function getItemInNestObject(
  path: string,
  // biome-ignore lint/suspicious/noExplicitAny: This is a generic utility function
  object: Record<string, any>
): unknown {
  if (!object) {
    return null;
  }
  const item = path.split(".").reduce((previous, current) => {
    if (previous && current in previous) {
      return previous[current];
    }
  }, object);

  return item;
}
