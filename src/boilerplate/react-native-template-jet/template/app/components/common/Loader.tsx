import React from 'react';
import { ActivityIndicator } from 'react-native';

import View from './View';

const Loader = () => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1,
        height: '100%',
      }}
    >
      <ActivityIndicator size="large" color="black" />
    </View>
  );
};

export default Loader;
