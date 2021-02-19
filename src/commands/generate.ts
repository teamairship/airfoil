import { constantCase } from 'constant-case';

import { GluegunToolboxExtended } from '../extensions/extensions';
import { generateAdr } from '../scripts/generateAdr';
import { generateEnvVar } from '../scripts/generateEnvVar';
import { interfaceHelpers } from '../utils/interface';
import { stripQuotes } from '../utils/formatting';
import { validations } from '../utils/validations';

const TYPE_ENV = 'env';
const TYPE_ADR = 'adr';
const VALID_TYPES = [TYPE_ENV, TYPE_ADR];
type ENV_TYPE = 'string' | 'boolean';

const command = {
  name: 'generate',
  alias: ['gen', 'g', 'add', 'a'],
  run: async (toolbox: GluegunToolboxExtended) => {
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
      case TYPE_ENV:
        return commandEnv(toolbox);

      case TYPE_ADR:
        return commandAdr(toolbox);

      default:
        return printInvalidArgs(toolbox);
    }
  },
};

const questionsEnv = {
  envKey: {
    type: 'input',
    name: 'envKey',
    message: 'Enter the ENV name:',
  },
  envVal: {
    type: 'input',
    name: 'envVal',
    message: 'Enter the ENV value (Optional):',
  },
};

const promptEnvKey = async (toolbox: GluegunToolboxExtended): Promise<string> => {
  const { prompt } = toolbox;
  const { envKey } = await prompt.ask([questionsEnv.envKey]);
  return envKey;
};

const promptEnvVal = async (toolbox: GluegunToolboxExtended): Promise<string> => {
  const { prompt } = toolbox;
  const { envVal } = await prompt.ask([questionsEnv.envVal]);
  return envVal;
};

const printInvalidArgs = (toolbox: GluegunToolboxExtended) => {
  const { print } = toolbox;
  print.error(`\`airfoil generate <type>\` expects type to be one of [${VALID_TYPES.join('|')}]`);
};

/**
 * Update .env, .env.example, app/constants.ts, and appcenter-pre-build.ts with ENV var data
 * @param toolbox
 */
const commandEnv = async (toolbox: GluegunToolboxExtended) => {
  const { print, printV, parameters } = toolbox;
  const { gray, cyan } = print.colors;

  // omit first arg since that is "env"
  const args = parameters.array.slice(1);
  const optBool = parameters.options.boolean || parameters.options.bool || parameters.options.b;
  const optComment = parameters.options.comment || parameters.options.c;

  const printArg = (key: string, val: string) => printV.info(gray(`${key}: ${cyan(val)}`));
  const nextArg = (onArgFound?: (arg: string) => void) => {
    const val = args.shift() || null;
    if (onArgFound && val) onArgFound(val);
    return val;
  };

  let envKey: string;
  let envVal: string;
  let envType: ENV_TYPE;
  let envComment: string;

  const REG_ENV_ASSIGN = /^.+=.*$/;
  if (REG_ENV_ASSIGN.test(args[0])) {
    // parse ENV, VAL from `airfoil generate env ENV=VAL`
    [envKey, envVal] = nextArg().split('=');
    printArg('ENV name', constantCase(envKey));
    printArg('ENV val', envVal);
  } else {
    // parse ENV, VAL from `airfoil generate env ENV VAL`
    // prettier-ignore
    envKey = nextArg(arg => printArg('ENV name', constantCase(arg))) || (await promptEnvKey(toolbox));
    envVal = nextArg(arg => printArg('ENV val', arg)) || (await promptEnvVal(toolbox));
  }

  envKey = stripQuotes(envKey);
  envVal = stripQuotes(envVal);
  envType = optBool || envVal === 'true' || envVal === 'false' ? 'boolean' : 'string';
  envComment = optComment ? stripQuotes(optComment) : '';

  await generateEnvVar({ toolbox, envKey, envVal, envType, envComment });
};

const questionsAdr = {
  adrTitle: {
    type: 'input',
    name: 'adrTitle',
    message: "What is your ADR's title?",
  },
};

const promptAdrTitle = async (toolbox: GluegunToolboxExtended): Promise<string> => {
  const { prompt } = toolbox;
  const { adrTitle } = await prompt.ask([questionsAdr.adrTitle]);
  return adrTitle;
};

/**
 * Generate an Architecture Decision Record (ADR)
 * @param toolbox
 */
const commandAdr = async (toolbox: GluegunToolboxExtended) => {
  const { parameters, print } = toolbox;
  const adrTitle = parameters.second || (await promptAdrTitle(toolbox));
  if (!adrTitle) {
    print.error(`ADR Title required for \`airfoil generate adr\``);
    process.exit(1);
  }
  return generateAdr(toolbox, adrTitle);
};

module.exports = command;
