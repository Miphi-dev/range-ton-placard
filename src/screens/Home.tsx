import React from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
// components
import ScreenContainer from '@/components/templates/ScreenContainer';
import Button from '@/components/atoms/Button/Button';
import MenuItem from '@/components/atoms/MenuItem/MenuItem';
// hooks
import { useMutation } from '@tanstack/react-query';
import useTheme from '@/theme/useTheme';
import { useTranslation } from 'react-i18next';
// services
import AuthenticationService from '@/services/AuthenticationService';

const spots = [
  {
    name: 'Boite de réserve',
    description:
      "Les choses qu'on a déjà rangés ailleurs mais qu'on a acheté d'avance au cas ou",
  },
  {
    name: 'Frigo',
    description: 'Les choses qui pourrissent vite',
  },
  {
    name: 'Boite apéro',
    description: 'Les choses qui croustillent',
  },
  {
    name: 'Boite patisserie',
    description: 'Les choses qui se mettent dans les gateaux',
  },
  {
    name: 'Boite patisserie',
    description: 'Les choses qui se mettent dans les gateaux',
  },
  {
    name: 'Boite patisserie',
    description: 'Les choses qui se mettent dans les gateaux',
  },
  {
    name: 'Boite patisserie',
    description: 'Les choses qui se mettent dans les gateaux',
  },
  {
    name: 'Boite patisserie',
    description: 'Les choses qui se mettent dans les gateaux',
  },
  {
    name: 'Boite patisserie',
    description: 'Les choses qui se mettent dans les gateaux',
  },
  {
    name: 'Boite patisserie',
    description: 'Les choses qui se mettent dans les gateaux',
  },
  {
    name: 'Boite patisserie',
    description: 'Les choses qui se mettent dans les gateaux',
  },
  {
    name: 'Boite patisserie',
    description: 'Les choses qui se mettent dans les gateaux',
  },
  {
    name: 'Boite patisserie',
    description: 'Les choses qui se mettent dans les gateaux',
  },
  {
    name: 'LAST',
    description: 'Les choses qui se mettent dans les gateaux',
  },
];

const Home = () => {
  const { fonts, gutters, layout } = useTheme();
  const { t } = useTranslation(['home']);

  // Queries
  const logoutMutation = useMutation(AuthenticationService.logout);

  // methods
  const handleLogout = () =>
    Alert.alert(t('logoutAlert.title'), t('logoutAlert.description'), [
      {
        text: t('logoutAlert.actions.ok'),
        onPress: () => logoutMutation.mutate(),
        style: 'default',
      },
      {
        text: t('logoutAlert.actions.cancel'),
        onPress: () => {},
        style: 'cancel',
      },
    ]);

  return (
    <ScreenContainer>
      <View style={[gutters.paddingHorizontal_16, layout.flex_1]}>
        {/*header*/}
        <View
          style={[
            gutters.marginTop_16,
            layout.fullWidth,
            layout.justifyBetween,
            layout.row,
          ]}
        >
          <Text
            style={[
              fonts.text_white,
              fonts.nationalBold,
              fonts.font_32,
              gutters.marginTop_16,
            ]}
          >
            {t('pageTitle')}
          </Text>
          <Button
            onPress={handleLogout}
            label={'💥'}
            style={gutters.paddingHorizontal_16}
            type={'outline'}
          />
        </View>
        {/*spots section*/}
        <Text
          style={[
            fonts.text_white,
            fonts.nationalLight,
            fonts.font_24,
            gutters.marginTop_32,
            gutters.marginBottom_16,
          ]}
        >
          {t('spotList')}
        </Text>
        <ScrollView>
          <View style={gutters.marginBottom_32}>
            {spots?.map(({ name, description }, index) => (
              <View key={`spot-${index}`} style={gutters.marginVertical_8}>
                <MenuItem title={name} subtitle={description} />
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </ScreenContainer>
  );
};
export default Home;
