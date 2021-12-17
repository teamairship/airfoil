import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

interface Props extends SvgProps {
  size?: number;
  color?: string;
}

const WIDTH = 23;
const HEIGHT = 36;
const ASPECT_RATIO = HEIGHT / WIDTH;

const SvgBolt: React.FC<Props> = ({
  size = 25,
  color = "#fff",
  ...props
}) => {
  return (
    <Svg fill="none" width={size} height={size * ASPECT_RATIO} viewBox="0 0 23 36" {...props}>
      <Path
        fill={color}
        d="M20.926 11.728h-8.022l2.974-8.885c.276-1.102-.553-2.135-1.59-2.135h-9.96c-.83 0-1.59.62-1.66 1.446L.456 18.684c-.138 1.033.623 1.86 1.66 1.86h8.16l-3.18 13.43c-.208 1.033.552 1.997 1.59 1.997.622 0 1.175-.275 1.452-.826l12.171-20.938c.692-1.033-.138-2.48-1.383-2.48z"
      />
    </Svg>
  );
};

export default SvgBolt;
