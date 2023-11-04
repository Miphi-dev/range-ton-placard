import { z } from 'zod';
import { spotSchema } from '@/services/schemas/spots';

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

export const supplyWithSpotSchema = supplySchema
  .omit({
    spotId: true,
  })
  .extend({
    spot: spotSchema,
  });
export type SupplyWithSpot = z.infer<typeof supplyWithSpotSchema>;
