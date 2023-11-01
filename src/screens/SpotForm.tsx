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
// Services
import SpotsService, {
  SpotPayload,
  spotPayloadSchema,
} from '@/services/SpotsService';
import { ApplicationPrivateScreenProps } from 'types/navigation';
import useToast from '@/hooks/useToast';

const SpotForm = ({
  navigation,
}: ApplicationPrivateScreenProps<'SpotForm'>) => {
  const { backgrounds, layout, gutters } = useTheme();
  const { t } = useTranslation(['spotForm', 'navigation']);
  const { showToast } = useToast();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<SpotPayload>({
    resolver: zodResolver(spotPayloadSchema),
    mode: 'onChange',
  });

  const createSpotMutation = useMutation(SpotsService.createSpot);

  const onSubmit = (data: SpotPayload) => {
    return createSpotMutation.mutate(data);
  };

  useEffect(() => {
    if (createSpotMutation.isSuccess) {
      navigation.navigate('Home');
      showToast(t('form.success.create'));
    }
  }, [createSpotMutation.isSuccess]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: t('navigation:spotFormCreate'),
    });
  }, [navigation]);

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
            {createSpotMutation.isError ? (
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
            name={'description'}
            placeholder={t('form.description.placeholder')}
            label={t('form.description.label')}
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
export default SpotForm;
