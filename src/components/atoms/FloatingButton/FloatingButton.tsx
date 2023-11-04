import React, { PropsWithChildren } from 'react';
// components
import { TouchableOpacity } from 'react-native';
// hooks
import useTheme from '@/theme/useTheme';

type Props = PropsWithChildren & {
  onPress: () => unknown;
};

const FloatingButton = ({ onPress, children }: Props) => {
  const { layout, gutters, backgrounds } = useTheme();
  return (
    <TouchableOpacity
      style={[
        layout.absolute,
        layout.bottom0,
        layout.right0,
        gutters.marginBottom_24,
        gutters.marginRight_8,
        backgrounds.blue500,
        layout.itemsCenter,
        layout.justifyCenter,
        {
          height: 80,
          width: 80,
          borderRadius: 80,
        },
      ]}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
};

export default FloatingButton;
