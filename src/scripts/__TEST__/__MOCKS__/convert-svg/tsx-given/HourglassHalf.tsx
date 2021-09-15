import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const SvgHourglassHalf = (props: SvgProps) => {
  return (
    <Svg fill="none" viewBox="0 0 12 16" {...props}>
      <Path
        fill="#5A55CA"
        d="M11.25 0H.75A.74.74 0 000 .75v.5c0 .438.313.75.75.75 0 2.844 1.594 5.25 3.75 6-2.156.781-3.75 3.188-3.75 6a.74.74 0 00-.75.75v.5c0 .438.313.75.75.75h10.5a.74.74 0 00.75-.75v-.5a.76.76 0 00-.75-.75c0-2.813-1.625-5.219-3.781-6 2.156-.75 3.781-3.156 3.781-6a.74.74 0 00.75-.75v-.5a.76.76 0 00-.75-.75zM8.875 12H3.094C3.625 10.562 4.719 9.5 6 9.5c1.25 0 2.344 1.063 2.875 2.5zm0-8H3.094c-.25-.594-.344-1.281-.344-2h6.5c0 .719-.125 1.406-.375 2z"
      />
    </Svg>
  );
};

export default SvgHourglassHalf;
