import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const SvgChevronRight = (props: SvgProps) => {
  return (
    <Svg fill="none" viewBox="0 0 7 11" {...props}>
      <Path
        fill="#5A55CA"
        d="M6.344 5.281a.36.36 0 000-.531L1.78.125c-.156-.156-.406-.156-.531 0L.625.75c-.156.125-.156.375 0 .531L4.313 5 .624 8.75a.36.36 0 000 .531l.625.625c.125.156.375.156.531 0l4.563-4.625z"
      />
    </Svg>
  );
};

export default SvgChevronRight;
