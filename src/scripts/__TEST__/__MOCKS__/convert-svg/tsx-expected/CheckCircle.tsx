import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

interface Props extends SvgProps {
  size?: number;
  color?: string;
}

const WIDTH = 16;
const HEIGHT = 16;
const ASPECT_RATIO = HEIGHT / WIDTH;

const SvgCheckCircle: React.FC<Props> = ({
  size = 25,
  color = "#5A55CA",
  ...props
}) => {
  return (
    <Svg fill="none" width={size} height={size * ASPECT_RATIO} viewBox="0 0 16 16" {...props}>
      <Path
        fill={color}
        d="M15.5 8.035c0-4.25-3.5-7.75-7.75-7.75C3.469.285 0 3.785 0 8.035a7.749 7.749 0 007.75 7.75c4.25 0 7.75-3.469 7.75-7.75zM6.844 12.16a.53.53 0 01-.719 0l-3.25-3.25a.53.53 0 010-.719l.719-.687a.442.442 0 01.687 0L6.5 9.69l4.688-4.687a.442.442 0 01.687 0l.719.687a.53.53 0 010 .72l-5.75 5.75z"
      />
    </Svg>
  );
};

export default SvgCheckCircle;
