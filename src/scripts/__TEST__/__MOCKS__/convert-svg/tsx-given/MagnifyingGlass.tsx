import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const SvgMagnifyingGlass = (props: SvgProps) => {
  return (
    <Svg viewBox="0 0 140 140" {...props}>
      <Path d="M136.582 120.114l-27.096-27.096a59.827 59.827 0 10-16.497 16.503l27.096 27.09a11.812 11.812 0 0016.497 0 11.667 11.667 0 000-16.497zM59.792 17.53A42.292 42.292 0 1117.5 59.821a42.338 42.338 0 0142.292-42.292z" />
    </Svg>
  );
};

export default SvgMagnifyingGlass;
