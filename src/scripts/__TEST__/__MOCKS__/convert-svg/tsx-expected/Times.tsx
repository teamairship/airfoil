import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

interface Props extends SvgProps {
  size?: number;
  color?: string;
}

const WIDTH = 17;
const HEIGHT = 17;
const ASPECT_RATIO = HEIGHT / WIDTH;

const SvgTimes: React.FC<Props> = ({
  size = 25,
  color = "#fff",
  ...props
}) => {
  return (
    <Svg fill="none" width={size} height={size * ASPECT_RATIO} viewBox="0 0 17 17" {...props}>
      <Path stroke={color} strokeLinecap="round" strokeWidth={2} d="M1 15.5L15.5 1M1 1.5L15.5 16" />
    </Svg>
  );
};

export default SvgTimes;
