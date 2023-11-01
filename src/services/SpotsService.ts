import { z } from 'zod';
import firestore from '@react-native-firebase/firestore';

export const spotSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  // supplies: z.array(supplySchema),
});

export type Spot = z.infer<typeof spotSchema>;
type SpotDoc = Omit<Spot, 'id'>;

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

const createSpot = async (data: SpotPayload) => {
  try {
    const response = await firestore().collection('spots').doc().set(data);
    return Promise.resolve(response);
  } catch (e) {
    return Promise.reject(e);
  }
};
export default {
  getSpots,
  createSpot,
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
