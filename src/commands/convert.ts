import { GluegunCommand } from 'gluegun';
import { GluegunToolboxExtended } from '../extensions/extensions';
import { convertSvg } from '../scripts/convertSvg';
import { interfaceHelpers } from '../utils/interface';
import { validations } from '../utils/validations';
import { checkCommandHelp } from '../scripts/help';
import { HELP_DESCRIPTION_CMD_CONVERT } from '../help-descriptions/cmd-convert';

const TYPE_SVG = 'svg';
const VALID_TYPES = [TYPE_SVG];

const command: GluegunCommand = {
  name: 'convert',
  description: HELP_DESCRIPTION_CMD_CONVERT,
  run: async (toolbox: GluegunToolboxExtended) => {
    checkCommandHelp(toolbox);
    const { parameters } = toolbox;
    const { loadWhile } = interfaceHelpers(toolbox);
    const { checkCurrentDirReactNativeProject } = validations(toolbox);

    await loadWhile(checkCurrentDirReactNativeProject());

    const type = parameters.first;

    if (!type || !VALID_TYPES.includes(type)) {
      printInvalidArgs(toolbox);
      process.exit(1);
    }

    switch (type) {
      case TYPE_SVG:
        return commandConvertSvg(toolbox);

      default:
        return printInvalidArgs(toolbox);
    }
  },
};

const printInvalidArgs = (toolbox: GluegunToolboxExtended) => {
  const { print } = toolbox;
  print.error(`\`airfoil convert <type>\` expects type to be one of [${VALID_TYPES.join('|')}]`);
};

/**
 * Convert svg files to .tsx component files
 * @param toolbox
 */
const commandConvertSvg = async (toolbox: GluegunToolboxExtended) => {
  const { parameters } = toolbox;
  const cleanup = parameters.options.cleanup || false;
  await convertSvg(toolbox, cleanup);
};

module.exports = command;
