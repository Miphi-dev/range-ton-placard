import React from 'react';
import {
  StyleProp,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import useTheme from '@/theme/useTheme';

type Props = Omit<TextInputProps, 'placeholderTextColor' | 'style'> & {
  label: string;
  style?: StyleProp<ViewStyle>;
};
const Input = (props: Props) => {
  const { borders, backgrounds, gutters, fonts } = useTheme();
  return (
    <View style={props?.style}>
      <Text
        style={[
          fonts.text_pink800,
          fonts.font_16,
          gutters.marginLeft_16,
          { marginBottom: -4 },
        ]}
      >
        {props.label}
      </Text>
      <TextInput
        {...props}
        style={[
          borders.border_2,
          borders.rounded_16,
          borders.border_pink800,
          gutters.paddingHorizontal_16,
        ]}
        placeholderTextColor={backgrounds.gray200.backgroundColor}
      />
    </View>
  );
};

Input.defaultProps = {
  style: [],
};

export default Input;
