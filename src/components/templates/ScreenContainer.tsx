import React, { PropsWithChildren } from 'react';
import { SafeAreaView } from 'react-native';
import useTheme from '@/theme/useTheme';

const ScreenContainer = ({ children }: PropsWithChildren) => {
  const { layout, backgrounds } = useTheme();

  return (
    <SafeAreaView style={[layout.flex_1, backgrounds.purple900]}>
      {children}
    </SafeAreaView>
  );
};

export default ScreenContainer;
