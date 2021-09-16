import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const SvgFilterSolid = (props: SvgProps) => {
  return (
    <Svg fill="none" viewBox="0 0 25 25" {...props}>
      <Path
        fill="#5A55CA"
        d="M21.728 0H2.275C.259 0-.772 2.438.68 3.844l7.594 7.594V19.5c0 .75.328 1.406.89 1.875l3 2.25c1.454.984 3.61.047 3.61-1.828v-10.36l7.547-7.593C24.775 2.438 23.744 0 21.728 0zm-8.203 10.5v11.25l-3-2.25v-9l-8.25-8.25h19.5l-8.25 8.25z"
      />
      <Path fill="#5A55CA" d="M9.003 11l-8-9 .5-.5h20.5l1 .5-8.5 9v11l-.5 1-5-3.5V11z" />
    </Svg>
  );
};

export default SvgFilterSolid;
