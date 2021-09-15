import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const SvgTimes = (props: SvgProps) => {
  return (
    <Svg fill="none" viewBox="0 0 17 17" {...props}>
      <Path stroke="#fff" strokeLinecap="round" strokeWidth={2} d="M1 15.5L15.5 1M1 1.5L15.5 16" />
    </Svg>
  );
};

export default SvgTimes;
