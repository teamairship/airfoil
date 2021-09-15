import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const SvgConstructionWarning = (props: SvgProps) => {
  return (
    <Svg viewBox="0 0 140 140" {...props}>
      <Path
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={8.75}
        d="M4.375 30.625h131.25v61.25H4.375zm17.5 61.25v43.75m96.25-43.75v43.75M26.25 13.125a8.75 8.75 0 1017.5 0 8.75 8.75 0 10-17.5 0zm70 0a8.75 8.75 0 1017.5 0 8.75 8.75 0 10-17.5 0zm-48.125 17.5l-43.75 43.75m78.75-43.75l-61.25 61.25m96.25-61.25l-61.25 61.25m78.75-43.75l-43.75 43.75"
      />
    </Svg>
  );
};

export default SvgConstructionWarning;
