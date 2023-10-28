import { DefaultTheme } from '@react-navigation/native';

import { ThemeConfiguration } from 'types/theme/config';

const colors = {
  gray200: '#5C4E69',
  blue700: '#43308A',
  blue500: '#2DD8E9',
  purple900: '#211834',
  purple700: '#503974',
  purple500: '#BC5DC8',
  pink800: '#7A396C',
  white: '#FFFFFF',
} as const;
export const config = {
  fonts: {
    sizes: [8, 16, 24, 32, 40],
    colors,
  },
  gutters: [8, 16, 24, 32, 40],
  backgrounds: colors,
  borders: {
    widths: [1, 2],
    radius: [4, 16],
    colors,
  },
  navigationColors: {
    ...DefaultTheme.colors,
    background: '#211834',
    card: '#211834',
  },
  variants: {
    dark: {},
  },
} as const satisfies ThemeConfiguration;
