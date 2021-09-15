import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const SvgQuestionCircle = (props: SvgProps) => {
  return (
    <Svg viewBox="0 0 140 140" {...props}>
      <Path
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={10}
        d="M5 70a65 65 0 10130 0A65 65 0 105 70z"
      />
      <Path
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={10}
        d="M55 55a15 15 0 1115 15v10"
      />
      <Path d="M70 93.32a5.84 5.84 0 105.84 5.84A5.85 5.85 0 0070 93.32z" />
    </Svg>
  );
};

export default SvgQuestionCircle;
