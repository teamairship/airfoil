import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const SvgClock = (props: SvgProps) => {
  return (
    <Svg fill="none" viewBox="0 0 16 16" {...props}>
      <Path
        fill="#5A55CA"
        d="M7.75.285A7.749 7.749 0 000 8.035a7.749 7.749 0 007.75 7.75 7.749 7.749 0 007.75-7.75A7.749 7.749 0 007.75.285zm1.781 10.969L6.75 9.223c-.094-.063-.125-.157-.125-.282v-5.28A.38.38 0 017 3.284h1.5c.188 0 .375.188.375.375v4.313l1.969 1.437c.156.125.219.375.094.531l-.907 1.22c-.094.155-.344.187-.5.093z"
      />
    </Svg>
  );
};

export default SvgClock;
