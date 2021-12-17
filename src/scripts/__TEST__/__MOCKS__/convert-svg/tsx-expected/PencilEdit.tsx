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

const SvgPencilEdit: React.FC<Props> = ({
  size = 25,
  color1 = '#fff',
  color2 = '#5A55CA',
  ...props
}) => {
  return (
    <Svg fill="none" width={size} height={size * ASPECT_RATIO} viewBox="0 0 26 26" {...props}>
      <G opacity={0.8}>
        <Path
          fill={color1}
          fillRule="evenodd"
          d="M20.004 2.965l-9.592 9.592-.643 3.68 3.673-.648 9.593-9.593a.858.858 0 000-1.212m0 0l-1.819-1.819a.858.858 0 00-1.212 0m-1.212-1.212a2.572 2.572 0 013.636 0l1.819 1.819a2.572 2.572 0 010 3.636l-9.784 9.784a.857.857 0 01-.457.238l-5.143.908a.857.857 0 01-.993-.991l.9-5.152a.857.857 0 01.238-.458l9.784-9.784z"
          clipRule="evenodd"
        />
        <Path
          stroke={color2}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={0.5}
          d="M20.004 2.965s0 0 0 0zm0 0l-9.592 9.592-.643 3.68 3.673-.648 9.593-9.593m-3.031-3.03l3.03 1.818m-3.03-1.819a.857.857 0 011.212 0m1.819 3.031s0 0 0 0zm0 0a.858.858 0 000-1.212m0 0l-1.819-1.819m0 0s0 0 0 0zM20.61 1c-.682 0-1.336.27-1.818.753l-9.784 9.784a.857.857 0 00-.238.458l-.9 5.152a.857.857 0 00.993.991l5.143-.908a.857.857 0 00.457-.238l9.784-9.784a2.572 2.572 0 000-3.636l-1.819-1.82A2.571 2.571 0 0020.61 1z"
        />
        <Path
          fill={color1}
          fillRule="evenodd"
          stroke={color2}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={0.5}
          d="M3.571 5.286a.857.857 0 00-.857.857v16.286a.857.857 0 00.857.857h16.286a.857.857 0 00.858-.857v-5.143a.857.857 0 011.714 0v5.143A2.571 2.571 0 0119.857 25H3.571A2.571 2.571 0 011 22.43V6.143A2.571 2.571 0 013.571 3.57h5.143a.857.857 0 110 1.715H3.571z"
          clipRule="evenodd"
        />
      </G>
    </Svg>
  );
};

export default SvgPencilEdit;
