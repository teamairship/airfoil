import { GluegunCommand } from 'gluegun';
import { GluegunToolboxExtended } from '../extensions/extensions';
import { FileCategory, questionFileCategory, questionFileName } from '../constants';
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

  return `${APP_DIRECTORY}${folder}${subFolder}${fileName}/${fileName}.tsx`;
}

const command: GluegunCommand = {
  name: 'create',
  alias: ['c', 'generate', 'g'],
  run: async (toolbox: GluegunToolboxExtended) => {
    const { parameters, prompt } = toolbox;
    const { loadWhile } = interfaceHelpers(toolbox);
    const { checkCurrentDirReactNativeProject } = validations(toolbox);

    await loadWhile(checkCurrentDirReactNativeProject());

    const userCategoryInput = parameters.first;
    let fileCategory: FileCategory = FileCategory[userCategoryInput];
    let fileName = parameters.options['n'];
    let folderName = parameters.options['f'];

    if (!fileCategory) {
      const informBadInput = userCategoryInput && !fileCategory;
      const { category } = await prompt.ask([questionFileCategory(informBadInput)]);
      fileCategory = category;
    }

    if (!fileName) {
      const { name } = await prompt.ask([questionFileName]);
      fileName = name;
    }

    const directoryName = getDirectoryName(fileCategory, fileName, folderName);

    // TODO: add filename checking to make sure files are named correctly. For example, components
    // should be named starting with a capital letter, and custom hook names should always start
    // with "use".

    toolbox.template.generate({
      template: `fileCreation/${fileCategory}.ejs`,
      target: directoryName,
      props: { fileName },
    });
  },
};

module.exports = command;
