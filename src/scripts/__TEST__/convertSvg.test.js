const { run } = require('../../cli');
const {
  __test__parseViewBox,
  __test__onProcessConvertedTsxFile,
  test_getComponentName,
} = require('../convertSvg');
const { SVG_A, SVG_B } = require('./__MOCKS__/mock-svg');

describe('convertSvg script', () => {
  test('correctly parses viewbox from svg A', () => {
    const viewBox = __test__parseViewBox(SVG_A);
    const expected = { minX: 0, minY: 0, width: 15.326, height: 17.495 };
    expect(viewBox).toEqual(expected);
  });

  test('correctly parses viewbox from svg B', () => {
    const viewBox = __test__parseViewBox(SVG_B);
    const expected = { minX: 0, minY: 0, width: 22, height: 21 };
    expect(viewBox).toEqual(expected);
  });

  /**
   * The following test checks all files contained in ./__MOCKS__/convert-svg.
   * ./__MOCKS__/convert-svg/tsx-given => files representing input content for the `onProcessConvertedTsxFile` function
   * ./__MOCKS__/convert-svg/tsx-expected => the expected result of what the content should be after `onProcessConvertedTsxFile()`
   */
  test('onProcessConvertedTsxFile() processes all .tsx files correctly', async () => {
    const toolbox = await run('');
    const { filesystem } = toolbox;
    const { path } = filesystem;
    // prettier-ignore
    const tsxFilesGivenPath = path(toolbox.meta.src, 'scripts/__TEST__/__MOCKS__/convert-svg/tsx-given');
    // prettier-ignore
    const tsxFilesExpectedPath = path(toolbox.meta.src, 'scripts/__TEST__/__MOCKS__/convert-svg/tsx-expected');
    const filesGiven = filesystem.list(tsxFilesGivenPath);
    const filesExpected = filesystem.list(tsxFilesExpectedPath);
    // just some sanity checks
    expect(filesGiven).toBeDefined();
    expect(filesExpected).toBeDefined();
    expect(filesGiven.length).toBeGreaterThan(0);
    expect(filesExpected.length).toBeGreaterThan(0);
    for (let i = 0; i < filesGiven.length; i++) {
      const tsxFileGiven = filesGiven[i];
      expect(filesExpected).toContain(tsxFileGiven);
      const tsxFileExpected = filesExpected.find(expected => expected === tsxFileGiven);
      expect(tsxFileExpected).toBeTruthy();
      const tsxPathGiven = path(tsxFilesGivenPath, tsxFileGiven);
      const tsxPathExpected = path(tsxFilesExpectedPath, tsxFileExpected);
      const contentGiven = filesystem.read(tsxPathGiven);
      const contentExpected = filesystem.read(tsxPathExpected);
      const componentName = test_getComponentName(tsxPathGiven);
      let processed;
      try {
        processed = await __test__onProcessConvertedTsxFile(
          contentGiven,
          componentName,
          toolbox.template.generate,
        );
      } catch (err) {
        console.error(`onProcessConvertedTsxFile() failed for ${tsxPathGiven}`);
        throw err;
      }
      // here we wrap `expect` in a try-catch so that we can log out additional information if a test fails (i.e. which `.tsx` file caused the test to fail)
      try {
        expect(processed).toEqual(contentExpected);
      } catch (err) {
        console.error(`Processing failed for TSX file: ${tsxFileGiven}`);
        console.error(`Full path: ${tsxPathGiven}`);
        throw err;
      }
    }
  });
});
