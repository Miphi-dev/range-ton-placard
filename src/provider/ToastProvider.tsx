import React, { createContext, useState } from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import useTheme from '@/theme/useTheme';
import Message from '@/components/atoms/Message/Message';
import { Props as MessageProps } from '@/components/atoms/Message/Message';

type ToastContext = {
  showToast: (message: string, type?: MessageProps['type']) => void;
};

export const ToastContext = createContext<ToastContext | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

const ToastProvider = ({ children }: Props) => {
  const { layout, gutters } = useTheme();

  const offset = useSharedValue(100);

  const [message, setMessage] = useState<string>();
  const [type, setType] = useState<MessageProps['type']>('success');

  // @ts-ignore
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withSpring(offset.value * 2, {
            stiffness: 50,
          }),
        },
      ],
    };
  });

  const showToast = (
    newMessage: string,
    newType: MessageProps['type'] = 'success',
  ) => {
    offset.value = -20;

    setMessage(newMessage);
    setType(newType);

    setTimeout(() => {
      hideToast();
    }, 5000);
  };

  const hideToast = () => {
    offset.value = 100;
    setTimeout(() => {
      setMessage(undefined);
      setType('success');
    }, 500);
  };

  return (
    <ToastContext.Provider
      value={{
        showToast,
      }}
    >
      <View
        style={[layout.relative, layout.flex_1, { backgroundColor: 'red' }]}
      >
        <Animated.View
          style={[
            layout.absolute,
            layout.fullWidth,
            gutters.padding_8,
            layout.z1,
            layout.bottom0,
            layout.itemsCenter,
            animatedStyles,
          ]}
        >
          {!!message && (
            <View style={{ minWidth: 200 }}>
              <Message message={message} type={type} variant="background" />
            </View>
          )}
        </Animated.View>

        {children}
      </View>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
