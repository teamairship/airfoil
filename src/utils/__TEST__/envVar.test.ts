const { addEnvVar, addConstant, addAppCenterVar } = require('../envVar');
const mockEnv = require('./__MOCKS__/mock-env.js');
const mockConstants = require('./__MOCKS__/mock-constants.js');
const mockAppcenterBuildScript = require('./__MOCKS__/mock-appcenter-build-script');

describe('addEnvVar()', () => {
  const {
    INPUT_A,
    ARGS_A,
    OUTPUT_A,
    INPUT_B,
    ARGS_B,
    OUTPUT_B,
    INPUT_C,
    ARGS_C,
    ERR_MSG_C,
  } = mockEnv;
  test('generates correct content for A', () => {
    const { envKey, envVal, envComment } = ARGS_A;
    expect(addEnvVar(INPUT_A, envKey, envVal, envComment)).toEqual(OUTPUT_A);
  });
  test('generates correct content for B', () => {
    const { envKey, envVal, envComment } = ARGS_B;
    expect(addEnvVar(INPUT_B, envKey, envVal, envComment)).toEqual(OUTPUT_B);
  });
  test('throws error when expected', () => {
    const { envKey, envVal, envComment } = ARGS_C;
    expect(() => addEnvVar(INPUT_C, envKey, envVal, envComment)).toThrowError(ERR_MSG_C);
  });
});

describe('addConstant()', () => {
  const {
    INPUT_A,
    ARGS_A,
    OUTPUT_A,
    INPUT_B,
    ARGS_B,
    OUTPUT_B,
    INPUT_C,
    ARGS_C,
    ERR_MSG_C,
  } = mockConstants;
  test('generates correct content for A', () => {
    const { envKey, envComment } = ARGS_A;
    expect(addConstant(INPUT_A, envKey, envComment)).toEqual(OUTPUT_A);
  });
  test('generates correct content for B', () => {
    const { envKey, envComment } = ARGS_B;
    expect(addConstant(INPUT_B, envKey, envComment)).toEqual(OUTPUT_B);
  });
  test('throws error when expected', () => {
    const { envKey, envComment } = ARGS_C;
    expect(() => addConstant(INPUT_C, envKey, envComment)).toThrowError(ERR_MSG_C);
  });
});

describe('addAppCenterVar()', () => {
  // prettier-ignore
  const {
    INPUT_A, ARGS_A, OUTPUT_A,
    INPUT_B, ARGS_B, OUTPUT_B,
    INPUT_C, ARGS_C, OUTPUT_C,
    INPUT_D, ARGS_D, OUTPUT_D,
    INPUT_E, ARGS_E, ERR_MSG_E,
    INPUT_F, ARGS_F, OUTPUT_F,
    INPUT_G, ARGS_G, ERR_MSG_G,
  } = mockAppcenterBuildScript;
  test('generates correct content for A', () => {
    const { envKey } = ARGS_A;
    expect(addAppCenterVar(INPUT_A, envKey)).toEqual(OUTPUT_A);
  });
  test('generates correct content for B', () => {
    const { envKey } = ARGS_B;
    expect(addAppCenterVar(INPUT_B, envKey)).toEqual(OUTPUT_B);
  });
  test('generates correct content for C', () => {
    const { envKey } = ARGS_C;
    expect(addAppCenterVar(INPUT_C, envKey)).toEqual(OUTPUT_C);
  });
  test('generates correct content for D', () => {
    const { envKey } = ARGS_D;
    expect(addAppCenterVar(INPUT_D, envKey)).toEqual(OUTPUT_D);
  });
  test('throws error when expected for E', () => {
    const { envKey } = ARGS_E;
    expect(() => addAppCenterVar(INPUT_E, envKey)).toThrowError(ERR_MSG_E);
  });
  test('generates correct content for F', () => {
    const { envKey } = ARGS_F;
    expect(addAppCenterVar(INPUT_F, envKey)).toEqual(OUTPUT_F);
  });
  test('throws error when expected for G', () => {
    const { envKey } = ARGS_G;
    expect(() => addAppCenterVar(INPUT_G, envKey)).toThrowError(ERR_MSG_G);
  });
});
