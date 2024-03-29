import { GluegunCommand } from 'gluegun';
import { print } from 'gluegun/print';
import { Choice, questionProjectName, questionProjectType, Template } from '../constants';
import { GluegunToolboxExtended } from '../extensions/extensions';
import { HELP_DESCRIPTION_CMD_INIT } from '../help-descriptions/cmd-init';
import { checkCommandHelp } from '../scripts/help';
import {
  copyFilesFromTemplateRepo,
  initializeGit,
  initializeProjectInfo,
  initializeReactNativeProject,
  installDependencies,
} from '../scripts/projectCreation';
import { interfaceHelpers } from '../utils/interface';
import { validations } from '../utils/validations';

// see here for all possible colors: https://github.com/Marak/colors.js
const { cyan, red, yellow } = print.colors;

const templateAssociations: { [key: string]: Template } = {
  [Choice.blimp]: Template.blimp,
  [Choice.jet]: Template.jet,
};

const command: GluegunCommand = {
  name: 'init',
  alias: ['i', 'new'],
  description: HELP_DESCRIPTION_CMD_INIT,
  run: async (toolbox: GluegunToolboxExtended) => {
    checkCommandHelp(toolbox);
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

    await createProject(projectName, templateAssociations[type], toolbox);
  },
};

const createProject = async (
  projectName: string,
  template: Template,
  toolbox: GluegunToolboxExtended,
) => {
  const { print, filesystem } = toolbox;
  const { log, postInstallInstructions } = interfaceHelpers(toolbox);

  await initializeReactNativeProject(projectName, toolbox);

  if (!filesystem.exists(`${projectName}/package.json`)) {
    throw new Error(`Something went wrong. ${projectName}/package.json file not found.`);
  }

  await copyFilesFromTemplateRepo(projectName, template, toolbox);

  log(`changing directory to \`${projectName}\``);
  process.chdir(projectName);

  await installDependencies(toolbox);
  await initializeProjectInfo(projectName, toolbox);
  await initializeGit(toolbox);

  print.success(`${red(projectName)} successfully created. You're ready for takeoff. ✈️`);
  postInstallInstructions(projectName);
};

module.exports = command;
