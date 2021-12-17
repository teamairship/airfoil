import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

interface Props extends SvgProps {
  size?: number;
  color?: string;
}

const WIDTH = 22;
const HEIGHT = 21;
const ASPECT_RATIO = HEIGHT / WIDTH;

const SvgHome: React.FC<Props> = ({
  size = 25,
  color = "#5A55CA",
  ...props
}) => {
  return (
    <Svg fill="none" width={size} height={size * ASPECT_RATIO} viewBox="0 0 22 21" {...props}>
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3.917 11v7.5a.833.833 0 00.833.833H8.5a.417.417 0 00.416-.416v-3.334a2.083 2.083 0 014.167 0v3.334a.417.417 0 00.417.416h3.75a.834.834 0 00.833-.833v-7.083m-16.666-.834L11 1l9.583 9.583"
      />
    </Svg>
  );
};

export default SvgHome;
