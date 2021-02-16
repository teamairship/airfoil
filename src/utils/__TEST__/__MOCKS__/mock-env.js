//
// SAMPLE A
//
const INPUT_A = `
ARG_A=aaaa
ARG_B=BBBB # Inline comment
ARG_C=
`;
const ARGS_A = { envKey: 'test', envVal: 'test', envComment: '' };
const OUTPUT_A = `
ARG_A=aaaa
ARG_B=BBBB # Inline comment
ARG_C=
TEST=test
`;

//
// SAMPLE B
//
const INPUT_B = `
ARG_A=aaaa





`;
const ARGS_B = { envKey: 'test', envVal: 'test', envComment: 'this is a test' };
const OUTPUT_B = `
ARG_A=aaaa
# this is a test
TEST=test
`;

//
// SAMPLE C
//
const INPUT_C = `
TEST=test
TEST=test
TEST=test`;
const ARGS_C = { envKey: 'test', envVal: 'test', envComment: '' };
const ERR_MSG_C = `ENV key "TEST" already exists in .env`;

module.exports.INPUT_A = INPUT_A;
module.exports.ARGS_A = ARGS_A;
module.exports.OUTPUT_A = OUTPUT_A;
module.exports.INPUT_B = INPUT_B;
module.exports.ARGS_B = ARGS_B;
module.exports.OUTPUT_B = OUTPUT_B;
module.exports.INPUT_C = INPUT_C;
module.exports.ARGS_C = ARGS_C;
module.exports.ERR_MSG_C = ERR_MSG_C;
