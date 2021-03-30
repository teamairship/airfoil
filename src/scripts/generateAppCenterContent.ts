import { GluegunToolboxExtended } from '../extensions/extensions';
import { toolPrintDiff } from '../utils/diff';
import { updateFileWithNewContent } from '../utils/filesystem';
import { updateResStringsXmlWithNewContent } from '../utils/appcenter/updateResStringsXml';
import {
  updateAppDelegateDidFinishLaunchingWithOptions,
  updateAppDelegateImports,
} from '../utils/appcenter/updateAppDelegate';
import { interfaceHelpers } from '../utils/interface';
import { addTemplateAndPromptIfExisting } from '../utils/template';

export const generateAppCenterContent = async (
  toolbox: GluegunToolboxExtended,
  projectName,
  appCenterSecret,
) => {
  const { dryNotice } = interfaceHelpers(toolbox);
  dryNotice();

  const [printDiff, cleanup] = toolPrintDiff(toolbox);

  await addTemplateAndPromptIfExisting(toolbox, printDiff, {
    template: 'appcenter/AppCenter-Config.plist.ejs',
    target: 'AppCenter-Config.plist',
    props: { appCenterSecret },
  });

  await updateFileWithNewContent({
    filePath: `ios/${projectName}/AppDelegate.m`,
    toNewContent: updateAppDelegateImports,
    printDiff,
    toolbox,
  });

  await updateFileWithNewContent({
    filePath: `ios/${projectName}/AppDelegate.m`,
    toNewContent: updateAppDelegateDidFinishLaunchingWithOptions,
    printDiff,
    toolbox,
  });

  await addTemplateAndPromptIfExisting(toolbox, printDiff, {
    template: 'appcenter/appcenter-config.json.ejs',
    target: 'android/app/src/main/assets/appcenter-config.json',
    props: { appCenterSecret },
  });

  await updateFileWithNewContent({
    filePath: `android/app/src/main/res/values/strings.xml`,
    toNewContent: updateResStringsXmlWithNewContent,
    printDiff,
    toolbox,
  });

  await addTemplateAndPromptIfExisting(toolbox, printDiff, {
    template: 'appcenter/appcenter-pre-build.sh.ejs',
    target: 'appcenter-pre-build.sh',
  });

  await addTemplateAndPromptIfExisting(toolbox, printDiff, {
    template: 'appcenter/appcenter-post-build.sh.ejs',
    target: 'appcenter-post-build.sh',
  });

  await addTemplateAndPromptIfExisting(toolbox, printDiff, {
    template: 'appcenter/version-capture-script.js.ejs',
    target: 'version-capture-script.js',
  });

  cleanup();
};
