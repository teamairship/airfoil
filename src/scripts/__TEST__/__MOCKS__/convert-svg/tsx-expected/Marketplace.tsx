import * as React from 'react';
import Svg, { SvgProps, G, Path } from 'react-native-svg';

interface Props extends SvgProps {
  size?: number;
  color1?: string;
  color2?: string;
}

const WIDTH = 26;
const HEIGHT = 26;
const ASPECT_RATIO = HEIGHT / WIDTH;

const SvgMarketplace: React.FC<Props> = ({
  size = 25,
  color1 = "#fff",
  color2 = "#5A55CA",
  ...props
}) => {
  return (
    <Svg fill="none" width={size} height={size * ASPECT_RATIO} viewBox="0 0 26 26" {...props}>
      <G
        fill={color1}
        fillRule="evenodd"
        stroke={color2}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={0.5}
        clipRule="evenodd"
        opacity={0.8}
      >
        <Path d="M1 7c0-.473.384-.857.857-.857h22.286c.473 0 .857.384.857.857v17.143a.857.857 0 01-.857.857H1.857A.857.857 0 011 24.143V7zm1.714.857v15.429h20.572V7.857H2.714z" />
        <Path d="M9.571 2.714a.857.857 0 00-.857.857v2.572h8.572V3.57a.857.857 0 00-.857-.857H9.57zm-1.818-.96A2.571 2.571 0 019.571 1h6.858A2.571 2.571 0 0119 3.571V7a.857.857 0 01-.857.857H7.857A.857.857 0 017 7V3.571c0-.682.27-1.336.753-1.818zM6.143 13c0-.473.384-.857.857-.857h12a.857.857 0 110 1.714H7A.857.857 0 016.143 13zm0 5.143c0-.473.384-.857.857-.857h12A.857.857 0 0119 19H7a.857.857 0 01-.857-.857z" />
      </G>
    </Svg>
  );
};

export default SvgMarketplace;
