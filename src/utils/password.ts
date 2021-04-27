const LOWERCASE_CHARS = 'abcdefghijklmnopqrswuvwxyz';
const UPPERCASE_CHARS = 'ABCDEFGHIJKLMNOPQRSWUVWXY';
const NUMERIC_CHARS = '0123456789';
const DEFAULT_VALID_CHARS = UPPERCASE_CHARS + LOWERCASE_CHARS + NUMERIC_CHARS;

export const generatePassword = (length = 50, tries = 0) => {
  let passphrase = '';
  for (let i = 0; i < length; i++) {
    passphrase += DEFAULT_VALID_CHARS[Math.floor(Math.random() * DEFAULT_VALID_CHARS.length)];
  }

  // make sure password is valid
  let hasAlphaLower = false;
  let hasAlphaUpper = false;
  let hasNumber = false;
  for (let i = 0; i < passphrase.length; i++) {
    if (LOWERCASE_CHARS.includes(passphrase[i])) hasAlphaLower = true;
    if (UPPERCASE_CHARS.includes(passphrase[i])) hasAlphaUpper = true;
    if (NUMERIC_CHARS.includes(passphrase[i])) hasNumber = true;
  }
  if (!hasAlphaLower || !hasAlphaUpper || !hasNumber) {
    if (tries > 10) throw new Error(`Could not generate password after ${tries} tries.`);
    return generatePassword(length, tries + 1);
  }

  return passphrase;
};
