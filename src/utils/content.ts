import { GluegunToolbox } from 'gluegun';

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
) => {
  const { filesystem, print } = toolbox;

  if (!filesystem.exists(filePath)) {
    if (typeof defaultContent === 'string') {
      // create file
      filesystem.file(filePath);
      return defaultContent;
    }

    print.warning(`WARNING: file \`${filesystem.cwd()}/${filePath}\` does not exist! Skipping`);
    return;
  }

  const content = filesystem.read(filePath);
  return content;
};
