import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const SvgFilterOutline = (props: SvgProps) => {
  return (
    <Svg fill="none" viewBox="0 0 25 25" {...props}>
      <Path
        fill="#29303D"
        d="M21.734 0H2.281C.265 0-.766 2.438.687 3.844l7.594 7.594V19.5c0 .75.328 1.406.89 1.875l3 2.25c1.454.984 3.61.047 3.61-1.828v-10.36l7.547-7.593C24.78 2.438 23.75 0 21.734 0zm-8.203 10.5v11.25l-3-2.25v-9L2.28 2.25h19.5l-8.25 8.25z"
      />
    </Svg>
  );
};

export default SvgFilterOutline;
