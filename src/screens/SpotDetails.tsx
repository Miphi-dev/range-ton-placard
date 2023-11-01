import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
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
// Services

const SpotDetails = ({
  route,
  navigation,
}: ApplicationPrivateScreenProps<'SpotDetails'>) => {
  const { fonts, layout, gutters } = useTheme();
  const { t } = useTranslation(['spotDetails']);

  console.log('PARAMS', route.params.id);
  const { isLoading, data } = useQuery(
    ['getOneSpot', route.params.id],
    () => SpotsService.getSpot(route.params.id),
    {
      enabled: !!route.params.id,
    }
  );

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
      <SkeletonLoader isActive={isLoading} />
    </ScreenContainer>
  );
};
export default SpotDetails;
