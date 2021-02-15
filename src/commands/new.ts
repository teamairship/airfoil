import { GluegunCommand } from 'gluegun';
import { print } from 'gluegun/print';
import { Toolbox } from 'gluegun/build/types/domain/toolbox';
import { Options } from '../types';
import {
  questionProjectName,
  questionProjectDesc,
  questionProjectType,
  CHOICE_TEMPLATE_BLIMP,
  CHOICE_TEMPLATE_PROP,
  CHOICE_TEMPLATE_JET,
  AIRSHIP_EMAIL,
  REPO_URL_TEMPLATE_JET,
  DEFAULT_PROJECT_VERSION,
} from '../constants';
import { interfaceHelpers } from '../utils/interface';
import { validations } from '../utils/validations';

const decamelize = require('decamelize');

// see here for all possible colors: https://github.com/Marak/colors.js
const { cyan, red, yellow } = print.colors;

const command: GluegunCommand = {
  name: 'new',
  alias: 'n',
  run: async toolbox => {
    const { parameters, print, prompt } = toolbox;
    const { title, about, loadWhile } = interfaceHelpers(toolbox);
    const { validateProjectName, checkCocoaPodsInstalled } = validations(toolbox);

    title();
    about();

    await loadWhile(checkCocoaPodsInstalled());

    let projectName: string;
    let projectDesc: string;

    if (parameters.first) {
      projectName = parameters.first;
      if (parameters.second) print.info(yellow(`All args ignored except for ${cyan(projectName)}`));
    } else {
      const { name } = await prompt.ask([questionProjectName]);
      projectName = name;
    }

    validateProjectName(projectName);

    const { desc } = await prompt.ask([questionProjectDesc]);
    projectDesc = desc;

    const opts: Options = {
      projectName,
      projectDesc,
    };

    const { type } = await prompt.ask([questionProjectType]);

    switch (type) {
      case CHOICE_TEMPLATE_BLIMP:
        return createBlimpProject(toolbox, opts);

      case CHOICE_TEMPLATE_PROP:
        return print.info('Coming soon!');

      case CHOICE_TEMPLATE_JET:
        return createJetProject(toolbox, opts);

      default:
        return;
    }
  },
};

const createBlimpProject = async (toolbox: Toolbox, opts: Options) => {
  const { print, system } = toolbox;
  const { projectName } = opts;

  // Create React Native project
  const createSpinner = print.spin('Creating your React Native Project...');
  await system.run('git clone https://github.com/teamairship/airfoil-template-blimp.git');
  await system.run(`mv airfoil-template-blimp ${projectName}`);

  // TODO: update the following script to deeply rename the entire project (i.e.,
  // index.ios.js, android folder names, etc.). There's a tool called react-native-rename
  // that we could possibly use here.
  await system.run(`sed -i '' s/blimp/${projectName}/ ${projectName}/package.json`);
  createSpinner.stop();

  // Initialize git repository
  const gitSpinner = print.spin('Creating your React Native Project...');
  await system.run(`cd ${projectName}`);
  await system.run(`rm -rf .git`);
  await system.run(`git init && git checkout -b main`);
  await system.run(`git add . && git commit -m "initial commit"`);
  await system.run(`cd ../`);
  gitSpinner.stop();

  // Install Dependencies
  const installDependenciesSpinner = print.spin('Installing project dependencies');
  await system.run(`cd ${projectName} && yarn && cd ../`);
  installDependenciesSpinner.stop();

  // Install Pods
  const installPodsSpinner = print.spin('Installing pods...');
  await system.run(`cd ${projectName}/ios && pod install --repo-update && cd ../`);
  installPodsSpinner.stop();

  print.success(`${projectName} has been created!`);
};

const createJetProject = async (toolbox: Toolbox, opts: Options) => {
  const { print, filesystem, template } = toolbox;
  const { projectName, projectDesc } = opts;
  const { log, printTask, cmd, postInstallInstructions } = interfaceHelpers(toolbox);

  let task;

  task = printTask('🦾 Activating robot assemblers...');
  await cmd(`git clone ${REPO_URL_TEMPLATE_JET} ${projectName}`);
  task.stop();

  if (!filesystem.exists(`${projectName}/package.json`))
    throw new Error(`Something went wrong. ${projectName}/package.json file not found.`);

  log(`changing directory to \`${projectName}\``);
  process.chdir(projectName);

  task = printTask('💼 Supplying secret codenames...');
  await cmd(`npx react-native-rename ${projectName}`);
  task.stop();

  task = printTask('🪐 Folding dependencies into 4D space...');
  await cmd(`yarn install --ignore-scripts`);
  await cmd(`pod repo update`);
  await cmd(`cd ios && pod install && cd ..`);
  task.stop();

  task = printTask('🛠  Transmogrifying starship components...');
  // update package.json
  const editPkgJson = `npx json -I -f package.json -e`;
  await cmd(`${editPkgJson} 'this.name="${decamelize(projectName, { separator: '-' })}"'`);
  await cmd(`${editPkgJson} 'this.version="${DEFAULT_PROJECT_VERSION}"'`);
  if (projectDesc) await cmd(`${editPkgJson} 'this.description="${projectDesc}"'`);
  // generate code of conduct
  await cmd(`npx covgen ${AIRSHIP_EMAIL}`);
  // create README
  await template.generate({
    template: 'README.md.ejs',
    target: 'README.md',
    props: { projectName, projectDesc },
  });
  // apply prettier so that app is already formatted correctly
  await cmd(`npx prettier --ignore-path .gitignore --write \"app/**/*.+(tsx|jsx|ts|js)\"`);
  task.stop();

  task = printTask('🧠 Uploading consciousness to Git...');
  await cmd(`rm -rf .git`);
  await cmd(`git init`);
  await cmd(`git add --all`);
  await cmd(`git commit -m "Initial commit ⚡️ Automated by Airfoil™ 🚀"`);
  // rename 'master' branch as 'main'
  await cmd(`git branch -M main`);
  task.stop();

  print.success(`${red(projectName)} successfully Airfoil'ed. 🚀`);
  postInstallInstructions(projectName);
};

module.exports = command;
