import React from 'react';
import { StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';

import { ApplicationStackParamList } from 'types/navigation';
import useTheme from '@/theme/useTheme';
import Login from '@/screens/Login';

const Stack = createStackNavigator<ApplicationStackParamList>();

const ApplicationNavigator = () => {
  const { navigationTheme, backgrounds } = useTheme();

  const navigationRef = useNavigationContainerRef();

  return (
    <NavigationContainer theme={navigationTheme} ref={navigationRef}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={backgrounds.purple900.backgroundColor}
      />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ApplicationNavigator;
