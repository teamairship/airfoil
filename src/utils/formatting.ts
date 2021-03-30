/**
 * Strip beginning and end quotes from a string
 * @param str
 */
export const stripQuotes = (str = '') => {
  if (!str) return '';

  return str.replace(/^"/g, '').replace(/"$/g, '');
};
