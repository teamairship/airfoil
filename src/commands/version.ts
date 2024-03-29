import { GluegunCommand } from 'gluegun';
import { GluegunToolboxExtended } from '../extensions/extensions';
import { interfaceHelpers } from '../utils/interface';
import { validations } from '../utils/validations';
import { HELP_DESCRIPTION_CMD_VERSION } from '../help-descriptions/cmd-version';
import { checkCommandHelp } from '../scripts/help';

const VERSION_TYPE_MAJOR = 'major';
const VERSION_TYPE_MINOR = 'minor';
const VERSION_TYPE_PATCH = 'patch';

const command: GluegunCommand = {
  name: 'version',
  alias: ['v'],
  description: HELP_DESCRIPTION_CMD_VERSION,
  run: async (toolbox: GluegunToolboxExtended) => {
    checkCommandHelp(toolbox);
    const { loadWhile } = interfaceHelpers(toolbox);
    const { checkCurrentDirReactNativeProject } = validations(toolbox);

    await loadWhile(checkCurrentDirReactNativeProject());

    await updateVersion(toolbox);
  },
};

const updateVersion = async (toolbox: GluegunToolboxExtended) => {
  const { parameters, print, printV } = toolbox;
  const { gray, cyan, yellow, red, green, white } = print.colors;
  const { cmd, printTask, loadWhile, sleep } = interfaceHelpers(toolbox);
  const { optUpdate } = toolbox.globalOpts;

  const type = parameters.first;
  checkParameters(toolbox);

  let typeColor = white;
  if (type === VERSION_TYPE_PATCH) typeColor = cyan;
  if (type === VERSION_TYPE_MINOR) typeColor = yellow;
  if (type === VERSION_TYPE_MAJOR) typeColor = red;

  const pkgJsonProps: string = await loadWhile(cmd('cat package.json | npx json version name'));
  const [currentVersion, appName] = pkgJsonProps.split(/\n/).filter(w => !!w);
  printV.info(gray(`App: ${appName.replace('\n', '')}`));
  printV.info(gray(`Current version: ${currentVersion.replace('\n', '')}`));
  if (type) printV.info(gray(`Version change: ${typeColor(`${type} release`)}`));
  printV.newline();

  let task;
  task = printTask('🔬 Checking some things...');
  const gitStatus = await cmd('git status');
  if (!/nothing to commit, working tree clean/.test(gitStatus)) {
    print.error('\nGit working directory is not clean!');
    print.error('Commit your work first and then try this command again.');
    print.newline();
    process.exit(1);
  }
  task.stop();

  // update package.json, ios, android version
  // see: https://docs.npmjs.com/cli/v6/commands/npm-version
  // see: https://www.npmjs.com/package/react-native-version
  task = printTask('🛩  Prepping next prototype for release...');
  await cmd(`npm --no-git-tag-version version ${optUpdate || type}`);
  const newVersionRaw = await cmd('cat package.json | npx json version');
  const newVersion = newVersionRaw.replace('\n', '');
  await cmd(`npx react-native-version --skip-tag --never-amend`);
  task.stop();

  task = printTask('📒 Updating Flight Ledger...');
  await cmd(`git tag -a v${newVersion} -m "v${newVersion}"`);
  await cmd(`git add --all`);
  await cmd(`git commit -m "bump version to ${newVersion}" --no-verify`);
  await sleep(500);
  task.stop();

  printV.newline();
  print.info(gray(`New version: ${green(newVersion)}`));
  printV.newline();
  printV.success(`${print.checkmark} All done!`);
};

const checkParameters = (toolbox: GluegunToolboxExtended) => {
  const { parameters } = toolbox;
  const { optUpdate } = toolbox.globalOpts;
  if (optUpdate) return;

  const type = parameters.first;
  if (!type || ![VERSION_TYPE_MAJOR, VERSION_TYPE_MINOR, VERSION_TYPE_PATCH].includes(type)) {
    printInvalidVersionArgs(toolbox);
    process.exit(1);
  }
};

const printInvalidVersionArgs = (toolbox: GluegunToolboxExtended) => {
  const { print } = toolbox;
  const { gray, cyan } = print.colors;
  print.error(
    `\`airfoil version <type>\` expects type to be one of [${VERSION_TYPE_MAJOR}|${VERSION_TYPE_MINOR}|${VERSION_TYPE_PATCH}]`,
  );
  print.info(
    gray(`If you are trying to print the airfoil version number, run \`${cyan('airfoil help')}\``),
  );
};

module.exports = command;
