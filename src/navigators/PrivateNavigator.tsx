import React from 'react';
import {
  createStackNavigator,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';

import { ApplicationPrivateStackParamList } from 'types/navigation';
// Screens
import Home from '@/screens/Home';
import SpotForm from '@/screens/SpotForm';
import SpotDetails from '@/screens/SpotDetails';
import useTheme from '@/theme/useTheme';
import HeaderBackImage from '@/components/atoms/HeaderBackImage/HeaderBackImage';
import SupplyForm from '@/screens/SupplyForm';
import { useTranslation } from 'react-i18next';

const Stack = createStackNavigator<ApplicationPrivateStackParamList>();

const MainNavigator = () => {
  const { fonts } = useTheme();
  const { t } = useTranslation(['navigation']);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          shadowColor: 'transparent',
        },
        headerTitleStyle: { ...fonts.nationalBold, ...fonts.font_24 },
        headerLeftLabelVisible: false,
        headerBackImage: () => <HeaderBackImage />,
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
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="SpotForm" component={SpotForm} />
      <Stack.Screen
        name="SpotDetails"
        component={SpotDetails}
        options={{ headerTitle: '' }}
      />
      <Stack.Screen
        name="SupplyForm"
        component={SupplyForm}
        options={{
          headerTitleContainerStyle: {
            marginLeft: 0,
          },
          headerTitleStyle: {
            fontSize: 16,
          },
          headerTitle: t('supplyFormCreate'),
        }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
