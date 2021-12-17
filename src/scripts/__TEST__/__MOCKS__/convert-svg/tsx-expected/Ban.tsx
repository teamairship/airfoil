import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

interface Props extends SvgProps {
  size?: number;
  color?: string;
}

const WIDTH = 22;
const HEIGHT = 23;
const ASPECT_RATIO = HEIGHT / WIDTH;

const SvgBan: React.FC<Props> = ({ size = 25, color = '#E62C37', ...props }) => {
  return (
    <Svg fill="none" width={size} height={size * ASPECT_RATIO} viewBox="0 0 22 23" {...props}>
      <Path
        fill={color}
        d="M11 .5C4.923.5 0 5.468 0 11.5c0 6.077 4.923 11 11 11 6.032 0 11-4.923 11-11 0-6.032-4.968-11-11-11zm5.766 5.234c2.883 2.927 3.105 7.363.887 10.468L6.298 4.847c3.105-2.218 7.54-1.996 10.468.887zM5.19 17.31c-2.884-2.928-3.105-7.363-.888-10.468l11.355 11.355c-3.105 2.217-7.54 1.995-10.467-.887z"
      />
    </Svg>
  );
};

export default SvgBan;
