import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

interface Props extends SvgProps {
  size?: number;
  color?: string;
}

const WIDTH = 8;
const HEIGHT = 9;
const ASPECT_RATIO = HEIGHT / WIDTH;

const SvgClose: React.FC<Props> = ({ size = 25, color = '#5A55CA', ...props }) => {
  return (
    <Svg fill="none" width={size} height={size * ASPECT_RATIO} viewBox="0 0 8 9" {...props}>
      <Path
        fill={color}
        d="M4.863 4.488L7.395 1.98a.397.397 0 000-.539L6.809.855a.397.397 0 00-.54 0L3.763 3.387 1.23.855a.397.397 0 00-.539 0l-.586.586a.397.397 0 000 .54l2.532 2.507L.105 7.02a.397.397 0 000 .539l.586.586a.4.4 0 00.54 0l2.53-2.532L6.27 8.145c.14.14.398.14.539 0l.586-.586a.397.397 0 000-.54L4.863 4.49z"
      />
    </Svg>
  );
};

export default SvgClose;
