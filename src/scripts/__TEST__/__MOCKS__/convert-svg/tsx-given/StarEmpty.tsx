import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const SvgStarEmpty = (props: SvgProps) => {
  return (
    <Svg fill="none" viewBox="0 0 19 18" {...props}>
      <Path
        stroke="#5A55CA"
        d="M8.843 1.42c.182-.56.975-.56 1.157 0l1.56 4.805a.61.61 0 00.58.42h5.052c.589 0 .834.755.357 1.101l-4.087 2.97a.608.608 0 00-.221.68l1.561 4.805c.182.56-.46 1.026-.936.68l-4.087-2.97a.608.608 0 00-.715 0l-4.088 2.97c-.477.346-1.118-.12-.936-.68l1.561-4.805a.608.608 0 00-.22-.68l-4.088-2.97c-.477-.346-.232-1.1.358-1.1h5.052c.263 0 .497-.17.578-.42L8.843 1.42z"
      />
    </Svg>
  );
};

export default SvgStarEmpty;
