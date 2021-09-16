import * as React from 'react';
import Svg, { SvgProps, G, Path } from 'react-native-svg';

interface Props extends SvgProps {
  size?: number;
  color?: string;
}

const WIDTH = 140;
const HEIGHT = 140;
const ASPECT_RATIO = HEIGHT / WIDTH;

const SvgAlertTriangle: React.FC<Props> = ({
  size = 25,
  color = "#000",
  ...props
}) => {
  return (
    <Svg fill="none" width={size} height={size * ASPECT_RATIO} viewBox="0 0 140 140" {...props}>
      {'\n  ,,\n  '}
      <G fill="none" stroke={color} strokeLinecap="round" strokeWidth={8.75}>
        <Path
          strokeLinejoin="round"
          d="M70 109.375a2.188 2.188 0 102.188 2.188A2.188 2.188 0 0070 109.374h0"
        />
        <Path d="M70 91.875v-43.75" />
        <Path
          strokeLinejoin="round"
          d="M79.456 10.267a10.535 10.535 0 00-18.912 0L5.285 122.838a8.872 8.872 0 007.968 12.787h113.494a8.872 8.872 0 007.968-12.787z"
        />
      </G>
    </Svg>
  );
};

export default SvgAlertTriangle;
