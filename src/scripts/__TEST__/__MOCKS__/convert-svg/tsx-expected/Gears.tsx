import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

interface Props extends SvgProps {
  size?: number;
  color?: string;
}

const WIDTH = 24;
const HEIGHT = 24;
const ASPECT_RATIO = HEIGHT / WIDTH;

const SvgGears: React.FC<Props> = ({ size = 25, color = '#5A55CA', ...props }) => {
  return (
    <Svg fill="none" width={size} height={size * ASPECT_RATIO} viewBox="0 0 24 24" {...props}>
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M10.67 3.255a1.789 1.789 0 002.66 0l.865-.95a1.792 1.792 0 013.12 1.293l-.066 1.28a1.793 1.793 0 001.876 1.88l1.281-.065a1.791 1.791 0 011.29 3.12l-.953.86a1.793 1.793 0 000 2.66l.953.86a1.792 1.792 0 01-1.293 3.12l-1.28-.065a1.792 1.792 0 00-1.881 1.88l.065 1.282a1.792 1.792 0 01-3.112 1.29l-.86-.953a1.792 1.792 0 00-2.66 0l-.865.953a1.792 1.792 0 01-3.115-1.288l.065-1.281a1.792 1.792 0 00-1.88-1.881l-1.28.065a1.79 1.79 0 01-1.296-3.117l.952-.86a1.793 1.793 0 000-2.661l-.952-.865a1.791 1.791 0 011.289-3.116l1.28.065a1.79 1.79 0 001.883-1.884l-.061-1.282a1.792 1.792 0 013.115-1.29l.86.95z"
      />
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M7.883 12.003a4.117 4.117 0 108.234 0 4.117 4.117 0 00-8.234 0v0z"
      />
    </Svg>
  );
};

export default SvgGears;
