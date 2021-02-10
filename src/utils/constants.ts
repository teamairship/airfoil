export const projectNameQuestion = {
  type: 'input',
  name: 'name',
  message: 'What would you like to name the project? (Must be camel case): ',
};

export const projectTypeQuestion = {
  type: 'select',
  name: 'type',
  message: 'Which template would you like to use?',
  choices: [
    'Blimp: React Context + REST',
    'Propeller: Redux + REST',
    'Jet: GraphQL + Apollo State',
  ],
};
