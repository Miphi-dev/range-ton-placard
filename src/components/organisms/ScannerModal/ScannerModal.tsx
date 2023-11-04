import React, { useEffect, useState } from 'react';
// components
import ModalComponent from '@/components/molecules/Modal/ModalComponent';
import { ActivityIndicator, Alert, Text, View } from 'react-native';
import Button from '@/components/atoms/Button/Button';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import FloatingButton from '@/components/atoms/FloatingButton/FloatingButton';
// hooks
import useTheme from '@/theme/useTheme';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import useToast from '@/hooks/useToast';
// services
import SuppliesService from '@/services/SuppliesService';
// types
import { SupplyPayload } from '@/services/schemas/supplies';

type Props = {
  handleAddingManually: () => unknown;
  onSuccess: (supply: Partial<SupplyPayload>) => unknown;
  close: () => unknown;
  isVisible: boolean;
};
const ScannerModal = ({
  handleAddingManually,
  isVisible,
  close,
  onSuccess,
}: Props) => {
  // local states
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [currentCode, setcurrentCode] = useState<string>();
  //hooks
  const { t } = useTranslation(['supplyForm']);
  const { layout, gutters, backgrounds, fonts } = useTheme();
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');
  const { showToast } = useToast();

  // Queries
  const getSupplyInfoQuery = useQuery(
    ['getSupplyInfo', currentCode],
    () => {
      if (currentCode) {
        return SuppliesService.getSupplyFromBarCode(currentCode);
      }
      return Promise.reject();
    },
    {
      enabled: !!currentCode,
    }
  );

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes) => {
      setcurrentCode(codes?.[0]?.value);
    },
  });

  // methods

  const handleScanSupply = async () => {
    if (!hasPermission) {
      requestPermission().then((hasGranted) => {
        if (!hasGranted) {
          setIsScannerOpen(false);
          Alert.alert(
            t('addSupplyModal.permissions.title'),
            t('addSupplyModal.permissions.description')
          );
        } else {
          setIsScannerOpen(true);
        }
      });
    } else {
      setIsScannerOpen(true);
    }
  };

  // effects
  useEffect(() => {
    if (getSupplyInfoQuery?.data?.product) {
      const supply: Partial<SupplyPayload> = {
        name: getSupplyInfoQuery.data.product.product_name,
        marque: getSupplyInfoQuery.data.product.brands,
      };
      onSuccess(supply);
    }
    setcurrentCode('');
  }, [getSupplyInfoQuery?.data]);

  useEffect(() => {
    if (getSupplyInfoQuery.isError) {
      showToast(t('addSupplyModal.error'), 'error');
      setcurrentCode('');
      close();
      setIsScannerOpen(false);
    }
  }, [getSupplyInfoQuery.isError]);

  return (
    <>
      <ModalComponent isVisible={isVisible} close={close}>
        <View style={[gutters.padding_16]}>
          <View style={[gutters.marginBottom_16]}>
            <Button
              onPress={handleScanSupply}
              label={t('addSupplyModal.scan')}
              type={'outline'}
            />
          </View>
          <View style={[gutters.marginBottom_16]}>
            <Button
              onPress={handleAddingManually}
              label={t('addSupplyModal.manual')}
              type={'outline'}
            />
          </View>
        </View>
      </ModalComponent>
      <ModalComponent
        close={() => setIsScannerOpen(false)}
        isVisible={isScannerOpen}
      >
        <View style={[layout.fullHeight, backgrounds.gray200]}>
          {getSupplyInfoQuery.isFetching ? (
            <ActivityIndicator
              color={backgrounds.purple500.backgroundColor}
              style={[
                layout.absolute,
                layout.fullWidth,
                layout.fullHeight,
                layout.justifyCenter,
                layout.itemsCenter,
                layout.z1,
              ]}
              size={'large'}
            />
          ) : null}
          {hasPermission && device ? (
            <Camera
              style={layout.flex_1}
              device={device}
              isActive={!getSupplyInfoQuery.isFetching}
              codeScanner={codeScanner}
            />
          ) : null}
          <FloatingButton onPress={() => setIsScannerOpen(false)}>
            <Text
              style={[fonts.nationalRegular, fonts.font_32, fonts.text_gray500]}
            >
              🚪
            </Text>
          </FloatingButton>
        </View>
      </ModalComponent>
    </>
  );
};

export default ScannerModal;
