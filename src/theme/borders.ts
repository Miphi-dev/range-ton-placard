import { BorderColors, BorderWidths } from 'types/theme/borders';
import { UnionConfiguration } from 'types/theme/config';
import { config } from '@/theme/theme.config';
import { BorderRadius } from 'types/theme/borders';

export const generateBorderColors = (configuration: UnionConfiguration) => {
  return Object.entries(configuration.borders.colors ?? {}).reduce(
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

export const generateBorderWidths = () => {
  return config.borders.widths.reduce((acc, width) => {
    return Object.assign(acc, {
      [`border_${width}`]: {
        borderWidth: width,
      },
      [`borderTop_${width}`]: {
        borderTopWidth: width,
      },
      [`borderBottom_${width}`]: {
        borderBottomWidth: width,
      },
      [`borderLeft_${width}`]: {
        borderLeftWidth: width,
      },
      [`borderRight_${width}`]: {
        borderRightWidth: width,
      },
    });
  }, {} as BorderWidths);
};
