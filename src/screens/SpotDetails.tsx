import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// Components
import ScreenContainer from '@/components/templates/ScreenContainer';
import SkeletonLoader from '@/components/atoms/SkeletonLoader/SkeletonLoader';
import Button from '@/components/atoms/Button/Button';
import Message from '@/components/atoms/Message/Message';
import MenuItem from '@/components/atoms/MenuItem/MenuItem';
// Hooks
import useTheme from '@/theme/useTheme';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from '@tanstack/react-query';
//Types
import { ApplicationPrivateScreenProps } from 'types/navigation';
// Services
import SpotsService from '@/services/SpotsService';
import { useFocusEffect } from '@react-navigation/native';
import ScannerModal from '@/components/organisms/ScannerModal/ScannerModal';

const SpotDetails = ({
  route,
  navigation,
}: ApplicationPrivateScreenProps<'SpotDetails'>) => {
  // local state
  const [addSupplyModal, setaddSupplyModal] = useState(false);

  //hooks
  const { layout, gutters, fonts, backgrounds } = useTheme();
  const { t } = useTranslation(['spotDetails']);

  // queries
  const { isLoading, data, refetch } = useQuery(
    ['getOneSpot', route.params.id],
    () => SpotsService.getSpot(route.params.id),
    {
      enabled: !!route.params.id,
      placeholderData: {
        name: 'Emplacement 1',
        description: ' description 1',
        supplies: [
          {
            id: '1',
            name: 'court',
            marque: '',
          },
          {
            id: '2',
            name: 'produit moyen',
            marque: '',
          },
          {
            id: '3',
            name: 'produit très long',
            marque: '',
          },
        ],
      },
    }
  );

  const deleteMutation = useMutation(SpotsService.deleteSpot);

  //methods
  const handleRefresh = () => refetch();

  const handleEditPress = () => {
    if (data) {
      navigation.navigate('SpotForm', {
        data: {
          name: data.name || '',
          description: data.description || '',
          id: route.params.id,
        },
      });
    }
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

  const handleGoToForm = () =>
    navigation.navigate('SupplyForm', {
      spotId: route.params.id,
    });

  const openaddSupplyModal = () => setaddSupplyModal(true);

  //effects
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={[layout.row, gutters.marginRight_8]}>
          <View style={[gutters.marginRight_8]}>
            <Button
              disabled={!data}
              onPress={handleEditPress}
              label={t('actions.edit')}
              type={'outline'}
              style={{ paddingVertical: 10, paddingHorizontal: 10 }}
            />
          </View>
          <Button
            disabled={!data}
            onPress={handleDeletePress}
            label={t('actions.delete')}
            type={'outline'}
            style={{ paddingVertical: 10, paddingHorizontal: 10 }}
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
          <Text
            style={[
              fonts.nationalBold,
              fonts.text_white,
              fonts.font_32,
              gutters.marginTop_16,
              fonts.alignCenter,
            ]}
          >
            {data ? data.name : t('errors.notfound')}
          </Text>
          <View
            style={[
              layout.row,
              layout.itemsCenter,
              gutters.marginTop_16,
              gutters.marginBottom_16,
            ]}
          >
            <Text
              style={[
                layout.fullWidth,
                fonts.text_white,
                fonts.nationalLight,
                fonts.font_16,
                fonts.alignCenter,
              ]}
            >
              {data?.description}
            </Text>
          </View>
          <ScrollView
            style={[gutters.marginTop_16]}
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={handleRefresh}
              />
            }
          >
            <View style={[layout.row, layout.wrap, { marginBottom: 110 }]}>
              {data?.supplies?.map(({ name, marque, id }) => (
                <View style={[gutters.margin_8]}>
                  <MenuItem key={`spot-${id}`} title={name} subtitle={marque} />
                </View>
              ))}
            </View>
          </ScrollView>

          <TouchableOpacity
            style={[
              layout.absolute,
              layout.bottom0,
              layout.right0,
              gutters.marginBottom_24,
              gutters.marginRight_8,
              backgrounds.blue500,
              layout.itemsCenter,
              layout.justifyCenter,
              {
                height: 80,
                width: 80,
                borderRadius: 80,
              },
            ]}
            onPress={openaddSupplyModal}
          >
            <Text
              style={[
                fonts.text_white,
                fonts.nationalRegular,
                fonts.font_40,
                fonts.text_gray500,
                { lineHeight: 44 },
              ]}
            >
              +
            </Text>
          </TouchableOpacity>
        </SkeletonLoader>
      </View>
      <ScannerModal
        handleAddingManually={handleGoToForm}
        isVisible={addSupplyModal}
        close={() => setaddSupplyModal(false)}
        spotId={route.params.id}
        onSuccess={refetch}
      />
    </ScreenContainer>
  );
};
export default SpotDetails;
