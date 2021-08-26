import { GluegunToolboxExtended } from '../extensions/extensions';
import { DOCS_URL } from '../constants';

export const OPTION_HELP = 'help';

export const checkCommandHelp = (toolbox: GluegunToolboxExtended) => {
  const { print, parameters } = toolbox;
  const options = parameters.options;
  const helpOption = options[OPTION_HELP];

  if (helpOption) {
    print.info(toolbox.command.description);
    print.info(`View official documentation at ${DOCS_URL}`);
    process.exit(0);
  }
};
