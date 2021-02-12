type Template = 'airfoil-template-blimp' | 'airfoil-template-propeller' | 'airfoil-template-jet';

export type Options = {
  projectName: string;
  projectDesc: string;
  debug: boolean;
  log: (m: string) => string;
};
