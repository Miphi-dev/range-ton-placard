import React from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
// components
import ScreenContainer from '@/components/templates/ScreenContainer';
import Button from '@/components/atoms/Button/Button';
import MenuItem from '@/components/atoms/MenuItem/MenuItem';
// hooks
import { useMutation, useQuery } from '@tanstack/react-query';
import useTheme from '@/theme/useTheme';
import { useTranslation } from 'react-i18next';
// services
import AuthenticationService from '@/services/AuthenticationService';
import SpotsService from '@/services/SpotsService';
import SkeletonLoader from '@/components/atoms/SkeletonLoader/SkeletonLoader';

const Home = () => {
  const { fonts, gutters, layout } = useTheme();
  const { t } = useTranslation(['home']);

  // Queries
  const logoutMutation = useMutation(AuthenticationService.logout);

  const { data, isLoading } = useQuery({
    queryKey: ['spots'],
    queryFn: SpotsService.getSpots,
    placeholderData: [
      { id: '1', name: 'Spot 1', description: 'Description 1' },
      { id: '2', name: 'Spot 2', description: 'Description 2' },
      { id: '3', name: 'Spot 3', description: 'Description 3' },
      { id: '4', name: 'Spot 4', description: 'Description 4' },
    ],
  });

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
        <SkeletonLoader isActive={isLoading}>
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
              {data?.map(({ name, description }, index) => (
                <View key={`spot-${index}`} style={gutters.marginVertical_8}>
                  <MenuItem title={name} subtitle={description} />
                </View>
              ))}
            </View>
          </ScrollView>
        </SkeletonLoader>
      </View>
    </ScreenContainer>
  );
};
export default Home;
