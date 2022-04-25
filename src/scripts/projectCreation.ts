import { GluegunToolboxExtended } from '../extensions/extensions';
import { AIRSHIP_EMAIL, DEFAULT_PROJECT_VERSION, TEMPLATES_REPO_URL, Template } from '../constants';
import { interfaceHelpers } from '../utils/interface';
const decamelize = require('decamelize');

/**
 * Clones the template from the repository on Airship's GitHub profile
 * @param template which template to install
 * @param projectName name of the project
 * @param toolbox Gluegun-supplied toolbox
 */
export const copyFilesFromTemplateRepo = async (
  projectName: string,
  template: Template,
  toolbox: GluegunToolboxExtended,
) => {
  const { cmd, printTask } = interfaceHelpers(toolbox);
  const task = printTask('Applying template files...');

  // create temporary directory for cloned template
  const TEMP_DIR = `_AIRFOIL_TEMP_${projectName}`;
  const SELECTED_TEMPLATE = `${TEMP_DIR}/templates/${template}`;

  // clone repo into temp directory
  await cmd(`git clone ${TEMPLATES_REPO_URL} ${TEMP_DIR}`);

  // copy over app directory
  await cmd(`cp -R ${SELECTED_TEMPLATE}/app/. ${projectName}/app`);

  // replace index.js file
  await cmd(`rm -rf ${projectName}/index.js`);
  await cmd(`cp ${SELECTED_TEMPLATE}/index.js ${projectName}`);

  // replace package.json
  await cmd(`rm -rf ${projectName}/package.json`);
  await cmd(`cp ${SELECTED_TEMPLATE}/package.json ${projectName}`);

  // replace tsconfig
  await cmd(`rm -rf ${projectName}/tsconfig.json`);
  await cmd(`cp ${SELECTED_TEMPLATE}/tsconfig.json ${projectName}`);

  // replace eslint config
  await cmd(`rm -rf ${projectName}/.eslintrc.js`);
  await cmd(`cp ${SELECTED_TEMPLATE}/.eslintrc.js ${projectName}`);

  // replace prettier config
  await cmd(`rm -rf ${projectName}/.prettierrc.js`);
  await cmd(`cp ${SELECTED_TEMPLATE}/.prettierrc.js ${projectName}`);
  await cmd(`cp ${SELECTED_TEMPLATE}/.prettierignore ${projectName}`);

  // replace metro config
  await cmd(`rm -rf ${projectName}/metro.config.js`);
  await cmd(`cp ${SELECTED_TEMPLATE}/metro.config.js ${projectName}`);

  // delete original App.tsx file
  await cmd(`rm -rf ${projectName}/App.tsx`);

  // copy gemfile.lock
  await cmd(`rm -rf ${projectName}/Gemfile.lock`);
  await cmd(`cp ${SELECTED_TEMPLATE}/Gemfile.lock ${projectName}`);

  // set up react-native-config
  await cmd(
    `echo "$(awk 'NR==2{print "apply from: project(\":react-native-config\").projectDir.getPath() + \"/dotenv.gradle\""}1' ${projectName}/android/app/build.gradle)" > ${projectName}/android/app/build.gradle`,
  );

  await cmd(`rm -rf ${TEMP_DIR}`);
  task.stop();
};

/**
 * Initializes the git repository for the project. It does the following:
 * 1. Deletes the git history from the template repo
 * 2. Re-initializes git for the project
 * 3. Makes an initial commit
 * 4. Renames the "master" branch to "main"
 * @param toolbox the toolbox object supplied by Gluegun
 */
export const initializeGit = async (toolbox: GluegunToolboxExtended) => {
  const { cmd, printTask } = interfaceHelpers(toolbox);
  const task = printTask('Setting up git...');
  await cmd(`rm -rf .git`);
  await cmd(`git init`);
  await cmd(`git add --all`);
  await cmd(`git commit -m "Initial commit ⚡️ Automated by Airfoil™"`);
  await cmd(`git branch -M main`); // rename 'master' branch as 'main'
  task.stop();
};

/**
 * Installs all dependencies for a project, including pods.
 * @param toolbox the toolbox object supplied by Gluegun
 */
export const installDependencies = async (toolbox: GluegunToolboxExtended) => {
  const { cmd, printTask } = interfaceHelpers(toolbox);
  const task = printTask('Installing dependencies and pods...');
  await cmd(`yarn install --ignore-scripts`);
  await cmd(`cd ios && pod install --repo-update && cd ..`);
  task.stop();
};

/**
 * Adds helpful meta-info about the project, updates package.json, and
 * prettifies the codebase
 * @param projectName the name of the project
 * @param toolbox the toolbox supplied by Gluegun
 */
export const initializeProjectInfo = async (
  projectName: string,
  toolbox: GluegunToolboxExtended,
) => {
  const { template } = toolbox;
  const { cmd, printTask } = interfaceHelpers(toolbox);
  const task = printTask('Generating Code of Conduct & README, and prettifying...');
  const editPkgJson = `npx json -I -f package.json -e`; // update package.json
  await cmd(`${editPkgJson} 'this.name="${decamelize(projectName, { separator: '-' })}"'`);
  await cmd(`${editPkgJson} 'this.version="${DEFAULT_PROJECT_VERSION}"'`);
  await cmd(`npx covgen ${AIRSHIP_EMAIL}`); // generate code of conduct
  await template.generate({
    template: 'README.md.ejs',
    target: 'README.md',
    props: { projectName },
  });
  await cmd(`npx prettier --ignore-path .gitignore --write \"app/**/*.+(tsx|jsx|ts|js)\"`);
  task.stop();
};

export const initializeReactNativeProject = async (
  projectName: string,
  toolbox: GluegunToolboxExtended,
) => {
  const { cmd, printTask } = interfaceHelpers(toolbox);
  const task = printTask('Initializing React Native project...');
  await cmd(`npx react-native init ${projectName} --version 0.68.0 --template react-native-template-typescript`);
  task.stop();
};
