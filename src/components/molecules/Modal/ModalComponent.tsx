import React, { PropsWithChildren } from 'react';
import { Modal, Platform, TouchableOpacity, View } from 'react-native';
//hooks
import useTheme from '@/theme/useTheme';

type Props = PropsWithChildren & {
  isVisible?: boolean;
  close: () => unknown;
  fill?: boolean;
  direction?: 'top' | 'bottom';
};
const ModalComponent = ({
  isVisible,
  close,
  children,
  fill,
  direction,
}: Props) => {
  const { layout, backgrounds } = useTheme();

  return (
    <Modal animationType={'slide'} transparent visible={isVisible}>
      <View
        style={[
          layout.flex_1,
          layout.relative,
          direction === 'top' ? layout.justifyStart : layout.justifyEnd,
        ]}
      >
        <TouchableOpacity
          onPress={close}
          style={[
            layout.fullWidth,
            layout.fullHeight,
            layout.absolute,
            fill
              ? backgrounds.purple900
              : { backgroundColor: '#000', opacity: 0.7 },
          ]}
        />
        <View
          style={[
            direction === 'top' ? layout.justifyStart : layout.justifyEnd,
            {
              marginTop: Platform.OS === 'ios' ? 60 : 10,
            },
          ]}
        >
          {children}
        </View>
      </View>
    </Modal>
  );
};

ModalComponent.defaultProps = {
  isVisible: false,
  fill: false,
  direction: 'bottom',
};

export default ModalComponent;
