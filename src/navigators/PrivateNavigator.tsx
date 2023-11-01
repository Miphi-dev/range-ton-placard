import React from 'react';
import {
  createStackNavigator,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';

import { ApplicationPrivateStackParamList } from 'types/navigation';
// Screens
import Home from '@/screens/Home';
import SpotForm from '@/screens/SpotForm';

const Stack = createStackNavigator<ApplicationPrivateStackParamList>();

const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: ({ current: { progress } }) => ({
          cardStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
          },
        }),
        headerStyleInterpolator: HeaderStyleInterpolators.forFade,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="SpotForm" component={SpotForm} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
