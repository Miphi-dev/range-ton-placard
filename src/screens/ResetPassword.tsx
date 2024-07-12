import React from 'react';
import { Text, View } from 'react-native';
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
import authentication, {
  ConfirmResetPasswordPayload, confirmResetPasswordPayloadSchema,
  ResetPasswordPayload, resetPasswordPayloadSchema,
} from '@/services/AuthenticationService';
import {ApplicationPublicScreenProps} from "types/navigation";

const ResetPassword = ({route}: ApplicationPublicScreenProps<'ResetPassword'>) => {
  const { fonts, backgrounds, layout, gutters } = useTheme();
  const { t } = useTranslation(['login']);

  const hasOobCode = route.params?.oobCode;

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<ResetPasswordPayload>({
    resolver: zodResolver(resetPasswordPayloadSchema),
    mode: 'onChange',
  });

  const {
    control: controlConfirm,
    handleSubmit: handleSubmitConfirm,
    formState: { isValid: isValidConfirm },
  } = useForm<ConfirmResetPasswordPayload>({
    defaultValues: {
      oobCode: route.params?.oobCode
    },
    resolver: zodResolver(confirmResetPasswordPayloadSchema),
    mode: 'onChange',
  });

  const sendResetEmailMutation = useMutation(authentication.sendResetPasswordEmail);
  const confirmResetMutation = useMutation(authentication.confirmPasswordReset);

  const onSubmit = (data: ResetPasswordPayload) => {
    return sendResetEmailMutation.mutate(data);
  };

  const onSubmitConfirm = (data: ConfirmResetPasswordPayload) => {
    return confirmResetMutation.mutate(data);
  };

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
          layout.justifyBetween,
          layout.flex_1,
          gutters.paddingHorizontal_16,
        ]}
      >
        <View style={[gutters.paddingTop_24]}>
          <Text
            style={[fonts.font_32, gutters.marginBottom_16, fonts.nationalBold]}
          >
            🛒
          </Text>
          <Text
            style={[
              fonts.text_white,
              fonts.font_32,
              gutters.marginBottom_16,
              fonts.nationalBold,
            ]}
          >
            Reset du mot de passe
          </Text>
          {sendResetEmailMutation.isError ? (
            <Message type="error" message={t('form.error')} />
          ) : null}
          {confirmResetMutation.isError ? (
            <Message type="error" message={t('form.error')} />
          ) : null}
        </View>
        <View style={{ height: '40%' }}>

          {
            hasOobCode ? (
              <Input
                control={controlConfirm}
                name={'password'}
                placeholder={t('form.password.placeholder')}
                label={t('form.password.label')}
              />
            ) : (<Input
                control={control}
                name={'email'}
                placeholder={t('form.login.placeholder')}
                label={t('form.login.label')}
                keyboardType={'email-address'}
              />
            )
          }


        </View>
        <View
          style={[
            gutters.marginBottom_40,
            layout.fullWidth,
            layout.itemsCenter,
          ]}
        >
          {
            hasOobCode ? (
              <Button
                disabled={!isValidConfirm}
                isLoading={confirmResetMutation.isLoading}
                label={"Envoyer le mail"}
                onPress={handleSubmitConfirm(onSubmitConfirm)}
                style={gutters.paddingHorizontal_32}
              />
            ) : (<Button
                disabled={!isValid}
                isLoading={sendResetEmailMutation.isLoading}
                label={"Envoyer le mail"}
                onPress={handleSubmit(onSubmit)}
                style={gutters.paddingHorizontal_32}
              />
            )
          }
        </View>
      </View>
    </ScreenContainer>
  );
};
export default ResetPassword;
