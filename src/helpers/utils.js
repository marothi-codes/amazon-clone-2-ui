/**
 * Converts a string into a URL and SEO friendly slug.
 * @param {String} text The input text to convert into a slug.
 * @returns {String} The slug.
 */
export const slugify = (text) => {
  return (
    text
      .toString() // Called just to prevent any casting error.
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove accents.
      .toLowerCase() // Ensure that the whole string is all lowercase letters.
      .replace(/\s+/g, "-") // Replace all spaces with hyphens.
      //.replace(/[^\w\-]+/g, "") // Remove all non-letter characters.
      .replace(/^-+/, "") // trim the beginning of the string.
      .replace(/-+$/, "")
  ); // trim the end of the string as well...
};

export const prices = [
  {
    name: "Any",
    min: 0,
    max: 0,
  },
  {
    name: `R10 to R100`,
    min: 10,
    max: 100,
  },
  {
    name: `R100 to R1000`,
    min: 100,
    max: 1000,
  },
];
export const ratings = [
  {
    name: "4stars & up",
    rating: 4,
  },

  {
    name: "3stars & up",
    rating: 3,
  },

  {
    name: "2stars & up",
    rating: 2,
  },

  {
    name: "1stars & up",
    rating: 1,
  },
];
