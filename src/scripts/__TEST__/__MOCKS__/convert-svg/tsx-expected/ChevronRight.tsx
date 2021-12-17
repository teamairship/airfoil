import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

interface Props extends SvgProps {
  size?: number;
  color?: string;
}

const WIDTH = 7;
const HEIGHT = 11;
const ASPECT_RATIO = HEIGHT / WIDTH;

const SvgChevronRight: React.FC<Props> = ({
  size = 25,
  color = "#5A55CA",
  ...props
}) => {
  return (
    <Svg fill="none" width={size} height={size * ASPECT_RATIO} viewBox="0 0 7 11" {...props}>
      <Path
        fill={color}
        d="M6.344 5.281a.36.36 0 000-.531L1.78.125c-.156-.156-.406-.156-.531 0L.625.75c-.156.125-.156.375 0 .531L4.313 5 .624 8.75a.36.36 0 000 .531l.625.625c.125.156.375.156.531 0l4.563-4.625z"
      />
    </Svg>
  );
};

export default SvgChevronRight;
