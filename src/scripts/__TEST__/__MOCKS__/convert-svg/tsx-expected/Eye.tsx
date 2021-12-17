import * as React from 'react';
import Svg, { SvgProps, G, Path } from 'react-native-svg';

interface Props extends SvgProps {
  size?: number;
  color?: string;
}

const WIDTH = 140;
const HEIGHT = 140;
const ASPECT_RATIO = HEIGHT / WIDTH;

const SvgEye: React.FC<Props> = ({ size = 25, color = '#16caca', ...props }) => {
  return (
    <Svg fill="none" width={size} height={size * ASPECT_RATIO} viewBox="0 0 140 140" {...props}>
      <G fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth={8.75}>
        <Path d="M70 30.63c-23.514-.396-47.833 16.037-63.122 32.866a9.7 9.7 0 000 12.985C21.834 92.954 46.083 109.766 70 109.363c23.917.403 48.172-16.409 63.14-32.882a9.7 9.7 0 000-12.985C117.833 46.666 93.514 30.234 70 30.63z" />
        <Path d="M91.875 70A21.875 21.875 0 1170 48.12 21.87 21.87 0 0191.875 70z" />
      </G>
    </Svg>
  );
};

export default SvgEye;
