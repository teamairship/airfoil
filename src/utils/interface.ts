import { GluegunToolboxExtended } from '../extensions/extensions';

/**
 * Interface Helpers for Humans
 * Possible colors:
 * @see https://github.com/Marak/colors.js
 * @param toolbox
 */
export const interfaceHelpers = (toolbox: GluegunToolboxExtended) => {
  const { print, printV, parameters, system, meta } = toolbox;
  const { red, gray, cyan, bgBlack } = print.colors;
  const { optDry, isVerbose } = toolbox.globalOpts;

  const title = () => {
    print.newline();
    print.newline();
    print.info(red(' █████  ██ ██████  ███████  ██████  ██ ██      '));
    print.info(red('██   ██ ██ ██   ██ ██      ██    ██ ██ ██      '));
    print.info(red('███████ ██ ██████  █████   ██    ██ ██ ██      '));
    print.info(red('██   ██ ██ ██   ██ ██      ██    ██ ██ ██      '));
    print.info(red('██   ██ ██ ██   ██ ██       ██████  ██ ███████ '));
    print.newline();
  };

  const about = () => {
    print.info(gray(`Version ${meta.version()}\t\tMade with ♡ by Airship`));
    print.newline();
    print.newline();
  };

  const dryNotice = () => {
    if (optDry) {
      print.newline();
      print.warning('-------------------');
      print.warning('-- D R Y   R U N --');
      print.warning('-------------------');
      print.newline();
    }
  };

  const postInstallInstructions = (projectName: string) => {
    printV.newline();
    printV.newline();
    printV.code(bgBlack(` `));
    printV.code(gray(`You are now ready to hack.`));
    printV.code(cyan(`cd ${projectName}`));
    printV.code(cyan(`yarn ios || yarn android `));
    printV.code(bgBlack(` `));
    printV.newline();
    printV.newline();
  };

  type Task = { stop: () => void };
  const printTask = (msg: string): Task => {
    printV.info(msg);
    const t = print.spin('');
    return {
      stop: () => t.stop(),
    };
  };

  const runTask = async (msg: string, callback: () => Promise<void>) => {
    const t = printTask(msg);
    await callback();
    t.stop();
  };

  const loader = () => {
    const t = print.spin(gray(isVerbose ? 'loading...' : ''));
    return {
      stop: () => t.stop(),
    };
  };

  const loadWhile = async (p: Promise<any> | (() => Promise<any>)) => {
    const loading = loader();
    const result = typeof p === 'function' ? p() : p;
    await result;
    loading.stop();
    return result;
  };

  const debug = Boolean(parameters.options.debug);

  const log = (m: string): string => {
    if (debug) print.info(gray(m));
    return m;
  };

  const cmd = (c: string) => system.run(log(c));

  return {
    title,
    about,
    dryNotice,
    postInstallInstructions,
    printTask,
    runTask,
    printV,
    loader,
    loadWhile,
    cmd,
    log,
    debug,
  };
};
