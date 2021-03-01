import { GluegunToolboxExtended } from '../extensions/extensions';
import { interfaceHelpers } from '../utils/interface';
import { toolGetFileContent } from '../utils/content';
import { toolPrintDiff } from '../utils/diff';
import { addEnvVar, addConstant, addAppCenterVar } from '../utils/envVar';

export const generateEnvVar = async ({
  toolbox,
  envKey = '',
  envVal = '',
  envType = 'string',
  envComment = '',
}: {
  toolbox: GluegunToolboxExtended;
  envKey: string;
  envVal: string;
  envType: 'string' | 'boolean';
  envComment: string;
}) => {
  const { dryNotice } = interfaceHelpers(toolbox);
  dryNotice();

  const [printDiff, cleanup] = toolPrintDiff(toolbox);

  await processEnvFile({
    filePath: '.env',
    defaultContent: await defaultContentEnv(toolbox),
    toNewContent: content => addEnvVar(content, envKey, envVal, envComment),
    printDiff,
    toolbox,
  });

  await processEnvFile({
    filePath: '.env.example',
    defaultContent: await defaultContentEnv(toolbox),
    toNewContent: content => addEnvVar(content, envKey, '', envComment),
    printDiff,
    toolbox,
  });

  await processEnvFile({
    filePath: 'app/constants.ts',
    defaultContent: await defaultContentConstants(toolbox),
    toNewContent: content => addConstant(content, envKey, envComment, envType),
    printDiff,
    toolbox,
  });

  await processEnvFile({
    filePath: 'appcenter-pre-build.sh',
    defaultContent: await defaultContentAppCenter(toolbox),
    toNewContent: content => addAppCenterVar(content, envKey),
    printDiff,
    toolbox,
  });

  cleanup();
};

const processEnvFile = async ({
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
  const { optDry, optVerbose } = toolbox.globalOpts;
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
    print.error(err);
  }
};

const defaultContentEnv = async (toolbox: GluegunToolboxExtended) =>
  toolbox.template.generate({
    template: '.env.ejs',
  });

const defaultContentConstants = async (toolbox: GluegunToolboxExtended) =>
  toolbox.template.generate({
    template: 'constants.ts.ejs',
  });

const defaultContentAppCenter = async (toolbox: GluegunToolboxExtended) =>
  toolbox.template.generate({
    template: 'appcenter-pre-build.sh.ejs',
  });
