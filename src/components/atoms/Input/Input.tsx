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
import { Controller, FieldValues, Path } from 'react-hook-form';
import { Control } from 'react-hook-form/dist/types';

type Props<V extends FieldValues> = Omit<
  TextInputProps,
  'placeholderTextColor' | 'style'
> & {
  label: string;
  style?: StyleProp<ViewStyle>;
  control: Control<V>;
  name: Path<V>;
};

function Input<V extends FieldValues>({
  label,
  style,
  control,
  name,
  ...props
}: Props<V>) {
  const { borders, backgrounds, gutters, fonts, layout } = useTheme();
  return (
    <View style={style}>
      <Text
        style={[
          fonts.nationalBold,
          fonts.text_pink800,
          fonts.font_16,
          gutters.marginLeft_16,
          { marginBottom: -4 },
        ]}
      >
        {label}
      </Text>
      <Controller
        control={control}
        render={({ field: { value, onChange } }) => (
          <TextInput
            {...props}
            value={value}
            onChangeText={onChange}
            selectionColor={backgrounds.white.backgroundColor}
            textAlignVertical={props.multiline ? 'top' : 'center'}
            style={[
              fonts.nationalRegular,
              fonts.font_16,
              borders.border_2,
              borders.rounded_16,
              borders.border_pink800,
              gutters.paddingHorizontal_16,
              fonts.text_white,
              props.multiline ? {} : { height: 53 },
            ]}
            placeholderTextColor={backgrounds.gray200.backgroundColor}
          />
        )}
        name={name}
      />
    </View>
  );
}

Input.defaultProps = {
  style: [],
};

export default Input;
