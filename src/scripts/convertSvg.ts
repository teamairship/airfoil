import * as _ from 'lodash';
import { GluegunTemplateGenerateOptions } from 'gluegun/build/types/toolbox/template-types';

import { GluegunToolboxExtended } from '../extensions/extensions';
import { interfaceHelpers } from '../utils/interface';

const SRC_DIR = 'app/assets/svg';
const OUT_DIR = 'app/components/icon';
const SVGR_TEMPLATE_DIR = '_temp/svgrTemplate.js';
const FILENAME_SVGO_CONFIG = '.svgo.yml';

export const convertSvg = async (toolbox: GluegunToolboxExtended, cleanup = false) => {
  const { print, filesystem, parameters, log } = toolbox;
  const { yellow, green, cyan } = print.colors;
  const { runTask, cmd } = interfaceHelpers(toolbox);
  const { path } = filesystem;

  const srcPath = path(SRC_DIR);
  const outPath = path(OUT_DIR);
  let isPkgInstalled = false;
  const isSvg = f => /\.svg$/.test(f);
  const isTsx = f => /\.tsx$/.test(f) && !/index\.(tsx|js)$/.test(f);
  await runTask('🔬 checking some things... ', async () => {
    if (!filesystem.exists(srcPath)) {
      print.error(`\n${srcPath} does not exist`);
      print.error(`add .svg files to to ${cyan(SRC_DIR)} dir and run this cmd again`);
      process.exit(1);
    }

    const svgFiles = filesystem.list(srcPath).filter(isSvg);
    if (!svgFiles.length) {
      print.error(`\nno .svg files present in ${srcPath}`);
      print.error(`add .svg files to to ${cyan(SRC_DIR)} dir and run this cmd again`);
      process.exit(1);
    }

    const nodeVersion = await cmd('node --version');
    // prettier-ignore
    if (parseVersionMajorNumber(nodeVersion) < 11) {
      print.error(`Installed node version must be least v11.0. Current node version is ${nodeVersion}`);
      print.info(yellow('Consider using nvm to switch between node versions: https://github.com/nvm-sh/nvm'));
      process.exit(1);
    }

    const packageJsonContents = await cmd('cat package.json');
    isPkgInstalled = /react-native-svg/.test(packageJsonContents);
  });

  if (!isPkgInstalled) {
    await runTask('🔧 installing deps... ', async () => {
      await cmd('yarn add react-native-svg');
    });
  }

  // create outPath if not exists
  filesystem.dir(outPath);
  // get existing files that have already been converted
  const existingFiles = filesystem
    .list(outPath)
    .filter(isTsx)
    .join(',');

  let results;
  await runTask('💾 converting svg files...', async () => {
    // add templates
    await addSvgrTemplateFile(toolbox);
    await addSvgoConfigFile(toolbox);
    const action = `npx @svgr/cli --out-dir ${outPath} --ext tsx --template ${SVGR_TEMPLATE_DIR} --native --typescript --ignore-existing ${srcPath}`;
    // capture the stdout of the above command, which prints each converted file on a new line
    results = await cmd(action);
    // remove temp templates / config files
    await cmd(`rm -rf ${SVGR_TEMPLATE_DIR}`);
    await cmd(`rm -rf _temp`);
    await cmd(`rm -rf ${FILENAME_SVGO_CONFIG}`);
    // remove generated index.tsx file
    await cmd(`rm -rf ${path(OUT_DIR, 'index.tsx')}`);
    // process the Svg .tsx files with extra goodies
    const svgFiles = filesystem
      .list(outPath)
      .filter(isTsx)
      .map(f => path(outPath, f));
    await Promise.all(svgFiles.map(file => processConvertedTsxFile(toolbox, file)));
  });

  await runTask('💎 prettifying...', async () => {
    if (parameters.options.skipPrettier) {
      log('skipping prettification due to --skip-prettier flag');
    } else {
      await cmd(`npx prettier --write \"${outPath}/*.+(tsx|jsx|ts|js)\"`);
    }
  });

  print.success(`${print.checkmark} successfully converted svg files`);
  print.info(green(parseConvertResults(results, path(), existingFiles)));

  if (cleanup) {
    await runTask('🧹 cleaning up...', async () => {
      await cmd(`rm -rf ${SRC_DIR}`);
    });
    print.success(`${print.checkmark} removed ${SRC_DIR}`);
  }
};

/**
 * Parse the major version number from a version string.
 * @param version
 * @returns {number}
 */
const parseVersionMajorNumber = (version: string): number => {
  if (!version) return 0;
  let vStripped = String(version).replace('v', '');
  return Number(vStripped.split('.')[0]);
};

const parseConvertResults = (results: string, cwd: string, existingFiles: string) => {
  if (!results || !cwd) return '';
  const regNewLine = /\r{0,1}\n+/;
  // strip line up to the last "/" char
  const regStripLine = /.*\//;
  const lines = String(results).split(regNewLine);
  const search = new RegExp(cwd, 'g');
  const isNewlyGenerated = line => !existingFiles.includes(line.replace(regStripLine, ''));
  const linesFormatted = lines
    .filter(isNewlyGenerated)
    .map(l => l.replace(search, ''))
    .map(l => l.replace(/\/app/g, 'app'));
  if (linesFormatted.length === 0) return 'No new files.';
  return linesFormatted.join('\n');
};

const addSvgrTemplateFile = async (toolbox: GluegunToolboxExtended) => {
  await toolbox.template.generate({
    template: 'svgr/template.js.ejs',
    target: toolbox.filesystem.path(SVGR_TEMPLATE_DIR),
  });
};

const addSvgoConfigFile = async (toolbox: GluegunToolboxExtended) => {
  await toolbox.template.generate({
    template: 'svgr/.svgo.yml.ejs',
    target: toolbox.filesystem.path(FILENAME_SVGO_CONFIG),
  });
};

const processConvertedTsxFile = async (toolbox: GluegunToolboxExtended, filePath: string) => {
  const { filesystem, template, log, print } = toolbox;
  let content = filesystem.read(filePath);
  if (!content) {
    log(`no content found at path "${filePath}"`);
    return;
  }
  if (isSvgFilePreviouslyProcessed(content)) {
    log(`file was previously processed: "${filePath}"`);
    return;
  }

  const componentName = getComponentName(filePath);
  content = await onProcessConvertedTsxFile(content, componentName, template.generate);

  if (!content) {
    print.error(
      `${print.xmark} post-conversion processing failed for "${filePath}" - please edit this file manually`,
    );
    return;
  }

  filesystem.write(filePath, content);
};

/**
 * Given content from a newly-converted svg TSX file, return new content
 */
const onProcessConvertedTsxFile = async (
  oldContent: string,
  componentName: string,
  generateTemplate: (options: GluegunTemplateGenerateOptions) => Promise<string>,
): Promise<string> => {
  let content = oldContent;
  const { minX, minY, width, height } = parseViewBox(content);
  const colors = findUniqueColors(content);
  const colorPropTypes = getColorPropTypes(colors);
  const colorMap = getColorMap(colors);
  const colorProps = getColorProps(colors);
  content = updateSvgHead(
    content,
    await generateTemplate({
      template: 'svgr/svgHeadPartial.tsx.ejs',
      props: { width, height, colorPropTypes },
    }),
  );
  const viewBox = `${minX} ${minY} ${width} ${height}`;
  content = updateSvgLine(
    content,
    await generateTemplate({
      template: 'svgr/svgLinePartial.tsx.ejs',
      props: { viewBox },
    }),
  );
  content = updateSvgColors(content, colors, colorMap);
  content = updateSvgProps(
    content,
    await generateTemplate({
      template: 'svgr/svgPropsPartial.tsx.ejs',
      props: { colorProps },
    }),
  );
  content = content.replace(/&#34;/g, '"');
  content = addComponentType(content, componentName);
  return content;
};

export const __test__onProcessConvertedTsxFile = onProcessConvertedTsxFile;

const isSvgFilePreviouslyProcessed = (content: string): boolean => {
  return content.indexOf('(props: SvgProps)') === -1;
};

/**
 * Parse the viewbox data of an Svg component .tsx file
 * @param content
 */
const parseViewBox = (content: string) => {
  const search = /viewBox="(\d+\.{0,1}\d*) (\d+\.{0,1}\d*) (\d+\.{0,1}\d*) (\d+\.{0,1}\d*)"/g;
  const matches = search.exec(content);
  if (!matches || !matches) throw new Error('viewbox not found');
  if (matches.length < 5) throw new Error(`viewbox in unexpected format`);
  return {
    minX: Number(matches[1]),
    minY: Number(matches[2]),
    width: Number(matches[3]),
    height: Number(matches[4]),
  };
};
// tslint:disable-next-line:variable-name
export const __test__parseViewBox = parseViewBox;

// see: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/color
const colorAttributes = ['fill', 'stroke', 'stopColor', 'floodColor', 'lightingColor'];
/**
 * Find all of the unique colors used in an Svg component .tsx file
 * @param content
 */
const findUniqueColors = (content: string) => {
  const colors = [];
  colorAttributes.forEach(attr => {
    const search = new RegExp(`${attr}="(.*?)"`, 'gm');
    const matches = content.match(search);
    if (!matches || !matches.length) return;
    // console.log(matches);
    matches.forEach(match => {
      if (!match) return;
      colors.push(match.replace(`${attr}=`, '').replace(/"/g, ''));
    });
  });
  return _.uniq(colors).filter(c => c !== 'none');
};

/**
 * Given an array of colors, return a string representing the
 * color props that the Svg component should have
 * @param colors
 */
const getColorPropTypes = (colors: string[]): string => {
  if (!colors || !colors.length) return '';
  if (colors.length === 1) return 'color?: string;';
  return colors.map((c, i) => `color${i + 1}?: string;`).join('\n  ');
};

/**
 * Given an array of colors like `[''#111', '#000']`,
 * Return a map like so: `{'#111': 'color1', '#000': 'color2' }`
 * Given an array with a single color like `[''#fa0']`,
 * Return a map like so: `{'#fa0': 'color' }`
 * @param colors
 */
const getColorMap = (colors: string[]): { [key: string]: string } => {
  if (!colors || !colors.length) return {};
  if (colors.length === 1) return { [String(colors[0])]: 'color' };
  const colorMap = {};
  colors.forEach((c, i) => {
    colorMap[String(c)] = `color${i + 1}`;
  });
  return colorMap;
};

/**
 * Given an array of colors, return a string representing the
 * color props that the Svg component should have
 * @param colors
 */
const getColorProps = (colors: string[]): string => {
  if (!colors || !colors.length) return '';
  if (colors.length === 1) return `color = "${colors[0]}",`;
  return colors.map((c, i) => `color${i + 1} = "${colors[i]}"`).join(',\n  ') + ',';
};

const cursorAfterLastImport = (content: string) => {
  const indexLastImport = content.lastIndexOf('import');
  const indexNewlineAfterLastImport = content.indexOf('\n', indexLastImport);
  return indexNewlineAfterLastImport + 1;
};

/**
 * Replace the top of the Svg file with new content
 * @param content
 * @param newContent
 */
const updateSvgHead = (content: string, newContent: string) => {
  const i = cursorAfterLastImport(content);
  return content.substring(0, i) + newContent + '\n' + content.substring(i);
};

/**
 * Replace the <Svg> line with new content
 * @param content
 * @param newContent
 */
const updateSvgLine = (content: string, newContent: string) => {
  const search = /(<Svg\s{0,1}(.|\n)*?>)\n/g;
  const matches = content.match(search);
  if (!matches || !matches.length || !matches[0]) return '';
  const svgLine = matches[0];
  const indexSvgStart = content.indexOf(svgLine);
  const indexSvgEnd = indexSvgStart + svgLine.length;
  return content.substring(0, indexSvgStart) + newContent + '\n' + content.substring(indexSvgEnd);
};

const updateSvgProps = (content: string, newContent: string) => {
  return content.replace('props: SvgProps', newContent);
};

/**
 * Replace svg colors with the appropriate mapped colorProp
 * @param content
 * @param colors
 * @param colorMap
 */
const updateSvgColors = (
  content: string,
  colors: string[],
  colorMap: { [key: string]: string },
) => {
  let newContent = content;
  if (!colors || !colors.length) return newContent;
  colors.forEach(color => {
    newContent = newContent.replace(new RegExp(`"${color}"`, 'g'), `{${colorMap[color]}}`);
  });
  return newContent;
};

const getComponentName = (filePath: string): string => {
  if (!filePath) return '';
  const pathParts = filePath.split('/');
  if (!pathParts.length) return '';
  const fileName = pathParts[pathParts.length - 1];
  return fileName.split('.')[0];
};

export const test_getComponentName = getComponentName;

const addComponentType = (content: string, componentName: string) => {
  const typeAlreadyExists = /React.FC<Props>/.test(content);
  if (typeAlreadyExists) return content;

  return content.replace(
    `const Svg${componentName} =`,
    `const Svg${componentName}: React.FC<Props> =`,
  );
};
