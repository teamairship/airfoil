import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const SvgCheckmark = (props: SvgProps) => {
  return (
    <Svg fill="none" viewBox="0 0 8 6" {...props}>
      <Path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" d="M1 3l2 2 4-4" />
    </Svg>
  );
};

export default SvgCheckmark;
