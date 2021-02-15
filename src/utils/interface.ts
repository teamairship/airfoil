import { Toolbox } from 'gluegun/build/types/domain/toolbox';

/**
 * Interface Helpers for Humans
 * Possible colors:
 * @see https://github.com/Marak/colors.js
 * @param toolbox
 */
export const interfaceHelpers = (toolbox: Toolbox) => {
  const { print, parameters, system, meta, commandName } = toolbox;
  const { red, gray, cyan, bgBlack } = print.colors;

  const code = (msg: string = '') => {
    const len = Math.max(60 - msg.length, 0);
    const ws = ' '.repeat(len);
    print.info(`\t${bgBlack(`  ${msg}${ws}  `)}`);
  };

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

  const titleSecondary = () => {
    print.newline();
    const spaceLetters = (w = '') => w.split('').join(' ');
    const str1 = spaceLetters('AIRFOIL');
    const str2 = spaceLetters(commandName.toUpperCase());
    const str = red(` ${str1} ${cyan(str2)} `);
    const len = Math.max(36 - str1.length - str2.length, 0);
    const ws = ' '.repeat(Math.floor(len / 2));
    print.info(gray(`--[${ws}${str} ${ws}]--`));
    print.newline();
  };

  const about = () => {
    print.info(gray(`Version ${meta.version()}\t\tMade with ♡ by Airship`));
    print.newline();
    print.newline();
  };

  const postInstallInstructions = (projectName: string) => {
    print.newline();
    print.newline();
    code(bgBlack(` `));
    code(gray(`You are now ready to hack.`));
    code(cyan(`cd ${projectName}`));
    code(cyan(`yarn start`));
    code(cyan(`yarn ios`));
    code(cyan(`yarn android`));
    code(bgBlack(` `));
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
    code,
    title,
    titleSecondary,
    about,
    postInstallInstructions,
    printTask,
    loader,
    loadWhile,
    cmd,
    log,
    debug,
  };
};
