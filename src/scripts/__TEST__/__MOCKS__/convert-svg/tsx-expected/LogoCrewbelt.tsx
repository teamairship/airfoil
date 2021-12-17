import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

interface Props extends SvgProps {
  size?: number;
  color1?: string;
  color2?: string;
}

const WIDTH = 50;
const HEIGHT = 33;
const ASPECT_RATIO = HEIGHT / WIDTH;

const SvgLogoCrewbelt: React.FC<Props> = ({
  size = 25,
  color1 = '#4164FF',
  color2 = '#323232',
  ...props
}) => {
  return (
    <Svg fill="none" width={size} height={size * ASPECT_RATIO} viewBox="0 0 50 33" {...props}>
      <Path
        fill={color1}
        d="M25 33h11.653c4.065 0 7.707-1.84 10.149-4.743A13.541 13.541 0 0050 19.477c0-7.473-5.972-13.523-13.347-13.523h-5.277V0H25v11.988h11.254c4.086 0 7.391 3.348 7.391 7.489 0 1.85-.67 3.561-1.776 4.87a7.343 7.343 0 01-5.615 2.618H25V33z"
      />
      <Path
        fill={color2}
        d="M25 .082L13.347 0C9.282 0 5.64 1.837 3.198 4.735A13.504 13.504 0 000 13.5C0 20.96 5.972 27 13.347 27H25v-6.024H13.746c-4.086 0-7.391-3.342-7.391-7.476 0-1.847.67-3.555 1.776-4.862a7.348 7.348 0 015.615-2.614H25V.082z"
      />
    </Svg>
  );
};

export default SvgLogoCrewbelt;
