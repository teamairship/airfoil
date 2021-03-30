//
// SAMPLE A
//
const INPUT_A = `
export const ARG_A=Config.ARG_A;
export const ARG_B = Config.ARG_B;
// some comment about something or other
export const ARG_C = Config.ARG_C;
`;
const ARGS_A = { envKey: 'test-test', envComment: '' };
const OUTPUT_A = `
export const ARG_A=Config.ARG_A;
export const ARG_B = Config.ARG_B;
// some comment about something or other
export const ARG_C = Config.ARG_C;
export const TEST_TEST = Config.TEST_TEST;
`;

//
// SAMPLE B
//
const INPUT_B = `
export const ARG_A = Config.ARG_A;





`;
const ARGS_B = { envKey: 'testTest', envComment: 'this is a test' };
const OUTPUT_B = `
export const ARG_A = Config.ARG_A;
// this is a test
export const TEST_TEST = Config.TEST_TEST;
`;

//
// SAMPLE C
//
const INPUT_C = `
export const TEST=Config.TEST;
export const TEST=Config.TEST;
export const TEST=Config.TEST;`;
const ARGS_C = { envKey: 'test', envComment: '' };
const ERR_MSG_C = `ENV key "TEST" already exists in constants.ts`;

module.exports.INPUT_A = INPUT_A;
module.exports.ARGS_A = ARGS_A;
module.exports.OUTPUT_A = OUTPUT_A;
module.exports.INPUT_B = INPUT_B;
module.exports.ARGS_B = ARGS_B;
module.exports.OUTPUT_B = OUTPUT_B;
module.exports.INPUT_C = INPUT_C;
module.exports.ARGS_C = ARGS_C;
module.exports.ERR_MSG_C = ERR_MSG_C;
