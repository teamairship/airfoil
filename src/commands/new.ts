import { GluegunCommand } from 'gluegun';
import { Toolbox } from 'gluegun/build/types/domain/toolbox';
import { Options } from '../types';
import {
  REACT_NATIVE_INIT,
  TEMPLATE,
  blimpDependencies,
  questionProjectName,
  questionProjectType,
  CHOICE_TEMPLATE_BLIMP,
  CHOICE_TEMPLATE_PROP,
  CHOICE_TEMPLATE_JET,
  questionBuildDirectoryStructure,
  CHOICE_YES,
} from '../utils/constants';
import { buildProjectDirectoryStructure } from '../utils/filesystemGenerators';

const command: GluegunCommand = {
  name: 'new',
  alias: 'n',
  run: async toolbox => {
    const { parameters, print, prompt, filesystem } = toolbox;

    let projectName: string;

    if (parameters.first) {
      projectName = parameters.first;
    } else {
      const { name } = await prompt.ask([questionProjectName]);
      projectName = name;
    }

    if (filesystem.exists(projectName)) {
      print.error(`${filesystem.cwd()}${filesystem.separator}${projectName} already exists!`);
      process.exit(1);
    }

    const { type } = await prompt.ask([questionProjectType]);

    const { buildDirectoryStructure } = await prompt.ask([questionBuildDirectoryStructure]);
    const shouldBuildDirectoryStructure = buildDirectoryStructure === CHOICE_YES;

    const opts: Options = {
      shouldBuildDirectoryStructure,
    };

    switch (type) {
      case CHOICE_TEMPLATE_BLIMP:
        return createBlimpProject(toolbox, projectName, opts);

      case CHOICE_TEMPLATE_PROP:
        return print.info('Coming soon!');

      case CHOICE_TEMPLATE_JET:
        return print.info('Coming soon!');

      default:
        throw new Error('Project type not recognized');
    }
  },
};

const createBlimpProject = async (toolbox: Toolbox, projectName: string, opts: Options) => {
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

  // Build directory structure
  if (opts.shouldBuildDirectoryStructure) {
    const createSpinner = print.spin('Generating directory structure...');
    buildProjectDirectoryStructure({
      toolbox,
      projectName,
      appRootPath: 'app',
      subDirectories: [
        'assets',
        'components',
        'context',
        'hooks',
        'navigation',
        'screens',
        'services',
        'styles',
        'utils',
      ],
    });
    createSpinner.stop();
  }

  print.success(`${projectName} has been created!`);
};

module.exports = command;
