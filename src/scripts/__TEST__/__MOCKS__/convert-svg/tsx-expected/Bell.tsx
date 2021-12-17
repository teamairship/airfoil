import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

interface Props extends SvgProps {
  size?: number;
  color?: string;
}

const WIDTH = 22;
const HEIGHT = 22;
const ASPECT_RATIO = HEIGHT / WIDTH;

const SvgBell: React.FC<Props> = ({
  size = 25,
  color = "#4163FF",
  ...props
}) => {
  return (
    <Svg fill="none" width={size} height={size * ASPECT_RATIO} viewBox="0 0 22 22" {...props}>
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M18.084 15.583v-5.416a7.084 7.084 0 00-4.618-6.633 2.5 2.5 0 00-4.935 0 7.078 7.078 0 00-4.614 6.633v5.416a2.5 2.5 0 01-2.5 2.5h19.167a2.5 2.5 0 01-2.5-2.5zm-4.584 2.5a2.5 2.5 0 01-5 0"
      />
    </Svg>
  );
};

export default SvgBell;
