import { GluegunToolbox } from 'gluegun';
import { interfaceHelpers } from '../utils/interface';
import { validations } from '../utils/validations';

const VERSION_TYPE_MAJOR = 'major';
const VERSION_TYPE_MINOR = 'minor';
const VERSION_TYPE_PATCH = 'patch';

const command = {
  name: 'version',
  alias: ['v'],
  run: async (toolbox: GluegunToolbox) => {
    const { titleSecondary, about, loadWhile } = interfaceHelpers(toolbox);
    const { checkCurrentDirReactNativeProject } = validations(toolbox);

    titleSecondary();
    about();

    await loadWhile(checkCurrentDirReactNativeProject());

    updateVersion(toolbox);
  },
};

const updateVersion = async (toolbox: GluegunToolbox) => {
  const { parameters, print } = toolbox;
  const { gray, cyan, yellow, red, green } = print.colors;
  const { cmd, printTask, loadWhile } = interfaceHelpers(toolbox);

  const type = parameters.first;
  if (!type || ![VERSION_TYPE_MAJOR, VERSION_TYPE_MINOR, VERSION_TYPE_PATCH].includes(type)) {
    printInvalidVersionArgs(toolbox);
    process.exit(1);
  }

  let typeColor = cyan;
  if (type === VERSION_TYPE_MINOR) typeColor = yellow;
  if (type === VERSION_TYPE_MAJOR) typeColor = red;

  const pkgJsonProps: string = await loadWhile(cmd('cat package.json | npx json version name'));
  const [currentVersion, appName] = pkgJsonProps.split(/\n/).filter(w => !!w);
  print.info(gray(`App: ${appName.replace('\n', '')}`));
  print.info(gray(`Current version: ${currentVersion.replace('\n', '')}`));
  print.info(gray(`Version change: ${typeColor(`${type} release`)}`));
  print.newline();

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
  task = printTask('🍳 Cooking version number...');
  await cmd(`npm --no-git-tag-version version ${type}`);
  const newVersionRaw = await cmd('cat package.json | npx json version');
  const newVersion = newVersionRaw.replace('\n', '');
  await cmd(`npx react-native-version --skip-tag --never-amend`);
  task.stop();

  print.newline();
  print.info(gray(`New version: ${green(newVersion)}`));
  print.newline();

  task = printTask('🎓 Graduating to Git...');
  await cmd(`git tag -a v${newVersion} -m "v${newVersion}"`);
  await cmd(`git add --all`);
  await cmd(`git commit -m "bump version to ${newVersion}"`);
  task.stop();

  print.newline();
  print.success(`${print.checkmark} All done!`);
};

const printInvalidVersionArgs = (toolbox: GluegunToolbox) => {
  const { print } = toolbox;
  const { gray, cyan } = print.colors;
  print.error(
    `\`airfoil update version <type>\` expects type to be one of [${VERSION_TYPE_MAJOR}|${VERSION_TYPE_MINOR}|${VERSION_TYPE_PATCH}]`,
  );
  print.info(
    gray(`If you are trying to print the airfoil version number, run \`${cyan('airfoil help')}\``),
  );
};

module.exports = command;
