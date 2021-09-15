import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

interface Props extends SvgProps {
  size?: number;
  color?: string;
}

const WIDTH = 24;
const HEIGHT = 16;
const ASPECT_RATIO = HEIGHT / WIDTH;

const SvgEyePrivacy: React.FC<Props> = ({
  size = 25,
  color = "#5A55CA",
  ...props
}) => {
  return (
    <Svg fill="none" width={size} height={size * ASPECT_RATIO} viewBox="0 0 24 16" {...props}>
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 1.144c-3.686-.069-7.498 2.794-9.894 5.722a1.828 1.828 0 000 2.26c2.343 2.87 6.145 5.798 9.893 5.73 3.749.07 7.55-2.858 9.896-5.726a1.828 1.828 0 000-2.261c-2.399-2.93-6.21-5.793-9.896-5.725z"
      />
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9.941 8l2.057 2.057 4.115-4.8m.639 3.421a4.795 4.795 0 11-2.916-5.114"
      />
    </Svg>
  );
};

export default SvgEyePrivacy;
