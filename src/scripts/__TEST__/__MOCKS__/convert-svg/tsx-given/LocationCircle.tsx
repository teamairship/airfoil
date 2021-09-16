import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const SvgLocationCircle = (props: SvgProps) => {
  return (
    <Svg fill="none" viewBox="0 0 16 16" {...props}>
      <Path
        fill="#5A55CA"
        d="M7.75.285C3.469.285 0 3.785 0 8.035a7.749 7.749 0 007.75 7.75c4.25 0 7.75-3.469 7.75-7.75 0-4.25-3.5-7.75-7.75-7.75zm3.438 5.313l-3 6.5c-.344.75-1.47.5-1.47-.282v-2.75h-2.75c-.78 0-1.03-1.125-.28-1.468l6.5-3c.593-.25 1.25.406 1 1z"
      />
    </Svg>
  );
};

export default SvgLocationCircle;
