import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

interface Props extends SvgProps {
  size?: number;
  color?: string;
}

const WIDTH = 16;
const HEIGHT = 16;
const ASPECT_RATIO = HEIGHT / WIDTH;

const SvgClock: React.FC<Props> = ({
  size = 25,
  color = "#5A55CA",
  ...props
}) => {
  return (
    <Svg fill="none" width={size} height={size * ASPECT_RATIO} viewBox="0 0 16 16" {...props}>
      <Path
        fill={color}
        d="M7.75.285A7.749 7.749 0 000 8.035a7.749 7.749 0 007.75 7.75 7.749 7.749 0 007.75-7.75A7.749 7.749 0 007.75.285zm1.781 10.969L6.75 9.223c-.094-.063-.125-.157-.125-.282v-5.28A.38.38 0 017 3.284h1.5c.188 0 .375.188.375.375v4.313l1.969 1.437c.156.125.219.375.094.531l-.907 1.22c-.094.155-.344.187-.5.093z"
      />
    </Svg>
  );
};

export default SvgClock;
