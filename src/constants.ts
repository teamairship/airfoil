export enum TemplateType {
  blimp = 'blimp',
  jet = 'jet',
  propeller = 'propeller',
}

//------------------------
//------- GENERAL --------
//------------------------
export const REACT_NATIVE_INIT = 'npx react-native init';
export const AIRSHIP_EMAIL = 'builders@teamairship.com';
export const DEFAULT_PROJECT_VERSION = '0.0.1';

//------------------------
//------- CHOICES --------
//------------------------
export enum Choice {
  blimp = 'Blimp: React Context + REST',
  jet = 'Jet: GraphQL + Apollo State',
  propeller = 'Propeller: Redux + REST',
  yes = 'Yes',
  no = 'No',
}

//------------------------
//---- TEMPLATES ----
//------------------------
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

//------------------------
//------ QUESTIONS -------
//------------------------
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
