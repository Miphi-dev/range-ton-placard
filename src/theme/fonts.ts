import { TextStyle } from 'react-native';
import { FontColors } from 'types/theme/fonts';
import { UnionConfiguration } from 'types/theme/config';
import { config } from '@/theme/theme.config';
import { FontSizes } from 'types/theme/fonts';

export const generateFontColors = (configuration: UnionConfiguration) => {
  return Object.entries(configuration.fonts.colors ?? {}).reduce(
    (acc, [key, value]) => {
      return Object.assign(acc, {
        [`text_${key}`]: {
          color: value,
        },
      });
    },
    {} as FontColors,
  );
};

export const generateFontSizes = () => {
  return config.fonts.sizes.reduce((acc, size) => {
    return Object.assign(acc, {
      [`font_${size}`]: {
        fontSize: size,
      },
    });
  }, {} as FontSizes);
};

export const staticFontStyles = {
  bold: {
    fontWeight: 'bold',
  },
  uppercase: {
    textTransform: 'uppercase',
  },
  capitalize: {
    textTransform: 'capitalize',
  },
  nationalLight: {
    fontFamily: 'National-Light',
  },
  nationalRegular: {
    fontFamily: 'National-Regular',
  },
  nationalBold: {
    fontFamily: 'National-Bold',
  },
} as const satisfies Record<string, TextStyle>;
