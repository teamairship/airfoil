import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

interface Props extends SvgProps {
  size?: number;
  color?: string;
}

const WIDTH = 24;
const HEIGHT = 24;
const ASPECT_RATIO = HEIGHT / WIDTH;

const SvgProfile: React.FC<Props> = ({
  size = 25,
  color = "#5A55CA",
  ...props
}) => {
  return (
    <Svg fill="none" width={size} height={size * ASPECT_RATIO} viewBox="0 0 24 24" {...props}>
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M7.863 7.506A7.964 7.964 0 0013.6 9.943c1.084 0 2.157-.22 3.154-.649"
      />
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M7.2 9.943a4.8 4.8 0 109.599 0 4.8 4.8 0 00-9.6 0v0zm11.12 10.173a8.911 8.911 0 00-12.64 0"
      />
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M1.715 12a10.286 10.286 0 1020.572 0 10.286 10.286 0 00-20.572 0v0z"
      />
    </Svg>
  );
};

export default SvgProfile;
