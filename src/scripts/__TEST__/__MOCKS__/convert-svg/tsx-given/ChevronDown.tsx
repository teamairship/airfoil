import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const SvgChevronDown = (props: SvgProps) => {
  return (
    <Svg fill="none" viewBox="0 0 9 6" {...props}>
      <Path
        fill="#5A55CA"
        d="M4.15 5.502a.315.315 0 00.464 0l4.047-4.02c.137-.109.137-.328 0-.464l-.547-.52c-.11-.137-.328-.137-.465 0L4.396 3.725 1.114.498a.315.315 0 00-.465 0l-.546.52c-.137.136-.137.355 0 .464l4.046 4.02z"
      />
    </Svg>
  );
};

export default SvgChevronDown;
