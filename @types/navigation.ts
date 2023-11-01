import { StackScreenProps } from '@react-navigation/stack';
import { Spot } from '@/services/SpotsService';

export type ApplicationPublicStackParamList = {
  Login: undefined;
};

export type ApplicationPrivateStackParamList = {
  Home: undefined;
  SpotForm: undefined | { data?: Spot };
  SpotDetails: { id: string };
};

export type ApplicationPublicScreenProps<
  S extends keyof ApplicationPublicStackParamList = keyof ApplicationPublicStackParamList
> = StackScreenProps<ApplicationPublicStackParamList, S>;

export type ApplicationPrivateScreenProps<
  S extends keyof ApplicationPrivateStackParamList = keyof ApplicationPrivateStackParamList
> = StackScreenProps<ApplicationPrivateStackParamList, S>;
