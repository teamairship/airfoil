import { snakeCase } from 'snake-case';
import { GluegunToolboxExtended } from '../extensions/extensions';
import { interfaceHelpers } from '../utils/interface';
const camelCase = require('camelcase');

const PATH_ADRS = 'adr';
const PATH_ADR_README = 'adr/__README__.md';
const REG_ADR_FILENAME = /^(\d{4})_.*\.md$/;
const INITIAL_ADR_INDEX = 1;

export const generateAdr = async (toolbox: GluegunToolboxExtended, adrTitle: string) => {
  const { filesystem, print } = toolbox;
  const { path, cwd } = filesystem;
  const pathAdrDir = path(cwd(), PATH_ADRS);

  createDirIfNotExists(toolbox, pathAdrDir);
  const nextIndex = getNextAdrIndex(toolbox, pathAdrDir);
  const adrFileName = `${nextIndex}_${snakeCase(adrTitle)}.md`;
  const adrFilePath = path(PATH_ADRS, adrFileName);

  if (!filesystem.exists(PATH_ADR_README)) {
    const projectName = await getProjectName(toolbox);
    toolbox.template.generate({
      template: 'adr-readme-template.ejs',
      target: PATH_ADR_README,
      props: { projectName },
    });
    print.success(`${print.checkmark} Added ${PATH_ADR_README}`);
  }

  toolbox.template.generate({
    template: 'adr-template.ejs',
    target: adrFilePath,
    props: { title: adrTitle },
  });
  print.success(`${print.checkmark} Added ${PATH_ADRS}/${adrFileName}`);
};

const createDirIfNotExists = (toolbox: GluegunToolboxExtended, pathAdrDir: string) => {
  toolbox.filesystem.dir(pathAdrDir);
};

/**
 * Iterate through adr/ dir, inspecting each filename to get the next adr index
 * @param toolbox
 * @param pathAdrDir
 */
const getNextAdrIndex = (toolbox: GluegunToolboxExtended, pathAdrDir: string): string => {
  const { filesystem } = toolbox;
  const result = filesystem.inspectTree(pathAdrDir);
  if (!result || !result.children || !result.children.length) {
    return INITIAL_ADR_INDEX.toString().padStart(4, '0');
  }

  let maxIndex = INITIAL_ADR_INDEX;
  result.children.forEach(child => {
    if (child.type !== 'file' || !child.name) return;
    const matches = child.name.match(REG_ADR_FILENAME);
    if (!matches || !matches[1]) return;
    const parsedIndex = parseInt(matches[1], 10);
    if (parsedIndex < maxIndex) return;
    maxIndex = parsedIndex + 1;
  });

  const nextIndex = maxIndex;
  return nextIndex.toString().padStart(4, '0');
};

const getProjectName = async (toolbox: GluegunToolboxExtended) => {
  const { cmd } = interfaceHelpers(toolbox);
  const appNameRaw = await cmd('cat package.json | npx json name');
  return camelCase(appNameRaw.replace('\n', ''));
};
