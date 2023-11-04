import React, { useEffect } from 'react';
// components
import { ScrollView, Text, View } from 'react-native';
import ModalComponent from '@/components/molecules/Modal/ModalComponent';
// hooks
import useTheme from '@/theme/useTheme';
// types
import { useQuery } from '@tanstack/react-query';
import SuppliesService from '@/services/SuppliesService';
import Button from '@/components/atoms/Button/Button';
import { useTranslation } from 'react-i18next';

type Props = {
  spotId: string;
  name: string;
  isVisible: boolean;
  close: () => unknown;
  handleAddSupply: () => unknown;
};

const SimilarSuppliesModal = ({
  isVisible,
  close,
  spotId,
  name,
  handleAddSupply,
}: Props) => {
  const { layout, gutters, fonts, backgrounds, borders } = useTheme();
  const { t } = useTranslation(['supplyForm']);

  const {
    data: similarProducts,
    isSuccess,
    isFetching,
  } = useQuery(['similarSupplies', name], () =>
    SuppliesService.getSimilarSupplies(name)
  );

  useEffect(() => {
    if (isVisible && isSuccess && similarProducts?.length === 0) {
      handleAddSupply();
      close();
    }
  }, [similarProducts, isSuccess]);

  return (
    <ModalComponent isVisible={isVisible} close={close}>
      <View
        style={[
          borders.rounded_16,
          backgrounds.purple900,
          layout.fullWidth,
          layout.justifyEnd,
          gutters.paddingHorizontal_16,
          gutters.paddingTop_24,
        ]}
      >
        {isFetching ? (
          <View>
            <Text>{t('similarSuppliesModal.loading')}</Text>
          </View>
        ) : (
          <>
            <Text
              style={[
                fonts.text_white,
                fonts.nationalBold,
                fonts.font_32,
                gutters.marginTop_16,
              ]}
            >
              {t('similarSuppliesModal.title')}
            </Text>
            <Text
              style={[
                fonts.text_white,
                fonts.nationalRegular,
                fonts.font_16,
                gutters.marginVertical_16,
              ]}
            >
              {t('similarSuppliesModal.description')}
            </Text>

            <ScrollView style={[gutters.marginBottom_16, { maxHeight: '40%' }]}>
              {similarProducts?.map((product, index) => (
                <View
                  key={`product-${index}`}
                  style={[
                    gutters.marginVertical_8,
                    gutters.paddingVertical_16,
                    gutters.paddingHorizontal_16,
                    borders.rounded_16,
                    layout.justifyBetween,
                    backgrounds.purple700,
                  ]}
                >
                  <Text
                    style={[
                      fonts.text_white,
                      fonts.nationalRegular,
                      fonts.font_16,
                    ]}
                  >
                    {product.name}
                  </Text>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={[
                      fonts.text_white,
                      fonts.nationalLight,
                      fonts.font_16,
                    ]}
                  >
                    {product.spot.id === spotId
                      ? `✅ ${product.spot.name}`
                      : `⚠️ ${product.spot.name}`}
                  </Text>
                </View>
              ))}
            </ScrollView>
            <View style={[layout.row, gutters.marginBottom_32]}>
              <View style={[gutters.paddingRight_8, { width: '50%' }]}>
                <Button
                  onPress={close}
                  label={t('similarSuppliesModal.action.cancel')}
                  type="outline"
                />
              </View>
              <View style={[gutters.paddingLeft_8, { width: '50%' }]}>
                <Button
                  onPress={handleAddSupply}
                  label={t('similarSuppliesModal.action.add')}
                />
              </View>
            </View>
          </>
        )}
      </View>
    </ModalComponent>
  );
};

export default SimilarSuppliesModal;
