export const REACT_NATIVE_INIT = 'npx react-native init';
export const REACT_NATIVE_TEMPLATE = '--template react-native-template-typescript';

export const APP_ROOT_PATH = 'app';

export const blimpDependencies: string[] = [
  '@react-native-community/masked-view',
  '@react-navigation/native',
  'axios',
  'camelcase-keys-deep',
  'decamelize-keys-deep',
  'react-native-config',
  'react-native-gesture-handler',
  'react-native-reanimated',
  'react-native-safe-area-context',
  'react-native-screens',
];

export const questionProjectName = {
  type: 'input',
  name: 'name',
  message: 'What would you like to name the project? (Must be camel case): ',
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

export const questionBuildDirectoryStructure = {
  type: 'select',
  name: 'buildDirectoryStructure',
  message: 'Auto-generate Airship-recommended React Native directory structure?',
  choices: [CHOICE_YES, CHOICE_NO],
};
