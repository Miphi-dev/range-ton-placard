import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import useTheme from '@/theme/useTheme';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import PrivateNavigator from '@/navigators/PrivateNavigator';
import PublicNavigator from '@/navigators/PublicNavigator';

const MainNavigator = () => {
  const { navigationTheme, backgrounds } = useTheme();

  // Handle authentication : Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [firebaseUser, setFirebaseUser] =
    useState<FirebaseAuthTypes.User | null>(null);
  // Handle authentication :: Handle user state changes
  function handleAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setFirebaseUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(handleAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return null;
  }

  return (
    <NavigationContainer theme={navigationTheme}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={backgrounds.purple900.backgroundColor}
      />
      {firebaseUser ? <PrivateNavigator /> : <PublicNavigator />}
    </NavigationContainer>
  );
};

export default MainNavigator;
