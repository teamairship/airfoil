import { GluegunCommand } from 'gluegun';
import { Toolbox } from 'gluegun/build/types/domain/toolbox';
import { projectNameQuestion, projectTypeQuestion } from '../utils/constants';

const command: GluegunCommand = {
  name: 'new',
  alias: 'n',
  run: async toolbox => {
    const { parameters, print, prompt } = toolbox;

    let projectName: string;

    if (parameters.first) {
      projectName = parameters.first;
    } else {
      const { name } = await prompt.ask([projectNameQuestion]);
      projectName = name;
    }

    const { type } = await prompt.ask([projectTypeQuestion]);

    switch (type) {
      case 'Blimp: React Context + REST':
        return createBlimpProject(toolbox, projectName);

      case 'Propeller: Redux + REST':
        return print.info('Coming soon!');

      case 'Jet: GraphQL + Apollo State':
        return print.info('Coming soon!');

      default:
        return;
    }
  },
};

const createBlimpProject = async (toolbox: Toolbox, projectName: string) => {
  const { print, system } = toolbox;

  // Create React Native project
  const createSpinner = print.spin('Creating your React Native Project...');
  await system.run('git clone git@github.com:teamairship/airfoil-template-blimp.git');
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
  await system.run(`cd ${projectName}/ios && pod install && cd ../`);
  installPodsSpinner.stop();

  print.success(`${projectName} has been created!`);
};

module.exports = command;
