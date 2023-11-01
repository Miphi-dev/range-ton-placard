import React, { useEffect } from 'react';
import { RefreshControl, ScrollView, Text, View } from 'react-native';
// Components
import ScreenContainer from '@/components/templates/ScreenContainer';
// Hooks
import useTheme from '@/theme/useTheme';
import { useTranslation } from 'react-i18next';
import { ApplicationPrivateScreenProps } from 'types/navigation';
import { useQuery } from '@tanstack/react-query';
import SpotsService from '@/services/SpotsService';
import SkeletonLoader from '@/components/atoms/SkeletonLoader/SkeletonLoader';
import Button from '@/components/atoms/Button/Button';
import MenuItem from '@/components/atoms/MenuItem/MenuItem';
// Services

const SpotDetails = ({
  route,
  navigation,
}: ApplicationPrivateScreenProps<'SpotDetails'>) => {
  const { fonts, layout, gutters } = useTheme();
  const { t } = useTranslation(['spotDetails']);

  const { isLoading, data, refetch } = useQuery(
    ['getOneSpot', route.params.id],
    () => SpotsService.getSpot(route.params.id),
    {
      enabled: !!route.params.id,
    },
  );

  const handleRefresh = () => refetch();

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: data ? data.name : t('errors.notfound'),
      headerRight: () => (
        <View style={[layout.row, gutters.marginRight_8]}>
          <View style={[gutters.marginRight_8]}>
            <Button
              onPress={() => console.log('GO TO EDIT PAGE')}
              label={t('actions.edit')}
              type={'outline'}
              style={{ paddingVertical: 10, paddingHorizontal: 8 }}
            />
          </View>
          <Button
            onPress={() => console.log('HANDLE DELETE')}
            label={t('actions.delete')}
            type={'outline'}
            style={{ paddingVertical: 10, paddingHorizontal: 8 }}
          />
        </View>
      ),
    });
  }, [data]);

  return (
    <ScreenContainer>
      <View style={[gutters.paddingHorizontal_16, layout.flex_1]}>
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
