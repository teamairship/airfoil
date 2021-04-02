import { GluegunToolboxExtended } from '../extensions/extensions';
import { interfaceHelpers } from '../utils/interface';

const SRC_DIR = 'app/assets/svg';
const OUT_DIR = 'app/components/icon';

export const convertSvg = async (toolbox: GluegunToolboxExtended, cleanup = false) => {
  const { print, filesystem } = toolbox;
  const { yellow, green } = print.colors;
  const { runTask, cmd } = interfaceHelpers(toolbox);

  const srcPath = filesystem.path(SRC_DIR);
  const outPath = filesystem.path(OUT_DIR);
  let isPkgInstalled = false;

  await runTask('🔬 checking some things... ', async () => {
    if (!filesystem.exists(srcPath)) {
      print.error(`${srcPath} does not exist`);
      print.info(yellow(`add .svg files to to ${SRC_DIR} dir and run this cmd again`));
      process.exit(1);
    }

    const isSvg = f => /\.svg$/.test(f);
    const svgFiles = filesystem.list(srcPath).filter(isSvg);
    if (!svgFiles.length) {
      print.error(`no .svg files present in ${srcPath}`);
      print.info(yellow(`add .svg files to to ${SRC_DIR} dir and run this cmd again`));
      process.exit(1);
    }

    const nodeVersion = parseVersionMajorNumber(await cmd('node --version'));
    if (nodeVersion < 11) {
      print.error(
        `Installed node version must be least 11.0. Current node version is ${nodeVersion}`,
      );
      print.info(
        yellow('Consider using nvm to switch between node versions: https://github.com/nvm-sh/nvm'),
      );
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

  let results;
  await runTask('💾 converting svg files...', async () => {
    // create outPath if not exists
    filesystem.dir(outPath);
    results = await cmd(
      `npx @svgr/cli --out-dir ${outPath} --ext tsx --native --typescript --ignore-existing ${srcPath}`,
    );
  });
  print.success(`${print.checkmark} successfully converted svg files`);
  print.info(green(parseConvertResults(results, filesystem.path(), print.checkmark)));

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

const parseConvertResults = (results: string, cwd: string, checkmark: string) => {
  if (!results || !cwd) return '';
  const lines = String(results).split('/n');
  const search = new RegExp(cwd, 'g');
  const linesFormatted = lines.map(l => l.replace(search, '')).map(l => l.replace(/\/app/g, 'app'));
  return linesFormatted.join('\n');
};
