import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

interface Props extends SvgProps {
  size?: number;
  color?: string;
}

const WIDTH = 16;
const HEIGHT = 17;
const ASPECT_RATIO = HEIGHT / WIDTH;

const SvgPlus: React.FC<Props> = ({
  size = 25,
  color = "#29303D",
  ...props
}) => {
  return (
    <Svg fill="none" width={size} height={size * ASPECT_RATIO} viewBox="0 0 16 17" {...props}>
      <Path
        fill={color}
        d="M8.08.75A7.749 7.749 0 00.33 8.5a7.749 7.749 0 007.75 7.75 7.749 7.749 0 007.75-7.75A7.749 7.749 0 008.08.75zm4.5 8.625a.38.38 0 01-.375.375H9.33v2.875a.38.38 0 01-.375.375h-1.75a.361.361 0 01-.375-.375V9.75H3.955a.361.361 0 01-.375-.375v-1.75a.38.38 0 01.375-.375H6.83V4.375A.38.38 0 017.205 4h1.75c.188 0 .375.188.375.375V7.25h2.875c.188 0 .375.188.375.375v1.75z"
      />
    </Svg>
  );
};

export default SvgPlus;
