import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

interface Props extends SvgProps {
  size?: number;
  color?: string;
}

const WIDTH = 22;
const HEIGHT = 21;
const ASPECT_RATIO = HEIGHT / WIDTH;

const SvgArrowLeft: React.FC<Props> = ({
  size = 25,
  color = "#fff",
  ...props
}) => {
  return (
    <Svg fill="none" width={size} height={size * ASPECT_RATIO} viewBox="0 0 22 21" {...props}>
      <Path
        fill={color}
        d="M10.77 20.566l.937-.89c.234-.235.234-.61 0-.797l-7.266-7.313h16.032a.57.57 0 00.562-.562V9.69c0-.28-.281-.562-.562-.562H4.44l7.266-7.266c.234-.187.234-.562 0-.797l-.938-.89c-.187-.235-.562-.235-.796 0L.176 9.973a.54.54 0 000 .796l9.797 9.797c.234.235.609.235.796 0z"
      />
    </Svg>
  );
};

export default SvgArrowLeft;
