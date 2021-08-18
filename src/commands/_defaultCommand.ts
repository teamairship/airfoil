import { GluegunCommand } from 'gluegun';
import { GluegunToolboxExtended } from '../extensions/extensions';
import { checkCommandHelp } from '../scripts/help';

/**
 * This is the command that runs by default if no other commands match.
 * See: https://github.com/infinitered/gluegun/blob/master/docs/runtime.md#defaultcommand
 */
const command: GluegunCommand = {
  name: 'airfoil',
  run: async (toolbox: GluegunToolboxExtended) => {
    checkCommandHelp(toolbox);
    const { print, meta, parameters } = toolbox;

    const isRequestingVersion = Boolean(parameters.options.version);
    if (isRequestingVersion) {
      print.info(meta.version());
      process.exit(0);
    }

    const composedParameters = parameters.array ? parameters.array.join(' ') : '';
    const composedCommand = `airfoil ${composedParameters}`;

    if (!composedParameters) {
      print.error(
        `No command specified for \`airfoil\`. Run \`airfoil --help\` for list of available commands.`,
      );
      process.exit(1);
    }

    print.error(
      `\`${composedCommand}\` is not a valid command. Run \`airfoil --help\` for list of available commands.`,
    );
    process.exit(1);
  },
};

module.exports = command;
