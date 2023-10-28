import { BorderColors } from 'types/theme/borders';
import { UnionConfiguration } from 'types/theme/config';
import { config } from '@/theme/theme.config';
import { BorderRadius } from 'types/theme/borders';

export const generateBorderColors = (configuration: UnionConfiguration) => {
  return Object.entries(configuration.borders ?? {}).reduce(
    (acc, [key, value]) => {
      return Object.assign(acc, {
        [`border_${key}`]: {
          borderColor: value,
        },
      });
    },
    {} as BorderColors,
  );
};

export const generateBorderRadius = () => {
  return config.borders.radius.reduce((acc, radius) => {
    return Object.assign(acc, {
      [`rounded_${radius}`]: {
        borderRadius: radius,
      },
    });
  }, {} as BorderRadius);
};

import { BorderWidths } from 'types/theme/borders';

export const generateBorderWidths = () => {
  return config.borders.widths.reduce((acc, width) => {
    return Object.assign(acc, {
      [`border_${width}`]: {
        borderWidth: width,
      },
    });
  }, {} as BorderWidths);
};
