import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const SvgEditProfile = (props: SvgProps) => {
  return (
    <Svg fill="none" viewBox="0 0 25 25" {...props}>
      <Path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M4.857 4.857a3.857 3.857 0 107.714 0 3.857 3.857 0 00-7.714 0v0zm1.286 16.715H1V19a7.714 7.714 0 0111.165-6.902m11.121 2.616l-8.07 8.07-3.65.502.503-3.65 8.07-8.07 3.147 3.148z"
      />
    </Svg>
  );
};

export default SvgEditProfile;
