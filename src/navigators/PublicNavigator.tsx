import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ApplicationStackParamList } from 'types/navigation';
import Login from '@/screens/Login';

const Stack = createStackNavigator<ApplicationStackParamList>();

const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Login} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
