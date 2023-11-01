import React from 'react';
import { Text, View } from 'react-native';
import useTheme from '@/theme/useTheme';

export type Props = {
  type: 'error' | 'success';
  message: string;
  variant?: 'background' | 'outline';
};

const Message = ({ type, message, variant }: Props) => {
  const { fonts, backgrounds, gutters, borders } = useTheme();

  return (
    <View
      style={[
        variant === 'background' ? backgrounds[type] : backgrounds.purple900,
        variant === 'outline' ? borders.borderTop_2 : null,
        variant === 'outline' ? borders.rounded_4 : borders.rounded_4,
        variant === 'outline' ? borders[`border_${type}`] : null,
        gutters.padding_16,
      ]}
    >
      <Text
        style={[
          fonts.nationalRegular,
          fonts.font_16,
          variant === 'background' ? fonts.text_white : fonts[`text_${type}`],
        ]}
      >
        {message}
      </Text>
    </View>
  );
};

Message.defaultProps = {
  variant: 'outline',
};

export default Message;
