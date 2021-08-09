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
export const HELP_DESCRIPTION_CMD_ADD =
  '\nairfoil add [env | appcenter | adr | keystore]\n\nUsage:\n\nairfoil add env # if args omitted -> prompts to get ENV key, value\nairfoil add env MY_VAR=mydatahere\nairfoil add appcenter # follow prompts\nairfoil add adr # follow prompts\nairfoil add adr "Choose Cognito for Auth" # specify ADR title as arg1\nairfoil add keystore\n\nFor more information, visit the official documentation:\nhttps://airfoil-docs.herokuapp.com/commands/add';

export const HELP_DESCRIPTION_CMD_CONVERT =
  '\nairfoil convert [svg]\n\nUsage:\n\nairfoil convert svg\nairfoil convert svg --cleanup # to remove app/assets/svg after successful conversion\n\nConverts .svg files to .tsx files for use in React Native. For more information, visit the official documentation:\nhttps://airfoil-docs.herokuapp.com/commands/convert';

export const HELP_DESCRIPTION_CMD_CREATE =
  '\nairfoil [create | c]\n\nUsage:\n\nairfoil create # guides you through a quick wizard\nairfoil create component [ComponentName] [-f folderName]\nairfoil create hook [useHookName] [-f folderName]\n\nCreates a file and places it in the correct directory. Currently supported options:\n- component\n- hook. For more information, visit the official documentation:\nhttps://airfoil-docs.herokuapp.com/commands/create';

export const HELP_DESCRIPTION_CMD_INIT =
  '\nairfoil [init | i | new] [nameOfProject]\n\nUsage:\n\nairfoil init myAwesomeApp\nairfoil init # prompts you for the <appName>\n\nInitializes a new React Native project. For more information, visit the official documentation:\nhttps://airfoil-docs.herokuapp.com/commands/init';

export const HELP_DESCRIPTION_CMD_VERSION =
  '\nairfoil version [major | minor | patch]\n\nUsage:\n\nairfoil version patch # patch release (0.0.1 -> 0.0.2)\nairfoil version minor # minor release (0.0.2 -> 0.1.0)\nairfoil version major # major release (0.1.0 -> 1.0.0)\nairfoil version -u 4.5.6 # update exact version\n\nUpdates the version in package.json as well as ios/ and android/ directories. For more information, visit the official documentation:\nhttps://airfoil-docs.herokuapp.com/commands/version';

// --------------------------
// ----- APP ICON SIZES -----
// --------------------------
type AppIconConfig = {
  filename: string;
  width: number;
  height: number;
  rounded?: boolean;
  circle?: boolean;
};
type AppIconAndroidFlavors = Omit<AppIconConfig, 'width' | 'height'>[];
type AppIconSettings = {
  ios: {
    iconFolderPath: string;
    iconsetContentsPath: string;
    icons: AppIconConfig[];
  };
  android: {
    iconFolderPath: string;
    icons: AppIconConfig[];
    iconFlavors?: AppIconAndroidFlavors;
  };
};
export const APP_ICON_SETTINGS: AppIconSettings = {
  android: {
    iconFolderPath: 'android/app/src/main/res',
    iconFlavors: [
      { filename: 'ic_launcher.png', rounded: true },
      { filename: 'ic_launcher_round.png', circle: true },
    ],
    icons: [
      { filename: 'mipmap-hdpi', width: 72, height: 72 },
      { filename: 'mipmap-mdpi', width: 48, height: 48 },
      { filename: 'mipmap-xhdpi', width: 96, height: 96 },
      { filename: 'mipmap-xxhdpi', width: 144, height: 144 },
      { filename: 'mipmap-xxxhdpi', width: 192, height: 192 },
    ],
  },
  ios: {
    iconFolderPath: 'ios/__PROJECT_NAME__/Images.xcassets/AppIcon.appiconset',
    iconsetContentsPath: 'ios/__PROJECT_NAME__/Images.xcassets/AppIcon.appiconset/Contents.json',
    icons: [
      { filename: 'Icon-App-20x20@2x.png', width: 40, height: 40 },
      { filename: 'Icon-App-20x20@3x.png', width: 60, height: 60 },
      { filename: 'Icon-App-29x29@2x.png', width: 58, height: 58 },
      { filename: 'Icon-App-29x29@3x.png', width: 87, height: 87 },
      { filename: 'Icon-App-40x40@2x.png', width: 80, height: 80 },
      { filename: 'Icon-App-40x40@3x.png', width: 120, height: 120 },
      { filename: 'Icon-App-60x60@2x.png', width: 120, height: 120 },
      { filename: 'Icon-App-60x60@3x.png', width: 180, height: 180 },
      { filename: 'ItunesArtwork@2x.png', width: 1024, height: 1024 },
    ],
  },
};
