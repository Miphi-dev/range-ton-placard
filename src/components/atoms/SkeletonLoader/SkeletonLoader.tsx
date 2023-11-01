import React, {
  useEffect,
  useMemo,
  useState,
  Children,
  cloneElement,
  PropsWithChildren,
} from 'react';
import Reanimated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { View, StyleSheet, LayoutRectangle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import useTheme from '@/theme/useTheme';

const ELEMENTS_TO_EXCLUDE = [
  'View',
  'ScrollView',
  'KeyboardAvoidingView',
  'FlashList',
  'FlatList',
  'TabView',
];

// @ts-ignore
const addBackgroundOnDeepTextChildren = (childrenToEdit) =>
  Children.map(childrenToEdit, (child) => {
    if (!child?.type) {
      return child;
    }
    let childStyle =
      Array.isArray(child?.props?.style) || !child?.props?.style
        ? child?.props?.style
        : [child?.props?.style];
    const isChildTypeIgnored =
      ELEMENTS_TO_EXCLUDE?.includes(child?.type?.name) ||
      ELEMENTS_TO_EXCLUDE?.includes(child?.type?.displayName);
    if (child.props?.children) {
      return cloneElement(
        child,
        !isChildTypeIgnored
          ? {
              style: [{ backgroundColor: 'white' }].concat(childStyle),
            }
          : { style: childStyle },
        addBackgroundOnDeepTextChildren(child.props.children)
      );
    }
    return cloneElement(
      child,
      !isChildTypeIgnored
        ? { style: [{ backgroundColor: 'white' }].concat(childStyle) }
        : { style: childStyle }
    );
  });

type Props = PropsWithChildren & { isActive: boolean };
const SkeletonLoader = ({ children, isActive }: Props) => {
  //local state
  const [layout, setLayout] = useState<LayoutRectangle>();
  // reanimated variables
  const shared = useSharedValue(0);
  // hooks
  const { layout: styleLayout, backgrounds } = useTheme();

  useEffect(() => {
    shared.value = withRepeat(withTiming(1, { duration: 1000 }), Infinity);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          shared.value,
          [0, 1],
          [layout ? -layout.width : 0, layout ? layout.width : 0]
        ),
      },
    ],
  }));

  const clones = useMemo(() => {
    return addBackgroundOnDeepTextChildren(children);
  }, [children]);

  return !layout || !isActive ? (
    <View
      style={styleLayout.flex_1}
      onLayout={(event) => setLayout(event.nativeEvent.layout)}
    >
      {children}
    </View>
  ) : (
    <MaskedView
      maskElement={<View style={styleLayout.flex_1}>{clones}</View>}
      style={{
        width: layout.width,
        height: layout.height,
      }}
    >
      <View
        style={[backgrounds.gray500, { flexGrow: 1, overflow: 'hidden' }]}
      />
      <Reanimated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
        <MaskedView
          style={StyleSheet.absoluteFill}
          maskElement={
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={StyleSheet.absoluteFill}
              colors={['transparent', 'black', 'transparent']}
            />
          }
        >
          <View style={[StyleSheet.absoluteFill, backgrounds.gray200]} />
        </MaskedView>
      </Reanimated.View>
    </MaskedView>
  );
};

export default SkeletonLoader;
