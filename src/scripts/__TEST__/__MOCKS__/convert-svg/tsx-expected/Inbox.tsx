import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

interface Props extends SvgProps {
  size?: number;
  color?: string;
}

const WIDTH = 140;
const HEIGHT = 140;
const ASPECT_RATIO = HEIGHT / WIDTH;

const SvgInbox: React.FC<Props> = ({ size = 25, color = '#000', ...props }) => {
  return (
    <Svg fill="none" width={size} height={size * ASPECT_RATIO} viewBox="0 0 140 140" {...props}>
      <Path
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={5.83}
        d="M137.083 102.083a5.833 5.833 0 01-5.833 5.834H8.75a5.833 5.833 0 01-5.833-5.834v-35H43.75v5.834a11.702 11.702 0 0011.667 11.666h29.166A11.702 11.702 0 0096.25 72.917v-5.834h40.833zm-134.166-35L21.647 35a5.833 5.833 0 015.035-2.917h86.636A5.833 5.833 0 01118.352 35l18.731 32.083"
      />
    </Svg>
  );
};

export default SvgInbox;
