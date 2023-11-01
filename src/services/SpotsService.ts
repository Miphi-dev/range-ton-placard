import { z } from 'zod';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import { Supply, SupplyDoc, supplySchema } from '@/services/SuppliesService';

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

type SpotDoc = Omit<Spot, 'id'>;
type SpotWithSuppliesDoc = Omit<SpotWithSupplies, 'id' | 'supplies'> & {
  supplies: FirebaseFirestoreTypes.DocumentReference<SupplyDoc>[];
};

export const spotPayloadSchema = spotSchema.omit({ id: true });
export type SpotPayload = z.infer<typeof spotPayloadSchema>;

const getSpots = async () => {
  try {
    const spotSnapshots = await firestore().collection<SpotDoc>('spots').get();
    const spots: Spot[] = [];

    spotSnapshots.forEach(spotRef => {
      spots.push({ ...spotRef.data(), id: spotRef.id });
    });

    return Promise.resolve(spots.sort((a, b) => a.name.localeCompare(b.name)));
  } catch (e) {
    return Promise.reject(e);
  }
};

const getSpot = async (id: string) => {
  try {
    const spotSnapshot = await firestore()
      .collection<SpotWithSuppliesDoc>('spots')
      .doc(id)
      .get();
    const spot = spotSnapshot.data();

    const suppliesPromises: Promise<
      FirebaseFirestoreTypes.DocumentSnapshot<SupplyDoc>
    >[] = [];

    spot?.supplies.forEach(supply => {
      suppliesPromises.push(supply.get());
    });

    const foo = await Promise.all(suppliesPromises);
    const supplies = foo
      .map(supply => {
        const data = supply.data();
        const unknownSupply = {
          id: supply.id,
          ...data,
        };

        if (supplySchema.safeParse(unknownSupply).success) {
          return supplySchema.parse(unknownSupply);
        }
        return null;
      })
      .filter(supply => supply !== null) as Supply[];

    return Promise.resolve({ ...spot, supplies });
  } catch (e) {
    return Promise.reject(e);
  }
};

const createSpot = async (data: SpotPayload) => {
  try {
    const response = await firestore()
      .collection('spots')
      .doc()
      .set({ ...data, supplies: [] });
    return Promise.resolve(response);
  } catch (e) {
    return Promise.reject(e);
  }
};

const updateSpot = async (id: string, data: Partial<SpotPayload>) => {
  try {
    const response = await firestore().collection('spots').doc(id).update(data);
    return Promise.resolve(response);
  } catch (e) {
    return Promise.reject(e);
  }
};

const deleteSpot = async (id: string) => {
  try {
    const response = await firestore().collection('spots').doc(id).delete();
    return Promise.resolve(response);
  } catch (e) {
    return Promise.reject(e);
  }
};

export default {
  getSpots,
  createSpot,
  deleteSpot,
  updateSpot,
  getSpot,
};

// export const supplySchema = z.object({
//   name: z.string(),
//   marque: z.string(),
// });
//
// export type Supply = z.infer<typeof supplySchema>;
//
// type SupplyDoc = Omit<Supply, 'id'>;

// const getSpot = async () => {
//   const spotSnapshots = await firestore().collection<SpotDoc>('spots').get();
//   const spots: Spot[] = [];
//
//   spotSnapshots.forEach(spotRef => {
//     const suppliesPromises: Promise<
//       FirebaseFirestoreTypes.DocumentSnapshot<Supply>
//     >[] = [];
//     const spotDoc = spotRef.data();
//
//     spotDoc.supplies.map(supplyDocRef => {
//       suppliesPromises.push(supplyDocRef.get());
//     });
//
//     Promise.all(suppliesPromises).then(suppliesSnapshot => {
//       const supplies = suppliesSnapshot
//         .map(supply => {
//           const data = supply.data();
//           if (supplySchema.safeParse(data).success) {
//             return supplySchema.parse(data);
//           }
//           console.log(data, supplySchema.safeParse(data).success);
//           return null;
//         })
//         .filter(supply => supply !== null) as Supply[];
//       console.log(supplies);
//
//       spots.push({
//         ...spotDoc,
//         supplies,
//       });
//     });
//   });
//
//   return Promise.resolve(spots);
// };
