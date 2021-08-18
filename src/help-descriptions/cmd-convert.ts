import { DOCS_URL } from '../constants';

export const HELP_DESCRIPTION_CMD_CONVERT = `airfoil convert [svg]

Usage:

airfoil convert svg
airfoil convert svg --cleanup # to remove app/assets/svg after successful conversion

Converts .svg files to .tsx files for use in React Native. For more information, visit the official documentation:
${DOCS_URL}/commands/convert

`;
