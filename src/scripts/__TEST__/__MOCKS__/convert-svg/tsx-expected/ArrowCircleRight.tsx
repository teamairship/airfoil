import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

interface Props extends SvgProps {
  size?: number;
  color?: string;
}

const WIDTH = 24;
const HEIGHT = 24;
const ASPECT_RATIO = HEIGHT / WIDTH;

const SvgArrowCircleRight: React.FC<Props> = ({ size = 25, color = '#5A55CA', ...props }) => {
  return (
    <Svg fill="none" width={size} height={size * ASPECT_RATIO} viewBox="0 0 24 24" {...props}>
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M1.714 12h14.033m-3.634 3.673L15.747 12l-3.634-3.674"
      />
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M2.96 16.502a10.23 10.23 0 004.72 4.758 10.077 10.077 0 006.621.784 10.16 10.16 0 005.68-3.527 10.353 10.353 0 002.302-6.324 10.36 10.36 0 00-2.065-6.407 10.17 10.17 0 00-5.546-3.74 10.075 10.075 0 00-6.645.532 10.219 10.219 0 00-4.894 4.577"
      />
    </Svg>
  );
};

export default SvgArrowCircleRight;
