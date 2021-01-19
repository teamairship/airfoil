import { GluegunCommand } from 'gluegun';
import { Toolbox } from 'gluegun/build/types/domain/toolbox';
import {
  REACT_NATIVE_INIT,
  TEMPLATE,
  blimpDependencies,
  projectNameQuestion,
  projectTypeQuestion,
} from '../utils/constants';

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
  const dependencies = blimpDependencies.reduce((acc, item) => `${acc} ${item}`);

  // Create React Native project
  const createSpinner = print.spin('Creating your React Native Project...');
  await system.run(`${REACT_NATIVE_INIT} ${projectName} ${TEMPLATE}`);
  createSpinner.stop();

  // Install Dependencies
  const installDependenciesSpinner = print.spin('Installing project dependencies');
  await system.run(`cd ${projectName} && yarn add ${dependencies} && cd ../`);
  installDependenciesSpinner.stop();

  // Install Pods
  const installPodsSpinner = print.spin('Installing pods...');
  await system.run(`cd ${projectName}/ios && pod install && cd ../`);
  installPodsSpinner.stop();

  print.success(`${projectName} has been created!`);
};

module.exports = command;
