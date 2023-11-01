import { z } from 'zod';

export const supplySchema = z.object({
  id: z.string(),
  name: z.string(),
  marque: z.string(),
});

export type Supply = z.infer<typeof supplySchema>;

export type SupplyDoc = Omit<Supply, 'id'>;

export const supplyPayloadSchema = supplySchema.omit({ id: true });
export type SupplyPayload = z.infer<typeof supplyPayloadSchema>;