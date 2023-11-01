import React from 'react';
import { Text, View } from 'react-native';
// Components
import ScreenContainer from '@/components/templates/ScreenContainer';
// Hooks
import useTheme from '@/theme/useTheme';
import { useTranslation } from 'react-i18next';
// Services

const SpotDetails = () => {
  const { fonts, layout, gutters } = useTheme();
  const { t } = useTranslation(['spotDetails']);

  return (
    <ScreenContainer>
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
        </View>
      </View>
    </ScreenContainer>
  );
};
export default SpotDetails;
