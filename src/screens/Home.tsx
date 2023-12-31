import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ApplicationPrivateScreenProps } from 'types/navigation';
// components
import ScreenContainer from '@/components/templates/ScreenContainer';
import Button from '@/components/atoms/Button/Button';
import MenuItem from '@/components/atoms/MenuItem/MenuItem';
import SkeletonLoader from '@/components/atoms/SkeletonLoader/SkeletonLoader';
// hooks
import { useMutation, useQuery } from '@tanstack/react-query';
import useTheme from '@/theme/useTheme';
import { useTranslation } from 'react-i18next';
// services
import AuthenticationService from '@/services/AuthenticationService';
import SpotsService from '@/services/SpotsService';
import { useFocusEffect } from '@react-navigation/native';
import SearchSupplyModal from '@/components/organisms/SearchSupplyModal/SearchSupplyModal';
import FloatingButton from '@/components/atoms/FloatingButton/FloatingButton';
import SuppliesService from '@/services/SuppliesService';

const Home = ({ navigation }: ApplicationPrivateScreenProps<'Home'>) => {
  const { fonts, gutters, layout } = useTheme();
  const { t } = useTranslation(['home']);

  const [searchSuppliesModalVisible, setSearchSuppliesModalVisible] =
    useState(false);

  // Queries
  const logoutMutation = useMutation(AuthenticationService.logout);

  const { data, isFetching, refetch } = useQuery({
    queryKey: ['spots'],
    queryFn: SpotsService.getSpots,
    placeholderData: [
      { id: '1', name: 'Spot 1', description: 'Description 1', keywords: [] },
      { id: '2', name: 'Spot 2', description: 'Description 2', keywords: [] },
      { id: '3', name: 'Spot 3', description: 'Description 3', keywords: [] },
      { id: '4', name: 'Spot 4', description: 'Description 4', keywords: [] },
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

  useEffect(() => {
    SuppliesService.getSimilarSupplies('cola');
  }, []);

  const handleAddSpot = () => navigation.navigate('SpotForm');
  const handleRefresh = () => refetch();

  const handleSpotPress = (id: string) =>
    navigation.navigate('SpotDetails', { id });

  // effects
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );

  return (
    <ScreenContainer>
      <SearchSupplyModal
        isVisible={searchSuppliesModalVisible}
        close={() => setSearchSuppliesModalVisible(false)}
      />
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
        <SkeletonLoader isActive={isFetching}>
          <View
            style={[
              layout.row,
              layout.itemsCenter,
              gutters.marginTop_32,
              gutters.marginBottom_16,
            ]}
          >
            <Text
              style={[fonts.text_white, fonts.nationalLight, fonts.font_24]}
            >
              {t('spotList')}
            </Text>
            <TouchableOpacity
              onPress={handleAddSpot}
              style={[gutters.marginLeft_16, { marginTop: -5 }]}
            >
              <Text
                style={[fonts.nationalLight, fonts.text_white, fonts.font_40]}
              >
                +
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={isFetching}
                onRefresh={handleRefresh}
              />
            }
          >
            <View style={[gutters.marginBottom_32, { marginBottom: 110 }]}>
              {data?.map(({ name, description, id }, index) => (
                <View key={`spot-${index}`} style={gutters.marginVertical_8}>
                  <MenuItem
                    onPress={() => handleSpotPress(id)}
                    title={name}
                    subtitle={description}
                  />
                </View>
              ))}
            </View>
          </ScrollView>
          <FloatingButton onPress={() => setSearchSuppliesModalVisible(true)}>
            <Text
              style={[fonts.nationalRegular, fonts.font_32, fonts.text_gray500]}
            >
              🧐
            </Text>
          </FloatingButton>
        </SkeletonLoader>
      </View>
    </ScreenContainer>
  );
};
export default Home;
