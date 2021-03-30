const fns = require('../updateAppDelegate');
const mockSplashscreenImports = require('./__MOCKS__/mock-app-delegate-imports.js');
const mockSplashscreenDidFinish = require('./__MOCKS__/mock-app-delegate-did-finish-launching-method.js');

describe('updateAppDelegateImports()', () => {
  const { updateAppDelegateImports } = fns;
  const {
    INPUT_A,
    OUTPUT_A,
    INPUT_B,
    OUTPUT_B,
    INPUT_C,
    OUTPUT_C,
    INPUT_D,
    ERR_MSG_D,
  } = mockSplashscreenImports;
  test('generates correct content for A', () => {
    expect(updateAppDelegateImports(INPUT_A)).toEqual(OUTPUT_A);
  });
  test('generates correct content for B', () => {
    expect(updateAppDelegateImports(INPUT_B)).toEqual(OUTPUT_B);
  });
  test('generates correct content for C', () => {
    expect(updateAppDelegateImports(INPUT_C)).toEqual(OUTPUT_C);
  });
  test('throws expected error for D', () => {
    expect(() => updateAppDelegateImports(INPUT_D)).toThrowError(ERR_MSG_D);
  });
});

describe('updateAppDelegateDidFinishLaunchingWithOptions()', () => {
  const { updateAppDelegateDidFinishLaunchingWithOptions } = fns;
  const {
    INPUT_A,
    OUTPUT_A,
    INPUT_B,
    OUTPUT_B,
    INPUT_C,
    OUTPUT_C,
    INPUT_D,
    OUTPUT_D,
    INPUT_E,
    ERR_MSG_E,
  } = mockSplashscreenDidFinish;
  test('generates correct content for A', () => {
    expect(updateAppDelegateDidFinishLaunchingWithOptions(INPUT_A)).toEqual(OUTPUT_A);
  });
  test('generates correct content for B', () => {
    expect(updateAppDelegateDidFinishLaunchingWithOptions(INPUT_B)).toEqual(OUTPUT_B);
  });
  test('generates correct content for C', () => {
    expect(updateAppDelegateDidFinishLaunchingWithOptions(INPUT_C)).toEqual(OUTPUT_C);
  });
  test('generates correct content for D', () => {
    expect(updateAppDelegateDidFinishLaunchingWithOptions(INPUT_D)).toEqual(OUTPUT_D);
  });
  test('throws expected error for E', () => {
    expect(() => updateAppDelegateDidFinishLaunchingWithOptions(INPUT_E)).toThrowError(ERR_MSG_E);
  });
});
