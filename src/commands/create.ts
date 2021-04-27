import { GluegunCommand } from 'gluegun';
import { GluegunToolboxExtended } from '../extensions/extensions';
import {
  FileCategory,
  questionFileCategory,
  questionFileName,
  questionTakenFileName,
} from '../constants';
import { interfaceHelpers } from '../utils/interface';
import { validations } from '../utils/validations';

function getDirectoryName(
  fileCategory: FileCategory,
  fileName: string,
  folderName?: string,
): string {
  const APP_DIRECTORY = 'app/';
  const folder = `${fileCategory.toLowerCase()}s/`;
  let subFolder = '';

  if (fileCategory === FileCategory.component) {
    subFolder = folderName ? `${folderName}/` : 'common/';
  } else {
    subFolder = folderName ? `${folderName}/` : '';
  }

  return `${APP_DIRECTORY}${folder}${subFolder}${fileName}.tsx`;
}

const command: GluegunCommand = {
  name: 'create',
  alias: ['c', 'generate', 'g'],
  run: async (toolbox: GluegunToolboxExtended) => {
    const { filesystem, parameters, prompt, print } = toolbox;
    const { loadWhile } = interfaceHelpers(toolbox);
    const { checkCurrentDirReactNativeProject } = validations(toolbox);

    await loadWhile(checkCurrentDirReactNativeProject());

    const userCategoryInput = parameters.first ? parameters.first.toLowerCase() : '';
    let fileCategory: FileCategory | undefined = userCategoryInput
      ? FileCategory[userCategoryInput]
      : undefined;
    let fileName = parameters.second ? parameters.second : '';
    let fileNameFinalized = false;
    let folderName = parameters.options['f'];
    let directoryName = '';

    if (!fileCategory) {
      const informBadInput = userCategoryInput && !fileCategory;
      const { category } = await prompt.ask([questionFileCategory(informBadInput)]);
      // @ts-ignore
      fileCategory = FileCategory[category.toLowerCase()];
    }

    if (!fileName) {
      const { name } = await prompt.ask([questionFileName]);
      fileName = name;
    }

    directoryName = getDirectoryName(fileCategory, fileName, folderName);

    if (!filesystem.exists(directoryName)) fileNameFinalized = true;

    while (!fileNameFinalized) {
      const { name } = await prompt.ask([questionTakenFileName]);
      print.info(`answer => ${name}`);
      fileName = name;
      if (!filesystem.exists(getDirectoryName(fileCategory, name, folderName))) {
        directoryName = getDirectoryName(fileCategory, name, folderName);
        fileNameFinalized = true;
      }
    }

    // TODO: add filename checking to make sure files are named correctly. For example, components
    // should be named starting with a capital letter, and custom hook names should always start
    // with "use".

    await toolbox.template.generate({
      template: `fileCreation/${fileCategory}.ejs`,
      target: directoryName,
      props: { fileName },
    });

    print.success(`${fileCategory} successfully created in ${directoryName}`);
  },
};

module.exports = command;
