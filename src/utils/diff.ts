import { GluegunToolboxExtended } from '../extensions/extensions';
import { interfaceHelpers } from './interface';

const tmp = require('tmp');

/**
 * Tool: `printDiff`
 * Print a Git diff between `originalContent` and `newContent`
 *
 * **Usage:**
 * ```
 * const { printDiff, cleanupPrintDiff } = toolbox;
 * printDiff(originalContent, newContent, 'text.txt');
 * // call cleanup() once finished
 * cleanup();
 * ```
 * @param toolbox
 */
export const toolPrintDiff = (
  toolbox: GluegunToolboxExtended,
): [
  (originalContent: string, newContent: string, fileName?: string) => Promise<void>,
  () => void,
] => {
  const { filesystem, print } = toolbox;
  const { gray, red, green } = print.colors;
  const { path } = filesystem;
  const { cmd } = interfaceHelpers(toolbox);
  const tmpDir = tmp.dirSync({ unsafeCleanup: true });
  const tmpDirPath = tmpDir.name;
  const cleanup = () => {
    tmpDir.removeCallback();
    filesystem.remove(tmpDirPath);
  };
  const printDiff = async (originalContent: string, newContent: string, fileName?: string) => {
    const tempCwd = filesystem.cwd();
    process.chdir(tmpDirPath);
    const tmpFileName = fileName || 'TEMP_CONTENT.txt';
    const tmpFilepath = path(tmpDirPath, tmpFileName);
    filesystem.dir(tmpDirPath);
    filesystem.remove(path(tmpDirPath, '.git'));
    filesystem.remove(path(tmpDirPath, tmpFilepath));
    await cmd('git init');
    filesystem.file(tmpFilepath);
    filesystem.write(tmpFilepath, originalContent);
    await cmd('git add . && git commit -m "temp commit"');
    filesystem.write(tmpFilepath, newContent);
    const diff = (await cmd('git diff --no-color --ignore-space-at-eol --no-ext-diff')) || '';
    print.divider();
    // prettier-ignore
    print.info(gray(diff
      .replace(/^(\+.*)$/gm, `${green('$1')}`)
      .replace(/^(\-.*)$/gm, `${red('$1')}`)));
    process.chdir(tempCwd);
  };
  return [printDiff, cleanup];
};
