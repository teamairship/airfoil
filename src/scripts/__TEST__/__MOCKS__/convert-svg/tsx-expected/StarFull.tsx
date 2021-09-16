import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

interface Props extends SvgProps {
  size?: number;
  color?: string;
}

const WIDTH = 19;
const HEIGHT = 18;
const ASPECT_RATIO = HEIGHT / WIDTH;

const SvgStarFull: React.FC<Props> = ({
  size = 25,
  color = "#5A55CA",
  ...props
}) => {
  return (
    <Svg fill="none" width={size} height={size * ASPECT_RATIO} viewBox="0 0 19 18" {...props}>
      <Path
        fill={color}
        d="M9.082 1.42c.182-.56.975-.56 1.157 0L11.8 6.225a.61.61 0 00.58.42h5.051c.59 0 .835.755.358 1.101l-4.087 2.97a.608.608 0 00-.221.68l1.56 4.805c.183.56-.459 1.026-.935.68l-4.088-2.97a.608.608 0 00-.715 0l-4.087 2.97c-.477.346-1.118-.12-.936-.68l1.56-4.805a.608.608 0 00-.22-.68l-4.087-2.97c-.477-.346-.232-1.1.357-1.1h5.052c.264 0 .498-.17.579-.42L9.082 1.42z"
      />
      <Path
        stroke={color}
        d="M9.082 1.42c.182-.56.975-.56 1.157 0L11.8 6.225a.61.61 0 00.58.42h5.051c.59 0 .835.755.358 1.101l-4.087 2.97a.608.608 0 00-.221.68l1.56 4.805c.183.56-.459 1.026-.935.68l-4.088-2.97a.608.608 0 00-.715 0l-4.087 2.97c-.477.346-1.118-.12-.936-.68l1.56-4.805a.608.608 0 00-.22-.68l-4.087-2.97c-.477-.346-.232-1.1.357-1.1h5.052c.264 0 .498-.17.579-.42L9.082 1.42z"
      />
    </Svg>
  );
};

export default SvgStarFull;
