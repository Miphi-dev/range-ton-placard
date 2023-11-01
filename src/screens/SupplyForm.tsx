import React, { useEffect } from 'react';
import { View } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
// Components
import LinearGradient from 'react-native-linear-gradient';
import ScreenContainer from '@/components/templates/ScreenContainer';
import Input from '@/components/atoms/Input/Input';
import Button from '@/components/atoms/Button/Button';
import Message from '@/components/atoms/Message/Message';
// Hooks
import useTheme from '@/theme/useTheme';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import useToast from '@/hooks/useToast';
// Services
// Types
import { ApplicationPrivateScreenProps } from 'types/navigation';
import {
  SupplyPayload,
  supplyPayloadSchema,
} from '@/services/schemas/supplies';
import SuppliesService from '@/services/SuppliesService';

const SupplyForm = ({
  navigation,
  route,
}: ApplicationPrivateScreenProps<'SupplyForm'>) => {
  const { backgrounds, layout, gutters } = useTheme();
  const { t } = useTranslation(['supplyForm', 'navigation']);
  const { showToast } = useToast();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<SupplyPayload>({
    resolver: zodResolver(supplyPayloadSchema),
    mode: 'onChange',
  });

  const createSupplyMutation = useMutation(SuppliesService.createSupplyInSpot);

  const onSubmit = (data: SupplyPayload) => {
    createSupplyMutation.mutate({ spotId: route.params.spotId, data });
  };

  useEffect(() => {
    if (createSupplyMutation.isSuccess) {
      navigation.navigate('SpotDetails', { id: route.params.spotId });
      showToast(t('form.success.create'));
    }
  }, [createSupplyMutation.isSuccess]);

  return (
    <ScreenContainer>
      <LinearGradient
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}
        colors={[
          backgrounds.purple700.backgroundColor,
          backgrounds.blue700.backgroundColor,
          backgrounds.pink800.backgroundColor,
        ]}
        style={[
          layout.absolute,
          {
            opacity: 0.3,
            right: -100,
            height: 400,
            width: 400,
            borderRadius: 400,
          },
        ]}
      />
      <LinearGradient
        colors={[
          backgrounds.purple700.backgroundColor,
          backgrounds.blue700.backgroundColor,
          backgrounds.pink800.backgroundColor,
        ]}
        style={[
          layout.absolute,
          {
            opacity: 0.3,
            top: 350,
            left: -200,
            height: 300,
            width: 300,
            borderRadius: 300,
          },
        ]}
      />
      <View
        style={[
          layout.flex_1,
          gutters.paddingHorizontal_16,
          gutters.paddingBottom_40,
          layout.justifyBetween,
        ]}
      >
        <View style={{ height: '40%' }}>
          <View style={[gutters.paddingTop_24]}>
            {createSupplyMutation.isError ? (
              <Message type="error" message={t('form.error.create')} />
            ) : null}
          </View>
          <Input
            control={control}
            name={'name'}
            placeholder={t('form.name.placeholder')}
            label={t('form.name.label')}
          />

          <Input
            style={[gutters.marginTop_24]}
            control={control}
            name={'marque'}
            placeholder={t('form.marque.placeholder')}
            label={t('form.marque.label')}
            multiline
          />
        </View>
        <View>
          <Button
            disabled={!isValid}
            onPress={handleSubmit(onSubmit)}
            label={t('form.action.new.label')}
            type={'outline'}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};
export default SupplyForm;
