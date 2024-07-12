import React from 'react';
import {Text, View} from 'react-native';
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
  LoginOrRegisterPayload,
  loginOrRegisterPayloadSchema,
} from '@/services/AuthenticationService';
import {ApplicationPublicScreenProps} from "types/navigation";

const Register = ({navigation}: ApplicationPublicScreenProps<'Register'>) => {
  const { fonts, backgrounds, layout, gutters } = useTheme();
  const { t } = useTranslation(['login']);

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<LoginOrRegisterPayload>({
    resolver: zodResolver(loginOrRegisterPayloadSchema),
    mode: 'onChange',
  });

  const registerMutation = useMutation(authentication.register);

  const onSubmit = (data: LoginOrRegisterPayload) => {
    registerMutation.mutate(data);
    navigation.navigate('Login');
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
            Créer son compte
          </Text>
          {registerMutation.isError ? (
            <Message type="error" message={t('form.error')} />
          ) : null}
        </View>
        <View style={{ height: '40%' }}>
          <Input
            control={control}
            name={'email'}
            placeholder={t('form.login.placeholder')}
            label={t('form.login.label')}
            keyboardType={'email-address'}
          />

          <Input
            style={[gutters.marginTop_24]}
            control={control}
            name={'password'}
            placeholder={t('form.password.placeholder')}
            label={t('form.password.label')}
            secureTextEntry
          />

        </View>
        <View
          style={[
            gutters.marginBottom_40,
            layout.fullWidth,
            layout.itemsCenter,
          ]}
        >
          <Button
            disabled={!isValid}
            isLoading={registerMutation.isLoading}
            label={'creer'}
            onPress={handleSubmit(onSubmit)}
            style={gutters.paddingHorizontal_32}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};
export default Register;
