import React from 'react';
import { StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';

import { ApplicationStackParamList } from 'types/navigation';
import useTheme from '@/theme/useTheme';
import Example from '@/screens/Example';

const Stack = createStackNavigator<ApplicationStackParamList>();

const ApplicationNavigator = () => {
  const { variant, navigationTheme } = useTheme();

  const navigationRef = useNavigationContainerRef();

  return (
    <NavigationContainer theme={navigationTheme} ref={navigationRef}>
      <StatusBar
        barStyle={variant === 'dark' ? 'light-content' : 'dark-content'}
      />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Example} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ApplicationNavigator;
