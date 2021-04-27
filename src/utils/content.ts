import { GluegunToolbox } from 'gluegun';
import { GluegunTemplateGenerateOptions } from 'gluegun/build/types/toolbox/template-types';
import { GluegunToolboxExtended } from '../extensions/extensions';

/**
 * Tool: `getFileContent`
 *
 * **Usage:**
 * ```
 * const getFileContent = useGetFileContent(toolbox);
 * const content = getFileContent('someFile.txt', 'this is default content');
 * ```
 * @param toolbox
 */
export const toolGetFileContent = (toolbox: GluegunToolbox) => (
  filePath: string,
  defaultContent: string,
  ignoreMissingFile?: boolean,
) => {
  const { filesystem, print } = toolbox;

  if (!filesystem.exists(filePath)) {
    if (typeof defaultContent === 'string') {
      // create file
      filesystem.file(filePath);
      return defaultContent;
    }

    if (!ignoreMissingFile) {
      print.warning(`WARNING: file \`${filesystem.cwd()}/${filePath}\` does not exist! Skipping`);
    }
    return;
  }

  const content = filesystem.read(filePath);
  return content;
};

export const addTemplateAndPromptIfExisting = async (
  toolbox: GluegunToolboxExtended,
  generateOptions: GluegunTemplateGenerateOptions,
) => {
  const { template, filesystem, prompt, print } = toolbox;
  const { yellow } = print.colors;
  const { target } = generateOptions;

  let textAction = 'added';
  if (filesystem.exists(target)) {
    const { confirmed } = await prompt.ask([
      {
        type: 'confirm',
        name: 'confirmed',
        message: `${yellow(target)} already exists - overwrite?`,
      },
    ]);
    if (!confirmed) return;
    textAction = 'updated';
  }

  await template.generate(generateOptions);
  print.success(`${print.checkmark} ${textAction} ${target}`);
};
