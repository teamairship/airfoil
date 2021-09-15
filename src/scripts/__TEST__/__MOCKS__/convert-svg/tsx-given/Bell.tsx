import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const SvgBell = (props: SvgProps) => {
  return (
    <Svg fill="none" viewBox="0 0 22 22" {...props}>
      <Path
        stroke="#4163FF"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M18.084 15.583v-5.416a7.084 7.084 0 00-4.618-6.633 2.5 2.5 0 00-4.935 0 7.078 7.078 0 00-4.614 6.633v5.416a2.5 2.5 0 01-2.5 2.5h19.167a2.5 2.5 0 01-2.5-2.5zm-4.584 2.5a2.5 2.5 0 01-5 0"
      />
    </Svg>
  );
};

export default SvgBell;
