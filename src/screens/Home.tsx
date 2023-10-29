import React from 'react';
import { Alert, Text, View } from 'react-native';
import ScreenContainer from '@/components/templates/ScreenContainer';
import useTheme from '@/theme/useTheme';
import { useMutation } from '@tanstack/react-query';
import AuthenticationService from '@/services/AuthenticationService';
import Button from '@/components/atoms/Button/Button';
import { useTranslation } from 'react-i18next';

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
      <View style={gutters.paddingHorizontal_16}>
        {/*header*/}
        <View style={[gutters.marginTop_16, layout.fullWidth, layout.itemsEnd]}>
          <Button
            onPress={handleLogout}
            label={'💥'}
            style={gutters.paddingHorizontal_16}
            type={'outline'}
          />
        </View>
        <Text style={[fonts.text_white]}>
          Ceci est la page d'accueil après le login
        </Text>
      </View>
    </ScreenContainer>
  );
};
export default Home;
