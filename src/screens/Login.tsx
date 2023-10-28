import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import ScreenContainer from '@/components/templates/ScreenContainer';
import useTheme from '@/theme/useTheme';
import LinearGradient from 'react-native-linear-gradient';
import { useTranslation } from 'react-i18next';
import Input from '@/components/atoms/Input/Input';
import Button from '@/components/atoms/Button/Button';

const Login = () => {
  const { fonts, backgrounds, layout, gutters, borders } = useTheme();
  const { t } = useTranslation(['login']);
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
            {t('pageTitle')}
          </Text>
          <Text
            style={[
              fonts.text_white,
              fonts.font_16,
              gutters.marginBottom_32,
              fonts.nationalLight,
            ]}
          >
            {t('pageSubtitle')}
          </Text>
        </View>
        <View style={{ height: '40%' }}>
          <Input
            placeholder={t('form.login.placeholder')}
            label={t('form.login.label')}
            keyboardType={'email-address'}
          />
          <Input
            style={[gutters.marginTop_24]}
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
          <Button label={t('form.action.label')} onPress={() => {}} />
        </View>
      </View>
    </ScreenContainer>
  );
};
export default Login;
