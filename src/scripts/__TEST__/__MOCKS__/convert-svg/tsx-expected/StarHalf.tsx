import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

interface Props extends SvgProps {
  size?: number;
  color?: string;
}

const WIDTH = 19;
const HEIGHT = 18;
const ASPECT_RATIO = HEIGHT / WIDTH;

const SvgStarHalf: React.FC<Props> = ({
  size = 25,
  color = "#5A55CA",
  ...props
}) => {
  return (
    <Svg fill="none" width={size} height={size * ASPECT_RATIO} viewBox="0 0 19 18" {...props}>
      <Path
        fill={color}
        fillRule="evenodd"
        d="M10 1.42c-.183-.56-.975-.56-1.158 0l-1.56 4.805a.608.608 0 01-.58.42H1.65c-.589 0-.834.755-.357 1.101l4.087 2.97c.213.155.303.43.221.68L4.04 16.201c-.182.56.46 1.026.936.68l4.087-2.97a.608.608 0 01.716 0l.22.161V1.42z"
        clipRule="evenodd"
      />
      <Path
        stroke={color}
        d="M8.842 1.42c.183-.56.975-.56 1.158 0l1.56 4.805a.61.61 0 00.58.42h5.052c.589 0 .834.755.357 1.101l-4.087 2.97a.608.608 0 00-.221.68l1.561 4.805c.182.56-.46 1.026-.936.68l-4.087-2.97a.608.608 0 00-.716 0l-4.087 2.97c-.477.346-1.118-.12-.936-.68l1.56-4.805a.608.608 0 00-.22-.68l-4.088-2.97c-.477-.346-.232-1.1.357-1.1h5.053c.263 0 .497-.17.578-.42L8.842 1.42z"
      />
    </Svg>
  );
};

export default SvgStarHalf;
