export const REACT_NATIVE_INIT = 'npx react-native init';

export const AIRSHIP_EMAIL = 'builders@teamairship.com';
export const REPO_URL_TEMPLATE_JET = 'git@github.com:teamairship/airfoil-template-jet.git';
export const DEFAULT_PROJECT_VERSION = '0.0.1';

export const questionProjectName = {
  type: 'input',
  name: 'name',
  message: 'What would you like to name the project? (Must be camel case): ',
};

export const questionProjectDesc = {
  type: 'input',
  name: 'desc',
  message: 'Describe your project in one sentence (Optional):',
};

export const CHOICE_TEMPLATE_BLIMP = 'Blimp: React Context + REST';
export const CHOICE_TEMPLATE_PROP = 'Propeller: Redux + REST';
export const CHOICE_TEMPLATE_JET = 'Jet: GraphQL + Apollo State';

export const questionProjectType = {
  type: 'select',
  name: 'type',
  message: 'Which template would you like to use?',
  choices: [CHOICE_TEMPLATE_BLIMP, CHOICE_TEMPLATE_PROP, CHOICE_TEMPLATE_JET],
};

export const CHOICE_YES = 'Yes';
export const CHOICE_NO = 'No';
