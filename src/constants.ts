export enum TemplateType {
  blimp = 'blimp',
  jet = 'jet',
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
  choices: [Choice.blimp, Choice.jet],
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

export const DOCS_URL = 'https://airfoil.teamairship.com';

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
