import { GluegunCommand } from 'gluegun';
import { Toolbox } from 'gluegun/build/types/domain/toolbox';
import {
  REACT_NATIVE_INIT,
  TEMPLATE,
  blimpDependencies,
  projectNameQuestion,
  projectTypeQuestion,
  TEMPLATE_CHOICE_BLIMP,
  TEMPLATE_CHOICE_PROP,
  TEMPLATE_CHOICE_JET,
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
      case TEMPLATE_CHOICE_BLIMP:
        return createBlimpProject(toolbox, projectName);

      case TEMPLATE_CHOICE_PROP:
        return print.info('Coming soon!');

      case TEMPLATE_CHOICE_JET:
        return print.info('Coming soon!');

      default:
        throw new Error('Project type not recognized');
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
