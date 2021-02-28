const { updateResStringsXmlWithNewContent } = require('../updateResStringsXml');
const mockResStringsXml = require('./__MOCKS__/mock-res-strings-xml.js');

describe('updateResStringsXmlWithNewContent()', () => {
  const { INPUT_A, OUTPUT_A, INPUT_B, ERR_MSG_B } = mockResStringsXml;
  test('generates correct content for A', () => {
    expect(updateResStringsXmlWithNewContent(INPUT_A)).toEqual(OUTPUT_A);
  });
  test('throws expected error for B', () => {
    expect(() => updateResStringsXmlWithNewContent(INPUT_B)).toThrowError(ERR_MSG_B);
  });
});
