function slugify(str: string): string {
  return (
    String(str)
      .normalize('NFKD') // split accented characters into their base characters and diacritical marks
      // biome-ignore lint/suspicious/noMisleadingCharacterClass: The regex is fine
      .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
      .trim() // trim leading or trailing whitespace
      .toLowerCase() // convert to lowercase
      .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
      .replace(/\s+/g, '-') // replace spaces with hyphens
      .replace(/-+/g, '-')
  ); // remove consecutive hyphens
}

export default slugify;
