import { GluegunCommand } from 'gluegun';
import { print } from 'gluegun/print';
import { Toolbox } from 'gluegun/build/types/domain/toolbox';
import {
  CHOICE_TEMPLATE_BLIMP,
  CHOICE_TEMPLATE_JET,
  CHOICE_TEMPLATE_PROPELLER,
  questionProjectName,
  questionProjectType,
  REPO_URL_TEMPLATE_BLIMP,
  REPO_URL_TEMPLATE_JET,
  REPO_URL_TEMPLATE_PROPELLER,
  RepoLocation,
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

const templateAssociations = {
  [CHOICE_TEMPLATE_BLIMP]: REPO_URL_TEMPLATE_BLIMP,
  [CHOICE_TEMPLATE_JET]: REPO_URL_TEMPLATE_JET,
  [CHOICE_TEMPLATE_PROPELLER]: REPO_URL_TEMPLATE_PROPELLER,
};

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

const createProject = async (projectName: string, template: RepoLocation, toolbox: Toolbox) => {
  const { print, filesystem } = toolbox;
  const { log, postInstallInstructions } = interfaceHelpers(toolbox);

  // TODO: remove this whe "Propeller" is ready
  if (template === REPO_URL_TEMPLATE_PROPELLER) return print.info('Coming soon!');

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
