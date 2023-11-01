import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ApplicationPublicStackParamList } from 'types/navigation';
import Login from '@/screens/Login';

const Stack = createStackNavigator<ApplicationPublicStackParamList>();

const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
