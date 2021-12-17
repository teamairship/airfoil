import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

interface Props extends SvgProps {
  size?: number;
  color?: string;
}

const WIDTH = 24;
const HEIGHT = 24;
const ASPECT_RATIO = HEIGHT / WIDTH;

const SvgSupport: React.FC<Props> = ({ size = 25, color = '#5A55CA', ...props }) => {
  return (
    <Svg fill="none" width={size} height={size * ASPECT_RATIO} viewBox="0 0 24 24" {...props}>
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M5.142 17.486h-.685a2.743 2.743 0 01-2.743-2.743V12a2.743 2.743 0 012.743-2.743h.685a.686.686 0 01.686.686V16.8a.686.686 0 01-.686.686zm14.4 0h-.685a.686.686 0 01-.686-.686V9.943a.686.686 0 01.686-.686h.685A2.743 2.743 0 0122.285 12v2.743a2.743 2.743 0 01-2.743 2.743zM4.457 9.257a7.543 7.543 0 017.542-7.543v0a7.543 7.543 0 017.543 7.543m-4.8 11.657H16.8a2.743 2.743 0 002.743-2.742v-.686"
      />
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M13.371 22.286H12a1.371 1.371 0 010-2.743h1.371a1.371 1.371 0 010 2.743zM9.257 8.571a2.743 2.743 0 015.26-1.089c.2.461.269.969.2 1.467a2.742 2.742 0 01-1.803 2.209A1.371 1.371 0 0012 12.452v.234m0 2.742a.343.343 0 100 .687.343.343 0 000-.686z"
      />
    </Svg>
  );
};

export default SvgSupport;
