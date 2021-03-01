import { GluegunToolboxExtended } from '../extensions/extensions';
import { interfaceHelpers } from './interface';

const camelCase = require('camelcase');

export const getProjectName = async (toolbox: GluegunToolboxExtended) => {
  const { cmd } = interfaceHelpers(toolbox);
  const appNameRaw = await cmd('cat package.json | npx json name');
  return camelCase(appNameRaw.replace('\n', ''));
};
