import { DOCS_URL } from '../constants';

export const HELP_DESCRIPTION_CMD_VERSION = `airfoil version [major | minor | patch]

Usage:

airfoil version patch # patch release (0.0.1 -> 0.0.2)
airfoil version minor # minor release (0.0.2 -> 0.1.0)
airfoil version major # major release (0.1.0 -> 1.0.0)
airfoil version -u 4.5.6 # update exact version

Updates the version in package.json as well as ios/ and android/ directories. For more information, visit the official documentation:
${DOCS_URL}/commands/version

`;
