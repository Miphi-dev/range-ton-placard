import { z } from 'zod';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

export const supplySchema = z.object({
  name: z.string(),
  marque: z.string(),
});

export type Supply = z.infer<typeof supplySchema>;

type SupplyDoc = Omit<Supply, 'id'>;

export const spotSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  // supplies: z.array(supplySchema),
});

export type Spot = z.infer<typeof spotSchema>;

type SpotDoc = Omit<Spot, 'supplies'> & {
  supplies: FirebaseFirestoreTypes.DocumentReference<SupplyDoc>[];
};

const getSpots = async () => {
  const spotSnapshots = await firestore().collection<SpotDoc>('spots').get();
  const spots: Spot[] = [];

  spotSnapshots.forEach(spotRef => {
    spots.push(spotRef.data());
  });

  return Promise.resolve(spots);
};

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

export default {
  getSpots,
  // getSpot,
};
