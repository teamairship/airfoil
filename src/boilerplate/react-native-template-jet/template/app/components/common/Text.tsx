import React, { ReactChildren, ReactChild } from 'react';
import { StyleSheet, StyleProp } from 'react-native';
import { Text as ElementsText } from 'react-native-elements';

interface Props {
  children: string | string[] | ReactChildren | ReactChild | Element;
  color?: string | null;
  bold?: boolean;
  italic?: boolean;
  black?: boolean;
  marginBottom?: number;
  size?: number | null;
  onLayout?: Function;
  selectable?: boolean;
  style?: StyleProp<any>;
  testID?: string;
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
}

const Text: React.FC<Props> = (props) => {
  return (
    <ElementsText
      style={[
        styles.textStyle,
        props.style,
        props.black ? { color: 'black' } : null,
        props.bold ? { fontWeight: '800' } : null,
        props.italic ? { fontStyle: 'italic' } : null,
        props.marginBottom ? { marginBottom: props.marginBottom } : null,
        props.color ? { color: props.color } : null,
        props.size ? { fontSize: props.size } : null,
      ]}
      testID={props.testID || ''}
      numberOfLines={props.numberOfLines}
      ellipsizeMode={props.ellipsizeMode}
    >
      {props.children}
    </ElementsText>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    color: 'black',
    fontFamily: 'Avenir-Medium',
  },
});

export default Text;
