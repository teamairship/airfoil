/**
 * Generated by Airfoil - JET TEMPLATE
 * https://github.com/teamairship/airfoil
 *
 * @format
 */

import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import ApolloWrapper from './apollo/ApolloWrapper';
import MainNavigator from './navigation/MainNavigator';
import NavigationWrapper from './navigation/NavigationWrapper';

const App = () => {
  return (
    <SafeAreaProvider>
      <ApolloWrapper>
        <NavigationWrapper>
          <MainNavigator />
        </NavigationWrapper>
      </ApolloWrapper>
    </SafeAreaProvider>
  );
};

export default App;
