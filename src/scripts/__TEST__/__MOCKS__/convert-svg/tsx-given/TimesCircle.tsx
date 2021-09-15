import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const SvgTimesCircle = (props: SvgProps) => {
  return (
    <Svg fill="none" viewBox="0 0 16 16" {...props}>
      <Path
        fill="#EC6A76"
        d="M7.75.25A7.749 7.749 0 000 8a7.749 7.749 0 007.75 7.75A7.749 7.749 0 0015.5 8 7.749 7.749 0 007.75.25zm3.781 9.813c.156.124.156.374 0 .53l-1.219 1.22c-.156.156-.406.156-.53 0L7.75 9.75l-2.063 2.063c-.125.156-.375.156-.53 0l-1.22-1.25c-.156-.126-.156-.376 0-.532L6 8 3.937 5.969c-.156-.125-.156-.375 0-.532l1.25-1.218c.125-.157.375-.157.532 0L7.75 6.25l2.031-2.031c.125-.157.375-.157.531 0l1.22 1.218c.155.157.155.407 0 .532L9.5 8l2.031 2.063z"
      />
    </Svg>
  );
};

export default SvgTimesCircle;
