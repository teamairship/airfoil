import { DOCS_URL } from '../constants';

export const HELP_DESCRIPTION_CMD_CREATE = `airfoil [create | c]

Usage:

airfoil create # guides you through a quick wizard
airfoil create component [ComponentName] [-f folderName]
airfoil create hook [useHookName] [-f folderName]

Creates a file and places it in the correct directory. Currently supported options:
- component
- hook. For more information, visit the official documentation:
${DOCS_URL}/commands/create

`;
