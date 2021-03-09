import { GluegunToolboxExtended } from '../extensions/extensions';
import { interfaceHelpers } from '../utils/interface';
import { toolPrintDiff } from '../utils/diff';
import { addEnvVar, addConstant, addAppCenterVar } from '../utils/envVar';
import { updateFileWithNewContent } from '../utils/filesystem';

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

  await updateFileWithNewContent({
    filePath: '.env',
    defaultContent: await defaultContentEnv(toolbox),
    toNewContent: content => addEnvVar(content, envKey, envVal, envComment),
    printDiff,
    toolbox,
  });

  await updateFileWithNewContent({
    filePath: '.env.example',
    defaultContent: await defaultContentEnv(toolbox),
    toNewContent: content => addEnvVar(content, envKey, '', envComment),
    printDiff,
    toolbox,
  });

  await updateFileWithNewContent({
    filePath: 'app/constants.ts',
    defaultContent: await defaultContentConstants(toolbox),
    toNewContent: content => addConstant(content, envKey, envComment, envType),
    printDiff,
    toolbox,
  });

  await updateFileWithNewContent({
    filePath: 'appcenter-pre-build.sh',
    defaultContent: await defaultContentAppCenter(toolbox),
    toNewContent: content => addAppCenterVar(content, envKey),
    printDiff,
    toolbox,
  });

  cleanup();
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
    template: 'appcenter/appcenter-pre-build.sh.ejs',
  });
