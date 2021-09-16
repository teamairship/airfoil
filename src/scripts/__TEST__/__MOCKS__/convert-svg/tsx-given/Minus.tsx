import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const SvgMinus = (props: SvgProps) => {
  return (
    <Svg fill="none" viewBox="0 0 10 4" {...props}>
      <Path
        stroke="#5A55CA"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={3}
        d="M2 2h6"
      />
    </Svg>
  );
};

export default SvgMinus;
