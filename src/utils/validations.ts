import { Toolbox } from 'gluegun/build/types/domain/toolbox';

const camelCase = require('camelcase');

/**
 * CLI Validations
 * @param toolbox
 */
export const validations = (toolbox: Toolbox) => {
  const { print, filesystem, system, commandName } = toolbox;
  const { cyan, gray } = print.colors;

  const validateProjectName = (projectName: string) => {
    if (!projectName) {
      print.error(`Project name is required.`);
      process.exit(1);
    }

    if (filesystem.exists(projectName)) {
      print.error(`${filesystem.cwd()}${filesystem.separator}${projectName} already exists!`);
      process.exit(1);
    }

    if (camelCase(projectName) !== projectName) {
      print.error(`Project name must be camelCase. Try: ${cyan(camelCase(projectName))}`);
      process.exit(1);
    }
  };

  const checkCocoaPodsInstalled = async () => {
    // prettier-ignore
    try {
      await system.run('pod --version');
    } catch (err) {
      print.error(`You must have cocoapods installed to use Airfoil.`);
      print.info(gray(`Install cocoapods via HomeBrew - ${cyan('https://formulae.brew.sh/formula/cocoapods')}`));
      print.info(gray(`Install cocoapods via Ruby gem - ${cyan('https://guides.cocoapods.org/using/getting-started.html')}`));
      process.exit(1);
    }
  };

  /**
   * Assert CWD is the root of a ReactNative project.
   */
  const checkCurrentDirReactNativeProject = async () => {
    try {
      // ensure presence of following files to prove that CWD is indeed a ReactNative project root
      await system.run('cat package.json');
      await system.run('cat app.json');
      await system.run('cat ios/Podfile');
      await system.run('cat android/build.gradle');
    } catch (err) {
      print.info(gray(err.message));
      print.error(`\`airfoil ${commandName}\` was not initiated from a ReactNative project root!`);
      print.info(gray('Change directory to a ReactNative project root and try again.'));
      process.exit(1);
    }
  };

  return {
    validateProjectName,
    checkCocoaPodsInstalled,
    checkCurrentDirReactNativeProject,
  };
};
