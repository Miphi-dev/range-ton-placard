import { StackScreenProps } from '@react-navigation/stack';
import { Spot } from '@/services/schemas/spots';
import { SupplyPayload } from '@/services/schemas/supplies';

export type ApplicationPublicStackParamList = {
  Login: undefined;
};

export type ApplicationPrivateStackParamList = {
  Home: undefined;
  SpotForm: undefined | { data?: Spot };
  SpotDetails: { id: string };
  SupplyForm: { spotId: string; defaultValues?: Partial<SupplyPayload> };
};

export type ApplicationPublicScreenProps<
  S extends keyof ApplicationPublicStackParamList = keyof ApplicationPublicStackParamList
> = StackScreenProps<ApplicationPublicStackParamList, S>;

export type ApplicationPrivateScreenProps<
  S extends keyof ApplicationPrivateStackParamList = keyof ApplicationPrivateStackParamList
> = StackScreenProps<ApplicationPrivateStackParamList, S>;
