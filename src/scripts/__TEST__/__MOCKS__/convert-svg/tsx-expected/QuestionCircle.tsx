import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

interface Props extends SvgProps {
  size?: number;
  color?: string;
}

const WIDTH = 140;
const HEIGHT = 140;
const ASPECT_RATIO = HEIGHT / WIDTH;

const SvgQuestionCircle: React.FC<Props> = ({
  size = 25,
  color = "#000",
  ...props
}) => {
  return (
    <Svg fill="none" width={size} height={size * ASPECT_RATIO} viewBox="0 0 140 140" {...props}>
      <Path
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={10}
        d="M5 70a65 65 0 10130 0A65 65 0 105 70z"
      />
      <Path
        fill="none"
        stroke={color}
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
