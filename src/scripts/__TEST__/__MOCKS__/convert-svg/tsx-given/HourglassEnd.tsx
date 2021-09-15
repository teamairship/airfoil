import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const SvgHourglassEnd = (props: SvgProps) => {
  return (
    <Svg fill="none" viewBox="0 0 12 16" {...props}>
      <Path
        fill="#FF9333"
        d="M11.25 2a.74.74 0 00.75-.75v-.5a.76.76 0 00-.75-.75H.75A.74.74 0 000 .75v.5c0 .438.313.75.75.75 0 2.844 1.594 5.25 3.75 6-2.156.781-3.75 3.188-3.75 6a.74.74 0 00-.75.75v.5c0 .438.313.75.75.75h10.5a.74.74 0 00.75-.75v-.5a.76.76 0 00-.75-.75c0-2.813-1.625-5.219-3.781-6 2.156-.75 3.781-3.156 3.781-6zM6 6.5C4.187 6.5 2.75 4.437 2.75 2h6.5c0 2.438-1.469 4.5-3.25 4.5z"
      />
    </Svg>
  );
};

export default SvgHourglassEnd;
