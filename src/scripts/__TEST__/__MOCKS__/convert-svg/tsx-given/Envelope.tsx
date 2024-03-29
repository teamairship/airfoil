import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const SvgEnvelope = (props: SvgProps) => {
  return (
    <Svg fill="none" viewBox="0 0 22 17" {...props}>
      <Path
        fill="#4163FF"
        d="M21.57 5.707c-.988.773-2.234 1.719-6.617 4.898-.86.645-2.45 2.063-3.953 2.063-1.547 0-3.094-1.418-3.996-2.063C2.62 7.425 1.375 6.48.387 5.707c-.172-.129-.387 0-.387.215v8.765c0 1.16.902 2.063 2.063 2.063h17.875A2.063 2.063 0 0022 14.687V5.922c0-.215-.258-.344-.43-.215zM11 11.25c.988.043 2.406-1.246 3.137-1.762 5.715-4.125 6.144-4.511 7.433-5.543A.978.978 0 0022 3.13v-.817C22 1.196 21.055.25 19.937.25H2.063C.903.25 0 1.195 0 2.313v.816c0 .344.129.644.387.816C1.676 4.977 2.105 5.363 7.82 9.488c.73.516 2.149 1.805 3.18 1.762z"
      />
    </Svg>
  );
};

export default SvgEnvelope;
