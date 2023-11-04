import React from 'react';
import {
  ActivityIndicator,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import useTheme from '@/theme/useTheme';
import { ViewStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

type Props = {
  label: string;
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  type?: 'gradient' | 'outline';
  style?: StyleProp<ViewStyle> | undefined;
  fontStyles?: StyleProp<TextStyle> | undefined;
};

const Button = ({
  label,
  onPress,
  isLoading,
  disabled,
  type,
  style,
  fontStyles,
}: Props) => {
  const { gutters, borders, backgrounds, fonts, layout } = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[{ opacity: disabled ? 0.4 : 1 }]}
    >
      <LinearGradient
        style={
          type === 'gradient'
            ? [gutters.paddingVertical_16, style, borders.rounded_16]
            : [borders.rounded_16]
        }
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}
        colors={[
          backgrounds.purple700.backgroundColor,
          backgrounds.blue700.backgroundColor,
          backgrounds.pink800.backgroundColor,
        ]}
      >
        <View
          style={
            type === 'outline'
              ? [
                  gutters.paddingVertical_16,
                  layout.itemsCenter,
                  style,
                  borders.rounded_16,
                  backgrounds.purple900,
                  { margin: 2 },
                ]
              : [layout.itemsCenter]
          }
        >
          {isLoading ? (
            <ActivityIndicator color={backgrounds.white.backgroundColor} />
          ) : (
            <Text
              style={[
                fonts.nationalBold,
                fonts.uppercase,
                fonts.text_white,
                fonts.font_16,
                fontStyles,
              ]}
            >
              {label}
            </Text>
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

Button.defaultProps = {
  isLoading: false,
  disabled: false,
  type: 'gradient',
  style: undefined,
  fontStyles: undefined,
};

export default Button;
