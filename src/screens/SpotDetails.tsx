import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, RefreshControl, ScrollView, Text, View } from 'react-native';
// Components
import ScreenContainer from '@/components/templates/ScreenContainer';
import SkeletonLoader from '@/components/atoms/SkeletonLoader/SkeletonLoader';
import Button from '@/components/atoms/Button/Button';
import Message from '@/components/atoms/Message/Message';
import MenuItem from '@/components/atoms/MenuItem/MenuItem';
import ScannerModal from '@/components/organisms/ScannerModal/ScannerModal';
import SearchSupplies from '@/components/molecules/SearchSupplies/SearchSupplies';
import FloatingButton from '@/components/atoms/FloatingButton/FloatingButton';
// Hooks
import useTheme from '@/theme/useTheme';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useFocusEffect } from '@react-navigation/native';
//Types
import { ApplicationPrivateScreenProps } from 'types/navigation';
import { Supply } from '@/services/schemas/supplies';
// Services
import SpotsService from '@/services/SpotsService';
import SuppliesService from '@/services/SuppliesService';

const SpotDetails = ({
  route,
  navigation,
}: ApplicationPrivateScreenProps<'SpotDetails'>) => {
  // local state
  const [addSupplyModal, setaddSupplyModal] = useState(false);

  //hooks
  const { layout, gutters, fonts } = useTheme();
  const { t } = useTranslation(['spotDetails']);

  const [searchSupplies, setSearchSupplies] = useState<Supply[]>();

  // queries
  const { isFetching, data, refetch } = useQuery(
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
            keywords: [],
            spotId: route.params.id ?? '',
          },
          {
            id: '2',
            name: 'produit moyen',
            marque: '',
            keywords: [],
            spotId: route.params.id ?? '',
          },
          {
            id: '3',
            name: 'produit très long',
            marque: '',
            keywords: [],
            spotId: route.params.id ?? '',
          },
        ],
      },
    }
  );

  const deleteMutation = useMutation(SpotsService.deleteSpot);
  const deleteSupplyMutation = useMutation(SuppliesService.deleteSupplyInSpot);

  //methods
  const handleRefresh = () => refetch();

  const handleEditPress = () => {
    if (data) {
      navigation.navigate('SpotForm', {
        data: {
          name: data.name || '',
          description: data.description || '',
          id: route.params.id,
          keywords: data.keywords || [],
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

  const handleDeleteSupply = (supplyId: string) => {
    Alert.alert(t('deleteSupply.title'), t('deleteSupply.description'), [
      {
        text: t('deleteSupply.actions.ok'),
        onPress: () =>
          deleteSupplyMutation.mutate({ spotId: route.params.id, supplyId }),
        style: 'default',
      },
      {
        text: t('deleteSupply.actions.cancel'),
        style: 'cancel',
      },
    ]);
  };

  const handleGoToForm = () => {
    setaddSupplyModal(false);
    navigation.navigate('SupplyForm', {
      spotId: route.params.id,
    });
  };

  const openAddSupplyModal = () => setaddSupplyModal(true);

  //memo
  const supplies = useMemo(() => {
    console.log(searchSupplies);
    if (searchSupplies) {
      return searchSupplies;
    }
    return data?.supplies;
  }, [data, searchSupplies]);

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

  useEffect(() => {
    if (deleteSupplyMutation.isSuccess) {
      refetch();
    }
  }, [deleteSupplyMutation.isSuccess]);

  return (
    <ScreenContainer>
      <View style={[gutters.paddingHorizontal_16, layout.flex_1]}>
        {deleteMutation?.isError ? (
          <Message type="error" message={t('errors.delete')} />
        ) : null}
        <SkeletonLoader
          isActive={
            isFetching ||
            deleteMutation.isLoading ||
            deleteSupplyMutation.isLoading
          }
        >
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

          <SearchSupplies
            spotId={route.params.id}
            setValue={setSearchSupplies}
          />

          <ScrollView
            style={[gutters.marginTop_16]}
            refreshControl={
              <RefreshControl
                refreshing={isFetching}
                onRefresh={handleRefresh}
              />
            }
          >
            <View style={[layout.row, layout.wrap, { marginBottom: 110 }]}>
              {supplies?.map(({ name, marque, id }) => (
                <View key={`spot-${id}`} style={[gutters.margin_8]}>
                  <MenuItem
                    title={name}
                    subtitle={marque}
                    onLongPress={() => handleDeleteSupply(id)}
                  />
                </View>
              ))}
            </View>
          </ScrollView>

          <FloatingButton onPress={openAddSupplyModal}>
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
          </FloatingButton>
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
