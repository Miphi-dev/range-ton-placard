import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {
  Spot,
  SpotDoc,
  SpotPayload,
  SpotWithSuppliesDoc,
} from '@/services/schemas/spots';
import { Supply, SupplyDoc, supplySchema } from '@/services/schemas/supplies';
import collectionPaths from '@/services/collectionPaths';

const getSpots = async () => {
  try {
    const spotSnapshots = await firestore()
      .collection<SpotDoc>(collectionPaths.spotsPath)
      .get();
    const spots: Spot[] = [];

    spotSnapshots.forEach((spotRef) => {
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
      .collection<SpotWithSuppliesDoc>(collectionPaths.spotsPath)
      .doc(id)
      .get();
    const spot = spotSnapshot.data();

    const suppliesPromises: Promise<
      FirebaseFirestoreTypes.DocumentSnapshot<SupplyDoc>
    >[] = [];

    spot?.supplies.forEach((supply) => {
      suppliesPromises.push(supply.get());
    });

    const foo = await Promise.all(suppliesPromises);
    const supplies = foo
      .map((supply) => {
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
      .filter((supply) => supply !== null) as Supply[];

    supplies.sort((a, b) => a.name.localeCompare(b.name));

    return Promise.resolve({ ...spot, supplies });
  } catch (e) {
    return Promise.reject(e);
  }
};

const createSpot = async (data: SpotPayload) => {
  try {
    const response = await firestore()
      .collection(collectionPaths.spotsPath)
      .add({ ...data, supplies: [] });
    return Promise.resolve(response);
  } catch (e) {
    return Promise.reject(e);
  }
};

const updateSpot = async (payload: {
  id: string;
  data: Partial<SpotPayload>;
}) => {
  try {
    const response = await firestore()
      .collection(collectionPaths.spotsPath)
      .doc(payload.id)
      .update(payload.data);
    return Promise.resolve(response);
  } catch (e) {
    return Promise.reject(e);
  }
};

const deleteSpot = async (id: string) => {
  try {
    const response = await firestore()
      .collection(collectionPaths.spotsPath)
      .doc(id)
      .delete();
    const suppliesSnapshot = await firestore()
      .collection(collectionPaths.suppliesPath)
      .where('spotId', '==', id)
      .get();

    suppliesSnapshot.forEach((supplyRef) => {
      supplyRef.ref.delete();
    });

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
//           return null;
//         })
//         .filter(supply => supply !== null) as Supply[];
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
