import upperFirst from 'lodash/upperFirst';
import {
  FileCategory,
  questionFileCategory,
  questionFileName,
  questionTakenFileName,
  questionValidHookName,
} from '../constants';
import { GluegunToolboxExtended } from '../extensions/extensions';
import { getDirectoryName } from '../utils/filesystem';
import { interfaceHelpers } from '../utils/interface';
import { validations } from '../utils/validations';
import { checkCommandHelp } from './help';

export const generateFile = async (toolbox: GluegunToolboxExtended) => {
  checkCommandHelp(toolbox);
  const { filesystem, parameters, prompt, print } = toolbox;
  const { loadWhile } = interfaceHelpers(toolbox);
  const { checkCurrentDirReactNativeProject } = validations(toolbox);
  const validHookNameRegEx = /(use[A-Z])\w+/;

  await loadWhile(checkCurrentDirReactNativeProject());

  const userCategoryInput = parameters.first ? parameters.first.toLowerCase() : '';
  let fileNameFinalized = false;
  let fileCategory: FileCategory | undefined = FileCategory[userCategoryInput];
  let fileName = parameters.second ? parameters.second.split('.')[0] : '';
  let folderName: string | undefined = parameters.options['f'];

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

  if (fileCategory === FileCategory.component) {
    fileName = upperFirst(fileName);
  }

  if (fileCategory === FileCategory.hook) {
    while (!fileName.match(validHookNameRegEx)) {
      const { name } = await prompt.ask([questionValidHookName]);
      fileName = name;
    }
  }

  directoryName = getDirectoryName(fileCategory, fileName, folderName);

  if (!filesystem.exists(directoryName)) fileNameFinalized = true;

  while (!fileNameFinalized) {
    const { name } = await prompt.ask([questionTakenFileName]);
    fileName = name;

    if (fileName)
      if (!filesystem.exists(getDirectoryName(fileCategory, name, folderName))) {
        directoryName = getDirectoryName(fileCategory, name, folderName);
        fileNameFinalized = true;
      }
  }

  await toolbox.template.generate({
    template: `fileCreation/${fileCategory}.ejs`,
    target: directoryName,
    props: { fileName },
  });

  print.success(`${fileCategory} successfully created in ${directoryName}`);
};
