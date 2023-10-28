import { DefaultTheme } from '@react-navigation/native';

import { ThemeConfiguration } from 'types/theme/config';

export const config = {
  fonts: {
    sizes: [16, 20, 40],
    colors: {
      gray200: '#5C4E69',
      white: '#FFF',
    },
  },
  gutters: [8, 16, 24, 32],
  backgrounds: {
    blue700: '#43308A',
    blue500: '#2DD8E9',
    purple900: '#211834',
    purple700: '#503974',
    purple500: '#BC5DC8',
    pink800: '#7A396C',
  },
  borders: {
    widths: [1],
    radius: [140],
    colors: {
      primaryBlue: '#2DD8E9',
    },
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
