import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const SvgClose = (props: SvgProps) => {
  return (
    <Svg fill="none" viewBox="0 0 8 9" {...props}>
      <Path
        fill="#5A55CA"
        d="M4.863 4.488L7.395 1.98a.397.397 0 000-.539L6.809.855a.397.397 0 00-.54 0L3.763 3.387 1.23.855a.397.397 0 00-.539 0l-.586.586a.397.397 0 000 .54l2.532 2.507L.105 7.02a.397.397 0 000 .539l.586.586a.4.4 0 00.54 0l2.53-2.532L6.27 8.145c.14.14.398.14.539 0l.586-.586a.397.397 0 000-.54L4.863 4.49z"
      />
    </Svg>
  );
};

export default SvgClose;
