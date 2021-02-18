import { GluegunToolbox } from 'gluegun';

type Log = (m: string) => string;
type GlobalOpts = {
  optDry: boolean;
  optDebug: boolean;
  optUpdate: string;
  optVerbose: boolean;
  isVerbose: boolean;
};
type PrintV = {
  info: (msg: string) => void;
  newline: () => void;
  success: (msg: string) => void;
  code: (msg: string) => void;
};

export interface GluegunToolboxExtended extends GluegunToolbox {
  globalOpts: GlobalOpts;
  log: Log;
  printV: PrintV;
}

const DE_FACTO_VERBOSE_COMMANDS = ['new', 'print'];

module.exports = (toolbox: GluegunToolbox) => {
  const { print, parameters, commandName } = toolbox;
  const { gray, bgBlack } = print.colors;

  //
  // GLOBAL OPTIONS
  //
  const optDry = Boolean(parameters.options.dry);
  const optDebug = Boolean(parameters.options.debug);
  const optUpdate = parameters.options.update || parameters.options.u;
  const optVerbose = Boolean(parameters.options.verbose || parameters.options.v);
  const isVerbose = optVerbose || DE_FACTO_VERBOSE_COMMANDS.includes(commandName);
  const globalOpts: GlobalOpts = {
    optDry,
    optDebug,
    optUpdate,
    optVerbose,
    isVerbose,
  };
  toolbox.globalOpts = globalOpts;

  //
  // DEBUG LOG
  //
  const log: Log = (m: string): string => {
    if (optDebug) print.info(gray(m));
    return m;
  };
  toolbox.log = log;

  //
  // PRINT EXTENSIONS
  //
  const printV: PrintV = {
    info: isVerbose ? print.info : () => {},
    newline: isVerbose ? print.newline : () => {},
    success: isVerbose ? print.success : () => {},
    code: (msg = '') => {
      if (!msg) return printV.code(bgBlack(` `));
      const len = Math.max(60 - msg.length, 0);
      const ws = ' '.repeat(len);
      printV.info(`\t${bgBlack(`  ${msg}${ws}  `)}`);
    },
  };
  toolbox.printV = printV;
};
