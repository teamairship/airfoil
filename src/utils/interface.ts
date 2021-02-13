import { Toolbox } from 'gluegun/build/types/domain/toolbox';

/**
 * Interface Helpers for Humans
 * Possible colors:
 * @see https://github.com/Marak/colors.js
 * @param toolbox
 */
export const interfaceHelpers = (toolbox: Toolbox) => {
  const { print, parameters, system, meta } = toolbox;
  const { red, gray } = print.colors;

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

  type Task = { stop: () => void };
  const printTask = (msg: string): Task => {
    print.info(msg);
    const t = print.spin('');
    return {
      stop: () => t.stop(),
    };
  };

  const loader = () => {
    const t = print.spin(gray('loading...'));
    return {
      stop: () => t.stop(),
    };
  };

  const loadWhile = async (p: Promise<void> | (() => Promise<void>)) => {
    const loading = loader();
    const result = typeof p === 'function' ? p() : p;
    await result;
    loading.stop();
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
    printTask,
    loader,
    loadWhile,
    cmd,
    log,
    debug,
  };
};
