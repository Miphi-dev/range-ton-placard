import React, { PropsWithChildren } from 'react';
import { Modal, Platform, TouchableOpacity, View } from 'react-native';
//hooks
import useTheme from '@/theme/useTheme';

type Props = PropsWithChildren & {
  isVisible?: boolean;
  close: () => unknown;
};
const ModalComponent = ({ isVisible, close, children }: Props) => {
  const { layout, gutters } = useTheme();

  return (
    <>
      <Modal animationType={'slide'} transparent visible={isVisible}>
        <View style={[layout.flex_1, layout.justifyEnd, layout.relative]}>
          <TouchableOpacity
            onPress={close}
            style={[
              layout.fullWidth,
              layout.fullHeight,
              layout.absolute,
              { backgroundColor: '#000', opacity: 0.7 },
            ]}
          />
          <View
            style={[
              gutters.padding_16,
              { marginTop: Platform.OS === 'ios' ? 60 : 10 },
            ]}
          >
            {children}
          </View>
        </View>
      </Modal>
    </>
  );
};

ModalComponent.defaultProps = {
  isVisible: false,
};

export default ModalComponent;
