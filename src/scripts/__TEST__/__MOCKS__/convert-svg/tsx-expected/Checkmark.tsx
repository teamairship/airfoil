import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

interface Props extends SvgProps {
  size?: number;
  color?: string;
}

const WIDTH = 8;
const HEIGHT = 6;
const ASPECT_RATIO = HEIGHT / WIDTH;

const SvgCheckmark: React.FC<Props> = ({
  size = 25,
  color = "#fff",
  ...props
}) => {
  return (
    <Svg fill="none" width={size} height={size * ASPECT_RATIO} viewBox="0 0 8 6" {...props}>
      <Path stroke={color} strokeLinecap="round" strokeLinejoin="round" d="M1 3l2 2 4-4" />
    </Svg>
  );
};

export default SvgCheckmark;
