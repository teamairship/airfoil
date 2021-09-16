import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const SvgMinusCircle = (props: SvgProps) => {
  return (
    <Svg fill="none" viewBox="0 0 16 16" {...props}>
      <Path
        fill="#FF9333"
        d="M7.75.25A7.749 7.749 0 000 8a7.749 7.749 0 007.75 7.75A7.749 7.749 0 0015.5 8 7.749 7.749 0 007.75.25zm-4.125 9a.361.361 0 01-.375-.375v-1.75a.38.38 0 01.375-.375h8.25c.188 0 .375.188.375.375v1.75a.38.38 0 01-.375.375h-8.25z"
      />
    </Svg>
  );
};

export default SvgMinusCircle;
