import { GluegunToolboxExtended } from '../extensions/extensions';
// import { toolPrintDiff } from '../utils/diff';
// import { updateFileWithNewContent } from '../utils/filesystem';
// import { updateResStringsXmlWithNewContent } from '../utils/appcenter/updateResStringsXml';
// import {
//   updateAppDelegateDidFinishLaunchingWithOptions,
//   updateAppDelegateImports,
// } from '../utils/appcenter/updateAppDelegate';
import { interfaceHelpers } from '../utils/interface';
// import { addTemplateAndPromptIfExisting } from '../utils/template';

export const generateSplashScreenContent = async (toolbox: GluegunToolboxExtended, projectName) => {
  const { dryNotice } = interfaceHelpers(toolbox);
  dryNotice();

  // const [printDiff, cleanup] = toolPrintDiff(toolbox);

  // cleanup();
};
