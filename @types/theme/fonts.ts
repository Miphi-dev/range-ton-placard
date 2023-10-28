import { config } from '@/theme/theme.config';
import { staticFontStyles } from '@/theme/fonts';

import { ArrayValue, RemoveBeforeSeparator, ToNumber } from './common';
import { UnionConfiguration } from './config';

type FontSizesKeys = `font_${ArrayValue<typeof config.fonts.sizes>}`;

export type FontSizes = {
  [key in FontSizesKeys]: {
    fontSize: ToNumber<RemoveBeforeSeparator<key>>;
  };
};

type FontColorsKeys = `text_${keyof UnionConfiguration['fonts']['colors']}`;

export type FontColors = {
  [key in FontColorsKeys]: RemoveBeforeSeparator<key> extends keyof UnionConfiguration['fonts']['colors']
    ? {
        color: UnionConfiguration['fonts']['colors'][RemoveBeforeSeparator<key>];
      }
    : never;
};

export type Fonts = FontSizes & FontColors & typeof staticFontStyles;
