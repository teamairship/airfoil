import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const SvgMagnifyingGlassSolid = (props: SvgProps) => {
  return (
    <Svg viewBox="0 0 140 140" {...props}>
      <Path d="M136.634 120.167l-29.528-29.89a58.275 58.275 0 10-16.41 16.59l29.336 29.703a11.83 11.83 0 0016.503.093 11.667 11.667 0 00.1-16.496zm-78.3-109.93a48.125 48.125 0 11-48.126 48.125 48.183 48.183 0 0148.125-48.125z" />
      <Path d="M18.958 58.363a39.375 39.375 0 1078.75 0 39.375 39.375 0 10-78.75 0z" />
    </Svg>
  );
};

export default SvgMagnifyingGlassSolid;
