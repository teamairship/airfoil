import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

interface Props extends SvgProps {
  size?: number;
  color?: string;
}

const WIDTH = 14;
const HEIGHT = 17;
const ASPECT_RATIO = HEIGHT / WIDTH;

const SvgTrash: React.FC<Props> = ({ size = 25, color = '#D24747', ...props }) => {
  return (
    <Svg fill="none" width={size} height={size * ASPECT_RATIO} viewBox="0 0 14 17" {...props}>
      <Path
        fill={color}
        d="M8.375 13.188h.75a.38.38 0 00.375-.376v-6.75a.403.403 0 00-.375-.375h-.75A.38.38 0 008 6.063v6.75c0 .22.156.376.375.376zm5.125-10.5h-2.594L9.844.938C9.594.53 9.03.188 8.563.188H5.405c-.468 0-1.031.343-1.281.75l-1.063 1.75H.5c-.281 0-.5.25-.5.5v.5c0 .28.219.5.5.5H1v10.5c0 .843.656 1.5 1.5 1.5h9a1.5 1.5 0 001.5-1.5v-10.5h.5c.25 0 .5-.22.5-.5v-.5c0-.25-.25-.5-.5-.5zM5.344 1.78c.031-.031.125-.093.156-.093h2.969c.031 0 .125.062.156.093l.531.907H4.812l.532-.907zM11.5 14.687h-9v-10.5h9v10.5zm-6.625-1.5h.75A.38.38 0 006 12.813v-6.75a.403.403 0 00-.375-.375h-.75a.38.38 0 00-.375.375v6.75a.36.36 0 00.375.374z"
      />
    </Svg>
  );
};

export default SvgTrash;
