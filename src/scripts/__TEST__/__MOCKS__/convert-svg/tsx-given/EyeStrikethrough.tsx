import * as React from 'react';
import Svg, { SvgProps, G, Path } from 'react-native-svg';

const SvgEyeStrikethrough = (props: SvgProps) => {
  return (
    <Svg viewBox="0 0 140 140" {...props}>
      <G fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={8.75}>
        <Path d="M16.234 122.5l109.375-105M52.29 111.13A58.246 58.246 0 0070 113.75c23.917.402 48.172-16.41 63.14-32.883a9.7 9.7 0 000-12.985A119.98 119.98 0 00115.208 51.8M84.076 36.645A55.702 55.702 0 0070 35c-23.514-.39-47.833 16.053-63.122 32.87a9.7 9.7 0 000 12.986 121.333 121.333 0 0015.166 14m26.081-20.481A21.87 21.87 0 0170 52.5" />
        <Path d="M91.875 74.37h0A21.875 21.875 0 0170 96.25" />
      </G>
    </Svg>
  );
};

export default SvgEyeStrikethrough;
