import React from 'react';
import { Platform, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import useTheme from '@/theme/useTheme';

const HeaderBackImage = () => {
  const { layout, borders, backgrounds, fonts, gutters } = useTheme();
  return (
    <LinearGradient
      style={[
        borders.rounded_16,
        Platform.OS === 'ios' ? gutters.marginLeft_8 : null,
      ]}
      start={{ x: 1, y: 1 }}
      end={{ x: 0, y: 0 }}
      colors={[
        backgrounds.purple700.backgroundColor,
        backgrounds.blue700.backgroundColor,
        backgrounds.pink800.backgroundColor,
      ]}
    >
      <View
        style={[
          borders.rounded_16,
          backgrounds.purple900,
          layout.justifyCenter,
          layout.itemsCenter,
          { margin: 2, width: 50, height: 50 },
        ]}
      >
        <Text
          style={[
            fonts.nationalBold,
            fonts.uppercase,
            fonts.text_white,
            fonts.font_32,
            { lineHeight: 35 },
          ]}
        >
          {'<'}
        </Text>
      </View>
    </LinearGradient>
  );
};

export default HeaderBackImage;
