export type RepoLocation =
  | 'git@github.com:teamairship/airfoil-template-blimp.git'
  | 'git@github.com:teamairship/airfoil-template-jet.git'
  | 'git@github.com:teamairship/airfoil-template-propeller.git';

//------------------------
//------- GENERAL --------
//------------------------
export const REACT_NATIVE_INIT = 'npx react-native init';
export const AIRSHIP_EMAIL = 'builders@teamairship.com';
export const DEFAULT_PROJECT_VERSION = '0.0.1';

//------------------------
//------- CHOICES --------
//------------------------
export const CHOICE_TEMPLATE_BLIMP = 'Blimp: React Context + REST';
export const CHOICE_TEMPLATE_PROPELLER = 'Propeller: Redux + REST';
export const CHOICE_TEMPLATE_JET = 'Jet: GraphQL + Apollo State';
export const CHOICE_YES = 'Yes';
export const CHOICE_NO = 'No';

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
  choices: [CHOICE_TEMPLATE_BLIMP, CHOICE_TEMPLATE_PROPELLER, CHOICE_TEMPLATE_JET],
};

//------------------------
//---- REPO LOCATIONS ----
//------------------------
export const REPO_URL_TEMPLATE_BLIMP: RepoLocation =
  'git@github.com:teamairship/airfoil-template-blimp.git';
export const REPO_URL_TEMPLATE_JET: RepoLocation =
  'git@github.com:teamairship/airfoil-template-jet.git';
export const REPO_URL_TEMPLATE_PROPELLER: RepoLocation =
  'git@github.com:teamairship/airfoil-template-propeller.git';
