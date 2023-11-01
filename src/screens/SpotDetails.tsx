import React, { useEffect } from 'react';
import { Alert, RefreshControl, ScrollView, Text, View } from 'react-native';
// Components
import ScreenContainer from '@/components/templates/ScreenContainer';
// Hooks
import useTheme from '@/theme/useTheme';
import { useTranslation } from 'react-i18next';
import { ApplicationPrivateScreenProps } from 'types/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import SpotsService from '@/services/SpotsService';
import SkeletonLoader from '@/components/atoms/SkeletonLoader/SkeletonLoader';
import Button from '@/components/atoms/Button/Button';
import Message from '@/components/atoms/Message/Message';
import MenuItem from '@/components/atoms/MenuItem/MenuItem';
// Services

const SpotDetails = ({
  route,
  navigation,
}: ApplicationPrivateScreenProps<'SpotDetails'>) => {
  const { fonts, layout, gutters } = useTheme();
  const { t } = useTranslation(['spotDetails']);

  // queries
  const { isLoading, data, refetch } = useQuery(
    ['getOneSpot', route.params.id],
    () => SpotsService.getSpot(route.params.id),
    {
      enabled: !!route.params.id,
    },
  );

  const deleteMutation = useMutation(SpotsService.deleteSpot);

  //methods
  const handleRefresh = () => refetch();

  const handleEditPress = () => {
    navigation.navigate('SpotForm');
  };

  const handleDeletePress = () => {
    Alert.alert(t('deleteModal.title'), t('deleteModal.description'), [
      {
        text: t('deleteModal.actions.ok'),
        onPress: () => deleteMutation.mutate(route.params.id),
        style: 'default',
      },
      {
        text: t('deleteModal.actions.cancel'),
        style: 'cancel',
      },
    ]);
  };

  //effects
  useEffect(() => {
    navigation.setOptions({
      headerTitle: data ? data.name : t('errors.notfound'),
      headerRight: () => (
        <View style={[layout.row, gutters.marginRight_8]}>
          <View style={[gutters.marginRight_8]}>
            <Button
              disabled={!data}
              onPress={handleEditPress}
              label={t('actions.edit')}
              type={'outline'}
              style={{ paddingVertical: 10, paddingHorizontal: 8 }}
            />
          </View>
          <Button
            disabled={!data}
            onPress={handleDeletePress}
            label={t('actions.delete')}
            type={'outline'}
            style={{ paddingVertical: 10, paddingHorizontal: 8 }}
          />
        </View>
      ),
    });
  }, [data]);

  useEffect(() => {
    if (deleteMutation.isSuccess) {
      navigation.navigate('Home');
    }
  }, [deleteMutation.isSuccess]);

  return (
    <ScreenContainer>
      <View style={[gutters.paddingHorizontal_16, layout.flex_1]}>
        {deleteMutation?.isError ? (
          <Message type="error" message={t('errors.delete')} />
        ) : null}
        <SkeletonLoader isActive={isLoading}>
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
              {data?.description}
            </Text>
          </View>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={handleRefresh}
              />
            }
          >
            <View style={gutters.marginBottom_32}>
              {data?.supplies?.map(({ name, marque, id }) => (
                <View key={`supply-${id}`} style={gutters.marginVertical_8}>
                  <MenuItem title={name} subtitle={marque} />
                </View>
              ))}
            </View>
          </ScrollView>
        </SkeletonLoader>
      </View>
    </ScreenContainer>
  );
};
export default SpotDetails;
