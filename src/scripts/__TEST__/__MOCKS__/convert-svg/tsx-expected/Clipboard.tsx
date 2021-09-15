import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

interface Props extends SvgProps {
  size?: number;
  color?: string;
}

const WIDTH = 19;
const HEIGHT = 24;
const ASPECT_RATIO = HEIGHT / WIDTH;

const SvgClipboard: React.FC<Props> = ({
  size = 25,
  color = "#5A55CA",
  ...props
}) => {
  return (
    <Svg fill="none" width={size} height={size * ASPECT_RATIO} viewBox="0 0 19 24" {...props}>
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M5.114 10.629h8.228m-8.228 3.428h8.228m-8.228 3.429h8.228m-.685-12.343h3.429a1.372 1.372 0 011.371 1.371v14.4a1.372 1.372 0 01-1.371 1.372H2.37A1.371 1.371 0 011 20.914v-14.4a1.371 1.371 0 011.371-1.371H5.8a3.429 3.429 0 116.857 0v0z"
      />
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9.23 4.457a.343.343 0 110 .686.343.343 0 010-.686"
      />
    </Svg>
  );
};

export default SvgClipboard;
