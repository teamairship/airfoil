import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

interface Props extends SvgProps {
  size?: number;
  color?: string;
}

const WIDTH = 16;
const HEIGHT = 18;
const ASPECT_RATIO = HEIGHT / WIDTH;

const SvgArrowToTop: React.FC<Props> = ({
  size = 25,
  color = "#797889",
  ...props
}) => {
  return (
    <Svg fill="none" width={size} height={size * ASPECT_RATIO} viewBox="0 0 16 18" {...props}>
      <Path
        fill={color}
        d="M1 0C.417 0 0 .442 0 .964v.965c0 .562.417.964 1 .964h14c.542 0 1-.402 1-.964V.964C16 .442 15.542 0 15 0H1zm2.75 11.29L6.5 8.638v8.398c0 .562.417.964 1 .964h1c.542 0 1-.402 1-.964V8.638l2.708 2.652c.417.362 1.042.362 1.417 0l.708-.683a.97.97 0 000-1.366L8.708 3.817c-.416-.402-1.041-.402-1.416 0L1.625 9.241a.97.97 0 000 1.366l.708.683c.375.362 1.042.362 1.417 0z"
      />
    </Svg>
  );
};

export default SvgArrowToTop;
