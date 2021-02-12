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
  REACT_NATIVE_INIT,
  AIRSHIP_EMAIL,
} from '../constants';

// see: https://stackoverflow.com/questions/36592157/typescript-can-i-mix-using-import-from-and-require
import ora = require('ora');

// see here for all possible colors: https://github.com/Marak/colors.js
const { cyan, gray, red, yellow } = print.colors;

const command: GluegunCommand = {
  name: 'new',
  alias: 'n',
  run: async toolbox => {
    const { parameters, print, prompt, filesystem } = toolbox;

    print.info('');
    print.info(red(' █████  ██ ██████  ███████  ██████  ██ ██      '));
    print.info(red('██   ██ ██ ██   ██ ██      ██    ██ ██ ██      '));
    print.info(red('███████ ██ ██████  █████   ██    ██ ██ ██      '));
    print.info(red('██   ██ ██ ██   ██ ██      ██    ██ ██ ██      '));
    print.info(red('██   ██ ██ ██   ██ ██       ██████  ██ ███████ '));
    print.info('');

    const debug = Boolean(parameters.options.debug);
    const log = (m: string): string => {
      if (debug) print.info(gray(m));
      return m;
    };

    let projectName: string;
    let projectDesc: string;

    if (parameters.first) {
      projectName = parameters.first;
      if (parameters.second) print.info(yellow(`All args ignored except for ${cyan(projectName)}`));
    } else {
      const { name } = await prompt.ask([questionProjectName]);
      projectName = name;
    }

    const { desc } = await prompt.ask([questionProjectDesc]);
    projectDesc = desc;

    if (filesystem.exists(projectName)) {
      print.error(`${filesystem.cwd()}${filesystem.separator}${projectName} already exists!`);
      process.exit(1);
    }

    const opts: Options = {
      projectName,
      projectDesc,
      debug,
      log,
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

const createJetProject = async (toolbox: Toolbox, opts: Options) => {
  const { print, system, meta, filesystem, template } = toolbox;
  const { projectName, projectDesc, debug, log } = opts;
  const { path } = filesystem;
  const templateJetPath = path(`${meta.src}`, 'boilerplate/react-native-template-jet');

  if (!filesystem.exists(templateJetPath))
    throw new Error(`Jet template not found: ${templateJetPath}`);

  let task: ora.Ora;

  task = print.spin('🦾 Activating robot assemblers...');
  const verbose = debug ? ' --verbose' : '';
  const cmdInit = `${REACT_NATIVE_INIT} ${projectName} --template file://${templateJetPath} ${verbose}`;
  await system.run(log(cmdInit));
  task.stop();

  if (!filesystem.exists(`${projectName}/package.json`))
    throw new Error(`Something went wrong. Try running command manually:\n\t${cmdInit}`);

  log(`changing directory to \`${projectName}\``);
  process.chdir(projectName);

  task = print.spin('🪐 Folding dependencies into multidimensional space...');
  await system.run(log(`yarn install`));
  task.stop();

  task = print.spin('⚡️ Transmogrifying starship configurations...');
  // update package.json
  const cmd = `npx json -I -f package.json -e`;
  if (projectName) await system.run(log(`${cmd} 'this.name="${projectName}"'`));
  if (projectDesc) await system.run(log(`${cmd} 'this.description="${projectDesc}"'`));
  // generate code of conduct
  await system.run(log(`npx covgen ${AIRSHIP_EMAIL}`));
  // create README
  await template.generate({
    template: 'README.md.ejs',
    target: 'README.md',
    props: { projectName, projectDesc },
  });
  // apply prettier so that app is already formatted correctly
  await system.run(
    log(`npx prettier --ignore-path .gitignore --write \"app/**/*.+(tsx|jsx|ts|js)\"`),
  );
  task.stop();

  task = print.spin('🧠 Uploading consciousness to Git...');
  await system.run(log(`git init`));
  await system.run(log(`git add --all`));
  await system.run(log(`git commit -m "Initial commit ⚡️ Automated by Airfoil™ 🚀"`));
  // rename 'master' branch as 'main'
  await system.run(log(`git branch -M main`));
  task.stop();

  print.success(`${red(projectName)} successfully Airfoil'ed. 🚀`);
};

module.exports = command;
