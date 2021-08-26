import { DOCS_URL } from '../constants';

export const HELP_DESCRIPTION_CMD_ADD = `airfoil add [env | appcenter | adr | keystore]

Usage:

airfoil add env # if args omitted -> prompts to get ENV key, value

airfoil add env MY_VAR=mydatahere
airfoil add appcenter # follow prompts
airfoil add adr # follow prompts
airfoil add adr "Choose Cognito for Auth" # specify ADR title as arg1
airfoil add keystore

For more information, visit the official documentation:
${DOCS_URL}/commands/add

`;
