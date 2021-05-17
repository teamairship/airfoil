export enum TemplateType {
  blimp = 'blimp',
  jet = 'jet',
  propeller = 'propeller',
}

// ------------------------
// ------- GENERAL --------
// ------------------------
export const REACT_NATIVE_INIT = 'npx react-native init';
export const AIRSHIP_EMAIL = 'builders@teamairship.com';
export const DEFAULT_PROJECT_VERSION = '0.0.1';

// ------------------------
// ------- CHOICES --------
// ------------------------
export enum Choice {
  blimp = 'Blimp: React Context + REST',
  jet = 'Jet: GraphQL + Apollo State',
  propeller = 'Propeller: Redux + REST',
  yes = 'Yes',
  no = 'No',
}

// ------------------------
// ---- TEMPLATES ----
// ------------------------
export const TEMPLATES_REPO_URL = 'git@github.com:teamairship/airfoil-schematics.git';

export enum Template {
  blimp = 'blimp',
  jet = 'jet',
  propeller = 'propeller',
}

export enum FileCategory {
  component = 'Component',
  hook = 'Hook',
}

// ------------------------
// ------ QUESTIONS -------
// ------------------------
export const questionProjectName = {
  type: 'input',
  name: 'name',
  message: 'What would you like to name the project? (Must be camel case): ',
};

export const questionProjectType = {
  type: 'select',
  name: 'type',
  message: 'Which template would you like to use?',
  choices: [Choice.blimp, Choice.propeller, Choice.jet],
};

export const questionFileCategory = (informBadInput: boolean) => ({
  type: 'select',
  name: 'category',
  message: `${
    informBadInput ? "Unfortunately that's an invalid option. " : ''
  }What would you like to create?`,
  choices: Object.values(FileCategory),
});

export const questionFileName = {
  type: 'input',
  name: 'name',
  message: 'What would you like to name your file?',
};

export const questionTakenFileName = {
  type: 'input',
  name: 'name',
  message:
    "Looks like there's already a file with that name. What would you like to name your file?",
};

// ------------------------
// ----- DESCRIPTIONS -----
// ------------------------
export const ADD_DESCRIPTION =
  '\nairfoil add [env | appcenter | adr | keystore]\n\nUsage:\n\nairfoil add env # if args omitted -> prompts to get ENV key, value\nairfoil add env MY_VAR=mydatahere\nairfoil add appcenter # follow prompts\nairfoil add adr # follow prompts\nairfoil add adr "Choose Cognito for Auth" # specify ADR title as arg1\nairfoil add keystore\n\nFor more information, visit the official documentation:\nhttps://airfoil-docs.herokuapp.com/commands/add';

export const CONVERT_DESCRIPTION =
  '\nairfoil convert [svg]\n\nUsage:\n\nairfoil convert svg\nairfoil convert svg --cleanup # to remove app/assets/svg after successful conversion\n\nConverts .svg files to .tsx files for use in React Native. For more information, visit the official documentation:\nhttps://airfoil-docs.herokuapp.com/commands/convert';

export const CREATE_DESCRIPTION =
  '\nairfoil [create | c]\n\nUsage:\n\nairfoil create # guides you through a quick wizard\nairfoil create component [ComponentName] [-f folderName]\nairfoil create hook [useHookName] [-f folderName]\n\nCreates a file and places it in the correct directory. Currently supported options:\n- component\n- hook. For more information, visit the official documentation:\nhttps://airfoil-docs.herokuapp.com/commands/create';

export const INIT_DESCRIPTION =
  '\nairfoil [init | i | new] [nameOfProject]\n\nUsage:\n\nairfoil init myAwesomeApp\nairfoil init # prompts you for the <appName>\n\nInitializes a new React Native project. For more information, visit the official documentation:\nhttps://airfoil-docs.herokuapp.com/commands/init';

export const VERSION_DESCRIPTION =
  '\nairfoil version [major | minor | patch]\n\nUsage:\n\nairfoil version patch # patch release (0.0.1 -> 0.0.2)\nairfoil version minor # minor release (0.0.2 -> 0.1.0)\nairfoil version major # major release (0.1.0 -> 1.0.0)\nairfoil version -u 4.5.6 # update exact version\n\nUpdates the version in package.json as well as ios/ and android/ directories. For more information, visit the official documentation:\nhttps://airfoil-docs.herokuapp.com/commands/version';
