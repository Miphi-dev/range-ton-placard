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
    purple900: '#211834',
    primaryBlue: '#2DD8E9',
    primaryPurple: '#BC5DC8',
    secondaryBlue: '#334680',
    secondaryPurple: '#77386D',
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
