import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const SvgChevronUp = (props: SvgProps) => {
  return (
    <Svg fill="none" viewBox="0 0 9 6" {...props}>
      <Path
        fill="#5A55CA"
        d="M4.614.498a.315.315 0 00-.465 0L.103 4.49c-.137.137-.137.356 0 .465l.546.547a.315.315 0 00.465 0l3.282-3.227 3.253 3.227c.137.137.356.137.465 0l.547-.547c.137-.11.137-.328 0-.465L4.614.498z"
      />
    </Svg>
  );
};

export default SvgChevronUp;
