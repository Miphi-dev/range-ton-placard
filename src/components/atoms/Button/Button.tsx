import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import useTheme from '@/theme/useTheme';

type Props = { label: string; onPress: () => void };
const Button = ({ label, onPress }: Props) => {
  const { gutters, borders, backgrounds, fonts } = useTheme();
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        style={[
          gutters.paddingVertical_16,
          borders.rounded_16,
          gutters.paddingHorizontal_32,
        ]}
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}
        colors={[
          backgrounds.purple700.backgroundColor,
          backgrounds.blue700.backgroundColor,
          backgrounds.pink800.backgroundColor,
        ]}
      >
        <Text
          style={[
            fonts.nationalBold,
            fonts.uppercase,
            fonts.text_white,
            fonts.font_16,
          ]}
        >
          {label}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default Button;
