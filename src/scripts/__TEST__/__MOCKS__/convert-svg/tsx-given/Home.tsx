import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const SvgHome = (props: SvgProps) => {
  return (
    <Svg fill="none" viewBox="0 0 22 21" {...props}>
      <Path
        stroke="#5A55CA"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3.917 11v7.5a.833.833 0 00.833.833H8.5a.417.417 0 00.416-.416v-3.334a2.083 2.083 0 014.167 0v3.334a.417.417 0 00.417.416h3.75a.834.834 0 00.833-.833v-7.083m-16.666-.834L11 1l9.583 9.583"
      />
    </Svg>
  );
};

export default SvgHome;
