import { config } from '@/theme/theme.config';

import {
  ArrayValue,
  RemoveAfterSeparator,
  RemoveBeforeSeparator,
  ToNumber,
} from './common';
import { UnionConfiguration } from './config';

type BorderColorKeys =
  `border_${keyof UnionConfiguration['borders']['colors']}`;

export type BorderColors = {
  [key in BorderColorKeys]: RemoveBeforeSeparator<key> extends keyof UnionConfiguration['borders']['colors']
    ? {
        borderColor: UnionConfiguration['borders']['colors'][RemoveBeforeSeparator<key>];
      }
    : never;
};

type BorderRadiusKeys = `rounded_${ArrayValue<typeof config.borders.radius>}`;

export type BorderRadius = {
  [key in BorderRadiusKeys]: {
    borderRadius: ToNumber<RemoveBeforeSeparator<key>>;
  };
};

type BorderWidthKeys =
  | `border_${ArrayValue<typeof config.borders.widths>}`
  | `borderBottom_${ArrayValue<typeof config.borders.widths>}`
  | `borderTop_${ArrayValue<typeof config.borders.widths>}`
  | `borderRight_${ArrayValue<typeof config.borders.widths>}`
  | `borderLeft_${ArrayValue<typeof config.borders.widths>}`;

export type BorderWidths = {
  [key in BorderWidthKeys]: {
    [K in Extract<RemoveAfterSeparator<key>, BorderWidthKeys>]: ToNumber<
      RemoveBeforeSeparator<key>
    >;
  };
};

export type Borders = BorderColors & BorderRadius & BorderWidths;
