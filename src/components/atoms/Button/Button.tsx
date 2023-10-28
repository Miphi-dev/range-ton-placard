import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import useTheme from '@/theme/useTheme';

type Props = {
  label: string;
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
};

const Button = ({ label, onPress, isLoading, disabled }: Props) => {
  const { gutters, borders, backgrounds, fonts } = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[{ opacity: disabled ? 0.4 : 1 }]}
    >
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
        {isLoading ? (
          <ActivityIndicator />
        ) : (
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
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

Button.defaultProps = {
  isLoading: false,
  disabled: false,
};

export default Button;
