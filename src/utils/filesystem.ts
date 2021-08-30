import { GluegunToolboxExtended } from '../extensions/extensions';
import { toolGetFileContent } from './content';
import { FileCategory } from '../constants';

export const getDirectoryName = (
  fileCategory: FileCategory,
  fileName: string,
  folderName?: string,
): string => {
  const APP_DIRECTORY = 'app/';
  const folder = `${fileCategory.toLowerCase()}s/`;
  let subFolder = '';
  const extension = fileCategory === FileCategory.component ? '.tsx' : '.ts';

  if (fileCategory === FileCategory.component) {
    subFolder = folderName ? `${folderName}/` : 'common/';
  } else {
    subFolder = folderName ? `${folderName}/` : '';
  }

  return `${APP_DIRECTORY}${folder}${subFolder}${fileName}${extension}`;
};

export const updateFileWithNewContent = async ({
  filePath,
  defaultContent,
  toNewContent,
  printDiff,
  toolbox,
  ignoreMissingFile = false,
}: {
  filePath: string;
  defaultContent?: string;
  toNewContent: (content: string) => string;
  printDiff: (content: string, newContent: string, fileName?: string) => Promise<void>;
  toolbox: GluegunToolboxExtended;
  ignoreMissingFile?: boolean;
}): Promise<void> => {
  const { filesystem, print } = toolbox;
  const { optDry, optVerbose, optDebug } = toolbox.globalOpts;
  const getFileContent = toolGetFileContent(toolbox);
  try {
    const content = getFileContent(filePath, defaultContent, ignoreMissingFile);
    if (typeof content !== 'string') return;

    const newContent = toNewContent(content);

    if (optDry || optVerbose) await printDiff(content, newContent, filePath);
    if (optDry) return;

    filesystem.write(filePath, newContent);
    print.success(`${print.checkmark} updated ${filePath}`);
  } catch (err) {
    if (optDebug || optVerbose) {
      print.error(err);
    } else {
      print.error(`${print.xmark} ${err.message}`);
    }
  }
};
