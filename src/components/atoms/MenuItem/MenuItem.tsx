import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// Hooks
import useTheme from '@/theme/useTheme';

type Props = {
  title: string;
  onPress?: () => {};
  subtitle?: string;
};
const MenuItem = ({ title, subtitle, onPress }: Props) => {
  const { fonts, gutters, borders, layout, backgrounds } = useTheme();

  const getLocation = () => {
    const firstRand = Number.parseFloat(Math.random().toFixed(1));
    return [firstRand, firstRand + 0.3, 1];
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        style={[
          gutters.padding_16,
          borders.rounded_16,
          layout.row,
          layout.justifyBetween,
          layout.itemsCenter,
        ]}
        start={{
          x: 1,
          y: 1,
        }}
        end={{
          x: 0,
          y: 0,
        }}
        locations={getLocation()}
        colors={[
          backgrounds.purple700.backgroundColor,
          backgrounds.blue700.backgroundColor,
          backgrounds.pink800.backgroundColor,
        ]}
      >
        <View style={{ width: '90%' }}>
          <Text
            style={[
              fonts.text_white,
              fonts.nationalBold,
              fonts.font_16,
              gutters.marginBottom_8,
            ]}
          >
            {title}
          </Text>
          <Text style={[fonts.text_white, fonts.nationalLight, fonts.font_12]}>
            {subtitle}
          </Text>
        </View>
        <Text style={[fonts.text_white, fonts.nationalLight, fonts.font_32]}>
          {'>'}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

MenuItem.defaultProps = {
  subtitle: '',
  onPress: () => {},
};

export default MenuItem;
