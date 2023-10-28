import React from 'react';
import { Text, View } from 'react-native';
import useTheme from '@/theme/useTheme';

type Props = {
  type: 'error' | 'success';
  message: string;
};

const Message = ({ type, message }: Props) => {
  const { fonts, backgrounds, gutters, borders } = useTheme();

  return (
    <View
      style={[
        backgrounds.purple900,
        borders.borderTop_2,
        borders.rounded_4,
        gutters.padding_16,
        type === 'success' ? borders.border_success : borders.border_error,
      ]}
    >
      <Text
        style={[
          fonts.nationalRegular,
          fonts.font_16,
          type === 'success' ? fonts.text_success : fonts.text_error,
        ]}
      >
        {message}
      </Text>
    </View>
  );
};

export default Message;
