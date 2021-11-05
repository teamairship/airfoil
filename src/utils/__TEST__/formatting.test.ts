import { decodeHtmlEntities } from '../formatting';

describe('decodeHtmlEntities()', () => {
  test('decodes text A correctly', () => {
    expect(decodeHtmlEntities('&#34;&lt;some &amp; text&gt;&#34;')).toEqual('"<some & text>"');
  });
  test('generates correct content for B', () => {
    // prettier-ignore
    expect(decodeHtmlEntities('What is the issue that we&#39;re seeing that is motivating this decision or change?'))
      .toEqual('What is the issue that we\'re seeing that is motivating this decision or change?');
  });
  test('generates correct content for C', () => {
    // prettier-ignore
    expect(decodeHtmlEntities('What is the change that we&#39;re proposing and/or doing?'))
      .toEqual('What is the change that we\'re proposing and/or doing?');
  });
  test('generates correct content for D', () => {
    // prettier-ignore
    expect(decodeHtmlEntities('we&#39;re seeing (some strange stuff) and some other &lt;items&gt; go for a big &#34;trade&#34;. What do you propose? [this is a link](https://google.com)'))
      .toEqual('we\'re seeing (some strange stuff) and some other <items> go for a big "trade". What do you propose? [this is a link](https://google.com)');
  });
  test('returns string for garbage input', () => {
    expect(decodeHtmlEntities(null)).toEqual('');
    expect(decodeHtmlEntities(undefined)).toEqual('');
    // @ts-ignore
    expect(decodeHtmlEntities(12345)).toEqual('');
  });
});
