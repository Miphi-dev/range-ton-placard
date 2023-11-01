import { z } from 'zod';

export const supplySchema = z.object({
  id: z.string(),
  name: z.string(),
  marque: z.string(),
  keywords: z.array(z.string()),
  spotId: z.string(),
});

export type Supply = z.infer<typeof supplySchema>;

export type SupplyDoc = Omit<Supply, 'id'>;

export const supplyPayloadSchema = supplySchema.omit({
  id: true,
  spotId: true,
  keywords: true,
});
export type SupplyPayload = z.infer<typeof supplyPayloadSchema>;
