const { __test__parseViewBox } = require('../convertSvg');
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
});
