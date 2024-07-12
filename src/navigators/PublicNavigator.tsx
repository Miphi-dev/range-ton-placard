import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ApplicationPublicStackParamList } from 'types/navigation';
import Login from '@/screens/Login';
import ResetPassword from "@/screens/ResetPassword";
import Register from "@/screens/Register";

const Stack = createStackNavigator<ApplicationPublicStackParamList>();

const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
