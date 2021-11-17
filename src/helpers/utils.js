/**
 * Converts a string into a URL and SEO friendly slug.
 * @param {String} text The input text to convert into a slug.
 * @returns {String} The slug.
 */
export const slugify = (text) => {
  return text
    .toString() // Called just to prevent any casting error.
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents.
    .toLowerCase() // Ensure that the whole string is all lowercase letters.
    .replace(/\s+/g, "-") // Replace all spaces with hyphens.
    .replace(/[^\w\-]+/g, "") // Remove all non-letter characters.
    .replace(/^-+/, "") // trim the beginning of the string.
    .replace(/-+$/, ""); // trim the end of the string as well...
};
