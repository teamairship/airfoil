import { GluegunToolboxExtended } from '../extensions/extensions';
import {
  AIRSHIP_EMAIL,
  DEFAULT_PROJECT_VERSION,
  TEMPLATES_REPO_URL,
  TemplateType,
} from '../constants';
import { interfaceHelpers } from '../utils/interface';
const decamelize = require('decamelize');

/**
 * Clones the template from the repository on Airship's GitHub profile
 * @param template which template to install
 * @param projectName name of the project
 * @param toolbox Gluegun-supplied toolbox
 */
export const cloneTemplateRepo = async (
  projectName: string,
  template: TemplateType,
  toolbox: GluegunToolboxExtended,
) => {
  const { cmd, printTask } = interfaceHelpers(toolbox);
  const task = printTask('☀️  Opening hangar door...');
  const TEMP_DIR = `_AIRFOIL_TEMP_${projectName}`;
  await cmd(`git clone ${TEMPLATES_REPO_URL} ${TEMP_DIR}`);
  await cmd(`mkdir ${projectName}`);
  await cmd(`cp -r ${TEMP_DIR}/templates/${template}/. ${projectName}`);
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
  const task = printTask('🗺️  Creating flight plan and logging point of origin...');
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
  const task = printTask('🔧 Checking oil levels and fueling up...');
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
  const task = printTask('🎛️  Setting altimeter and idling engine...');
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

/**
 * This project deeply renames the react native project using the project name
 * supplied by the user. Since we use cloned repos to create our projects, this
 * ensures that all the correct names are supplied throughout the codebase (e.g.,
 * ./ios/[APP_NAME].xcodeproj, android app folder names, etc.)
 * @param projectName The name of the project
 */
export const renameReactNativeProject = async (
  projectName: string,
  toolbox: GluegunToolboxExtended,
) => {
  const { cmd, printTask } = interfaceHelpers(toolbox);
  const task = printTask('🎙  Registering call sign...');
  await cmd(`npx react-native-rename ${projectName}`);
  task.stop();
};
