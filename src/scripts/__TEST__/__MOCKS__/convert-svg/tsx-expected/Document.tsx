import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

interface Props extends SvgProps {
  size?: number;
  color?: string;
}

const WIDTH = 12;
const HEIGHT = 17;
const ASPECT_RATIO = HEIGHT / WIDTH;

const SvgDocument: React.FC<Props> = ({ size = 25, color = '#28AD8C', ...props }) => {
  return (
    <Svg fill="none" width={size} height={size * ASPECT_RATIO} viewBox="0 0 12 17" {...props}>
      <Path
        fill={color}
        d="M7 4.938V.688H.75a.74.74 0 00-.75.75v14.5c0 .437.313.75.75.75h10.5a.74.74 0 00.75-.75V5.688H7.75a.722.722 0 01-.75-.75zm2 7.375a.38.38 0 01-.375.374h-5.25A.361.361 0 013 12.313v-.25a.38.38 0 01.375-.376h5.25c.188 0 .375.188.375.376v.25zm0-2a.38.38 0 01-.375.374h-5.25A.361.361 0 013 10.313v-.25a.38.38 0 01.375-.376h5.25c.188 0 .375.188.375.376v.25zm0-2.25v.25a.38.38 0 01-.375.374h-5.25A.361.361 0 013 8.313v-.25a.38.38 0 01.375-.376h5.25c.188 0 .375.188.375.375zM12 4.5c0-.188-.094-.375-.219-.531L8.72.906C8.563.781 8.375.687 8.188.687H8v4h4V4.5z"
      />
    </Svg>
  );
};

export default SvgDocument;
