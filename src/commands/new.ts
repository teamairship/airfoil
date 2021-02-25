import { GluegunCommand } from 'gluegun';
import { print } from 'gluegun/print';

import { GluegunToolboxExtended } from '../extensions/extensions';
import {
  CHOICE_TEMPLATE_BLIMP,
  CHOICE_TEMPLATE_JET,
  CHOICE_TEMPLATE_PROPELLER,
  questionProjectName,
  questionProjectType,
  TemplateType,
  TEMPLATE_TYPE_BLIMP,
  TEMPLATE_TYPE_JET,
  TEMPLATE_TYPE_PROPELLER,
} from '../constants';
import {
  cloneTemplateRepo,
  initializeGit,
  initializeProjectInfo,
  installDependencies,
  renameReactNativeProject,
} from '../scripts/projectCreation';
import { interfaceHelpers } from '../utils/interface';
import { validations } from '../utils/validations';

// see here for all possible colors: https://github.com/Marak/colors.js
const { cyan, red, yellow } = print.colors;

const templateAssociations: { [key: string]: TemplateType } = {
  [CHOICE_TEMPLATE_BLIMP]: TEMPLATE_TYPE_BLIMP,
  [CHOICE_TEMPLATE_JET]: TEMPLATE_TYPE_JET,
  [CHOICE_TEMPLATE_PROPELLER]: TEMPLATE_TYPE_PROPELLER,
};

const command: GluegunCommand = {
  name: 'new',
  alias: ['n', 'init'],
  run: async (toolbox: GluegunToolboxExtended) => {
    const { parameters, print, prompt } = toolbox;
    const { title, about, loadWhile } = interfaceHelpers(toolbox);
    const { validateProjectName, checkCocoaPodsInstalled } = validations(toolbox);

    title();
    about();

    await loadWhile(checkCocoaPodsInstalled());

    let projectName: string;

    if (parameters.first) {
      projectName = parameters.first;
      if (parameters.second) print.info(yellow(`All args ignored except for ${cyan(projectName)}`));
    } else {
      const { name } = await prompt.ask([questionProjectName]);
      projectName = name;
    }

    validateProjectName(projectName);

    const { type } = await prompt.ask([questionProjectType]);

    createProject(projectName, templateAssociations[type], toolbox);
  },
};

const createProject = async (
  projectName: string,
  template: TemplateType,
  toolbox: GluegunToolboxExtended,
) => {
  const { print, filesystem } = toolbox;
  const { log, postInstallInstructions } = interfaceHelpers(toolbox);

  // TODO: remove this when "Propeller" is ready
  if (template === TEMPLATE_TYPE_PROPELLER) return print.info('Coming soon!');

  await cloneTemplateRepo(projectName, template, toolbox);

  if (!filesystem.exists(`${projectName}/package.json`))
    throw new Error(`Something went wrong. ${projectName}/package.json file not found.`);

  log(`changing directory to \`${projectName}\``);
  process.chdir(projectName);

  await renameReactNativeProject(projectName, toolbox);
  await installDependencies(toolbox);
  await initializeProjectInfo(projectName, toolbox);
  await initializeGit(toolbox);

  print.success(`${red(projectName)} successfully created. You're ready for takeoff. ✈️`);
  postInstallInstructions(projectName);
};

module.exports = command;
