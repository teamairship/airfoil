import { GluegunToolbox } from 'gluegun';
import { constantCase } from 'constant-case';

import { interfaceHelpers } from '../utils/interface';
import { addEnvVar, addConstant, addAppCenterVar } from '../utils/envVar';
import { stripQuotes } from '../utils/formatting';
import { toolPrintDiff } from '../utils/diff';
import { toolGetFileContent } from '../utils/content';

const TYPE_ENV = 'env';
const VALID_TYPES = [TYPE_ENV];
type ENV_TYPE = 'string' | 'boolean';

const command = {
  name: 'generate',
  alias: ['gen', 'g', 'add', 'a'],
  run: async (toolbox: GluegunToolbox) => {
    const { parameters } = toolbox;
    const { titleSecondary, about } = interfaceHelpers(toolbox);

    titleSecondary();
    about();

    const type = parameters.first;

    if (!type || !VALID_TYPES.includes(type)) {
      printInvalidArgs(toolbox);
      process.exit(1);
    }

    switch (type) {
      case TYPE_ENV:
        return generateEnvVar(toolbox);

      default:
        return printInvalidArgs(toolbox);
    }
  },
};

/**
 * Update .env, .env.example, app/constants.ts, and appcenter-pre-build.ts with ENV var data
 * @param toolbox
 */
const generateEnvVar = async (toolbox: GluegunToolbox) => {
  const { print, parameters } = toolbox;
  const { gray, cyan } = print.colors;

  // omit first arg since that is "env"
  const args = parameters.array.slice(1);
  const optDry = parameters.options.dry;
  const optBool = parameters.options.boolean || parameters.options.bool || parameters.options.b;
  const optComment = parameters.options.comment || parameters.options.c;

  const printArg = (key, val) => print.info(gray(`${key}: ${cyan(val)}`));
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
  envType = optBool ? 'boolean' : await promptEnvType(toolbox);
  envComment = optComment ? stripQuotes(optComment) : await promptEnvComment(toolbox);

  const [printDiff, cleanup] = toolPrintDiff(toolbox);
  await processEnvFile({
    filePath: '.env',
    defaultContent: await defaultContentEnv(toolbox),
    toNewContent: content => addEnvVar(content, envKey, envVal, envComment),
    printDiff,
    toolbox,
    optDry,
  });

  await processEnvFile({
    filePath: '.env.example',
    defaultContent: await defaultContentEnv(toolbox),
    toNewContent: content => addEnvVar(content, envKey, '', envComment),
    printDiff,
    toolbox,
    optDry,
  });

  await processEnvFile({
    filePath: 'app/constants.ts',
    defaultContent: await defaultContentConstants(toolbox),
    toNewContent: content => addConstant(content, envKey, envComment, envType),
    printDiff,
    toolbox,
    optDry,
  });

  await processEnvFile({
    filePath: 'appcenter-pre-build.sh',
    defaultContent: await defaultContentAppCenter(toolbox),
    toNewContent: content => addAppCenterVar(content, envKey),
    printDiff,
    toolbox,
    optDry,
  });

  cleanup();
};

const questions = {
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
  envType: {
    type: 'select',
    name: 'envType',
    message: 'Type of ENV?',
    choices: ['string', 'boolean'],
  },
  envComment: {
    type: 'input',
    name: 'envComment',
    message: 'Add a comment? (Leave blank to skip):',
  },
};

const promptEnvKey = async (toolbox: GluegunToolbox): Promise<string> => {
  const { prompt } = toolbox;
  const { envKey } = await prompt.ask([questions.envKey]);
  return envKey;
};

const promptEnvVal = async (toolbox: GluegunToolbox): Promise<string> => {
  const { prompt } = toolbox;
  const { envVal } = await prompt.ask([questions.envVal]);
  return envVal;
};

const promptEnvType = async (toolbox: GluegunToolbox): Promise<ENV_TYPE> => {
  const { prompt } = toolbox;
  const { envType } = await prompt.ask([questions.envType]);
  if (envType === 'string') return 'string';
  if (envType === 'boolean') return 'boolean';
  throw new Error(`Unexpected ENV type: \`${envType}\``);
};

const promptEnvComment = async (toolbox: GluegunToolbox): Promise<string> => {
  const { prompt } = toolbox;
  const { envComment } = await prompt.ask([questions.envComment]);
  return envComment;
};

const processEnvFile = ({
  filePath,
  defaultContent,
  toNewContent,
  printDiff,
  toolbox,
  optDry,
}: {
  filePath: string;
  defaultContent?: string;
  toNewContent: (content: string) => string;
  printDiff: (content: string, newContent: string) => Promise<void>;
  toolbox: GluegunToolbox;
  optDry?: boolean;
}): Promise<void> => {
  const { filesystem, print } = toolbox;
  const getFileContent = toolGetFileContent(toolbox);
  try {
    const content = getFileContent(filePath, defaultContent);
    const newContent = toNewContent(content);
    if (optDry) return printDiff(content, newContent);

    filesystem.write(filePath, newContent);
    print.success(`${print.checkmark} updated ${filePath}`);
  } catch (err) {
    print.error(err);
  }
};

const defaultContentEnv = async (toolbox: GluegunToolbox) =>
  toolbox.template.generate({
    template: '.env.ejs',
  });

const defaultContentConstants = async (toolbox: GluegunToolbox) =>
  toolbox.template.generate({
    template: 'constants.ts.ejs',
  });

const defaultContentAppCenter = async (toolbox: GluegunToolbox) =>
  toolbox.template.generate({
    template: 'appcenter-pre-build.sh.ejs',
  });

const printInvalidArgs = (toolbox: GluegunToolbox) => {
  const { print } = toolbox;
  print.error(`\`airfoil generate <type>\` expects type to be one of [${VALID_TYPES.join('|')}]`);
};

module.exports = command;
