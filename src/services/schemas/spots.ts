import { z } from 'zod';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { SupplyDoc, supplySchema } from '@/services/schemas/supplies';

export const spotSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
});

export const spotWithSuppliesSchema = spotSchema.extend({
  supplies: z.array(supplySchema),
});

export type Spot = z.infer<typeof spotSchema>;
export type SpotWithSupplies = z.infer<typeof spotWithSuppliesSchema>;

export type SpotDoc = Omit<Spot, 'id'>;
export type SpotWithSuppliesDoc = Omit<SpotWithSupplies, 'id' | 'supplies'> & {
  supplies: FirebaseFirestoreTypes.DocumentReference<SupplyDoc>[];
};

export const spotPayloadSchema = spotSchema.omit({ id: true });
export type SpotPayload = z.infer<typeof spotPayloadSchema>;
