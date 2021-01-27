export const REACT_NATIVE_INIT = 'npx react-native init';
export const TEMPLATE = '--template react-native-template-typescript';

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

export const projectNameQuestion = {
  type: 'input',
  name: 'name',
  message: 'What would you like to name the project? (Must be camel case): ',
};

export const TEMPLATE_CHOICE_BLIMP = 'Blimp: React Context + REST';
export const TEMPLATE_CHOICE_PROP = 'Propeller: Redux + REST';
export const TEMPLATE_CHOICE_JET = 'Jet: GraphQL + Apollo State';

export const projectTypeQuestion = {
  type: 'select',
  name: 'type',
  message: 'Which template would you like to use?',
  choices: [TEMPLATE_CHOICE_BLIMP, TEMPLATE_CHOICE_PROP, TEMPLATE_CHOICE_JET],
};
