import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

const NavigationWrapper: React.FC = ({ children }) => {
  return <NavigationContainer>{children}</NavigationContainer>;
};

export default NavigationWrapper;
