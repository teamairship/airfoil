import { GluegunToolboxExtended } from '../extensions/extensions';

export const OPTION_HELP = 'help';

export const checkCommandHelp = (toolbox: GluegunToolboxExtended) => {
  const { print, parameters } = toolbox;
  const options = parameters.options;
  const helpOption = options[OPTION_HELP];

  if (helpOption) {
    print.info(toolbox.command.description);
    process.exit(1);
  }
};
