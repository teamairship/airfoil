import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

interface Props extends SvgProps {
  size?: number;
  color?: string;
}

const WIDTH = 14;
const HEIGHT = 16;
const ASPECT_RATIO = HEIGHT / WIDTH;

const SvgCalendarAltSolid: React.FC<Props> = ({ size = 25, color = '#5A55CA', ...props }) => {
  return (
    <Svg fill="none" width={size} height={size * ASPECT_RATIO} viewBox="0 0 14 16" {...props}>
      <Path
        fill={color}
        d="M0 14.5c0 .844.656 1.5 1.5 1.5h11a1.5 1.5 0 001.5-1.5V6H0v8.5zm10-6.125A.38.38 0 0110.375 8h1.25c.188 0 .375.188.375.375v1.25a.38.38 0 01-.375.375h-1.25A.361.361 0 0110 9.625v-1.25zm0 4a.38.38 0 01.375-.375h1.25c.188 0 .375.188.375.375v1.25a.38.38 0 01-.375.375h-1.25a.361.361 0 01-.375-.375v-1.25zm-4-4A.38.38 0 016.375 8h1.25c.188 0 .375.188.375.375v1.25a.38.38 0 01-.375.375h-1.25A.361.361 0 016 9.625v-1.25zm0 4A.38.38 0 016.375 12h1.25c.188 0 .375.188.375.375v1.25a.38.38 0 01-.375.375h-1.25A.361.361 0 016 13.625v-1.25zm-4-4A.38.38 0 012.375 8h1.25c.188 0 .375.188.375.375v1.25a.38.38 0 01-.375.375h-1.25A.361.361 0 012 9.625v-1.25zm0 4A.38.38 0 012.375 12h1.25c.188 0 .375.188.375.375v1.25a.38.38 0 01-.375.375h-1.25A.361.361 0 012 13.625v-1.25zM12.5 2H11V.5c0-.25-.25-.5-.5-.5h-1c-.281 0-.5.25-.5.5V2H5V.5c0-.25-.25-.5-.5-.5h-1c-.281 0-.5.25-.5.5V2H1.5A1.5 1.5 0 000 3.5V5h14V3.5c0-.813-.688-1.5-1.5-1.5z"
      />
    </Svg>
  );
};

export default SvgCalendarAltSolid;
