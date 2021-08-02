import * as _ from 'lodash';
import { constantCase } from 'constant-case';
import { GluegunCommand } from 'gluegun';

import { GluegunToolboxExtended } from '../extensions/extensions';
import { generateAdr } from '../scripts/generateAdr';
import { generateEnvVar } from '../scripts/generateEnvVar';
import { interfaceHelpers } from '../utils/interface';
import { stripQuotes } from '../utils/formatting';
import { validations } from '../utils/validations';
import { generateAppCenterContent } from '../scripts/generateAppCenterContent';
import { getProjectName } from '../utils/meta';
import { generatePassword } from '../utils/password';
import { addTemplateAndPromptIfExisting } from '../utils/content';
import { checkCommandHelp } from '../scripts/help';
import { HELP_DESCRIPTION_CMD_ADD } from '../constants';
import { addAppIcon } from '../scripts/addAppIcon';

const { padEnd, kebabCase } = _;

const TYPE_ENV = 'env';
const TYPE_ADR = 'adr';
const TYPE_APPCENTER = 'appcenter';
const TYPE_APPCENTER_ALT = 'app-center';
const TYPE_KEYSTORE = 'keystore';
const TYPE_APP_ICON = 'appicon';
const TYPE_APP_ICON_ALT = 'app-icon';
const VALID_TYPES = [TYPE_ENV, TYPE_ADR, TYPE_APPCENTER, TYPE_APPCENTER_ALT, TYPE_KEYSTORE, TYPE_APP_ICON, TYPE_APP_ICON_ALT];
type ENV_TYPE = 'string' | 'boolean';

const command: GluegunCommand = {
  name: 'add',
  alias: ['gen', 'g', 'add', 'a'],
  description: HELP_DESCRIPTION_CMD_ADD,
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
      case TYPE_ENV:
        return commandEnv(toolbox);

      case TYPE_ADR:
        return commandAdr(toolbox);

      case TYPE_APPCENTER:
      case TYPE_APPCENTER_ALT:
        return commandAppCenter(toolbox);

      case TYPE_KEYSTORE:
        return commandKeystore(toolbox);

      case TYPE_APP_ICON:
      case TYPE_APP_ICON_ALT:
        return commandAppIcon(toolbox);

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
  adrStatus: {
    type: 'select',
    name: 'adrStatus',
    message: 'What is the status?',
    choices: [`accepted`, `proposed`, `rejected`, `deprecated`, `superseded`, `other`],
  },
  adrContext: {
    type: 'input',
    name: 'adrContext',
    message:
      "Context - What is the issue that we're seeing that is motivating this decision or change? (LEAVE BLANK TO SKIP)\n",
  },
  adrDecision: {
    type: 'input',
    name: 'adrDecision',
    message:
      "Decision - What is the change that we're proposing and/or doing? (LEAVE BLANK TO SKIP)\n",
  },
  adrConsequences: {
    type: 'input',
    name: 'adrConsequences',
    message:
      'Consequences - What becomes easier or more difficult to do because of this change? (LEAVE BLANK TO SKIP)\n',
  },
};

/**
 * Generate an Architecture Decision Record (ADR)
 * @param toolbox
 */
const commandAdr = async (toolbox: GluegunToolboxExtended) => {
  const { parameters, print } = toolbox;
  const { promptQuestion } = interfaceHelpers(toolbox);
  const adrTitle = parameters.second || (await promptQuestion(questionsAdr.adrTitle));
  if (!adrTitle) {
    print.error(`ADR Title required for \`airfoil generate adr\``);
    process.exit(1);
  }
  const adrStatus: string = await promptQuestion(questionsAdr.adrStatus);
  const adrContext: string = await promptQuestion(questionsAdr.adrContext);
  const adrDecision: string = await promptQuestion(questionsAdr.adrDecision);
  const adrConsequences: string = await promptQuestion(questionsAdr.adrConsequences);
  return generateAdr(toolbox, adrTitle, adrStatus, adrContext, adrDecision, adrConsequences);
};

const questionsAppCenter = {
  secretKey: {
    type: 'input',
    name: 'appCenterSecret',
    message: 'What is your AppCenter secret? (leave blank to skip)',
  },
};

const promptAppCenterSecret = async (toolbox: GluegunToolboxExtended): Promise<string> => {
  const { prompt } = toolbox;
  const { appCenterSecret } = await prompt.ask([questionsAppCenter.secretKey]);
  return appCenterSecret || '{APP_SECRET_VALUE}';
};

const commandAppCenter = async (toolbox: GluegunToolboxExtended) => {
  const { cmd, runTask } = interfaceHelpers(toolbox);
  const { print } = toolbox;
  const { optDry } = toolbox.globalOpts;

  const projectName = await getProjectName(toolbox);
  const appCenterSecret = await promptAppCenterSecret(toolbox);

  if (!optDry) {
    print.info('🔧 installing appcenter deps...');
    await runTask('', async () => {
      await cmd('yarn add appcenter appcenter-analytics appcenter-crashes --exact');
    });
  }

  await generateAppCenterContent(toolbox, projectName, appCenterSecret);
};

const commandAppIcon = async (toolbox: GluegunToolboxExtended) => {
  const projectName = await getProjectName(toolbox);

  await addAppIcon(toolbox, projectName);
};

const commandKeystore = async (toolbox: GluegunToolboxExtended) => {
  const { cmd, runTask, loadWhile } = interfaceHelpers(toolbox);
  const { print, filesystem } = toolbox;
  const { bgYellow, black, bold, gray, cyan, dim, green } = toolbox.print.colors;

  const projectName = await loadWhile(getProjectName(toolbox));
  const keyAlias = `${kebabCase(projectName)}-dist`;
  const keystoreFilename = `${keyAlias}.keystore`;
  const keystoreFilepath = `android/app/${keystoreFilename}`;
  const keystorePassword = generatePassword(50);
  const keyPassword = generatePassword(50);

  const commonName = 'Airship Builder';
  const unit = 'IT';
  const org = 'Airship LLC';
  const city = 'Birmingham';
  const state = 'AL';
  const country = 'US';

  if (filesystem.exists(keystoreFilepath)) {
    print.error(`${keystoreFilepath} already exists.`);
    process.exit(1);
  }

  await runTask('🔑  generating keystore...', async () => {
    await cmd(`cd android/app && keytool -genkeypair -v \
    -dname "CN=${commonName}, OU=${unit}, O=${org}, L=${city}, S=${state}, C=${country}" \
    -keystore "${keystoreFilename}" -storepass "${keystorePassword}" \
    -keyalg RSA -keysize 2048 \
    -alias "${keyAlias}" -keypass "${keyPassword}" \
    -validity 10000`);
  });
  print.success(`${print.checkmark} added ${keystoreFilepath}`);
  await addTemplateAndPromptIfExisting(toolbox, {
    target: 'android/keystore.properties',
    template: 'android/keystore.properties.ejs',
    props: {
      keyAlias,
      keyPassword,
      keystoreFilepath,
      keystorePassword,
    },
  });

  // prettier-ignore
  const printDirections = () => {
    const printCode = msg => print.code(msg, 70);
    printCode('');
    printCode(green('Successfully generated Android keystore'));
    printCode('');
    printCode(bgYellow(black(bold(` ${padEnd('STOP! Go ahead and do the following:', 68, ' ')} `))));
    printCode(bgYellow(black(` ${padEnd('  • upload the generated keystore file to 1Password as a "document"', 68, ' ')} `)));
    printCode(bgYellow(black(` ${padEnd('  • include the KeystorePassword, KeystoreAlias, and KeystorePass', 68, ' ')} `)));
    printCode('');
    printCode(cyan(`${gray('KeystoreFile:')} ${keystoreFilepath}`));
    printCode(cyan(`${gray('KeystorePassword:')} ${keystorePassword}`));
    printCode(cyan(`${gray('KeystoreAlias:')} ${keyAlias}`));
    printCode(cyan(`${gray('KeyPassword:')} ${keyPassword}`));
    printCode('');
    printCode(dim(`CommonName: ${commonName}`));
    printCode(dim(`Organizational Unit: ${unit}`));
    printCode(dim(`Organization: ${org}`));
    printCode(dim(`City: ${city}`));
    printCode(dim(`State: ${state}`));
    printCode(dim(`Country: ${country}`));
    printCode('');
    print.newline();
  }
  printDirections();
};

module.exports = command;
