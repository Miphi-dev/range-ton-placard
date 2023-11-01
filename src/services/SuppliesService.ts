import firestore from '@react-native-firebase/firestore';
import { SupplyPayload } from '@/services/schemas/supplies';

const createSupplyInSpot = async (payload: {
  spotId: string;
  data: SupplyPayload;
}) => {
  try {
    const documentRef = await firestore()
      .collection('supplies')
      .add(payload.data);

    const response = await firestore()
      .collection('spots')
      .doc(payload.spotId)
      .update({
        supplies: firestore.FieldValue.arrayUnion(documentRef),
      });

    return Promise.resolve(response);
  } catch (e) {
    return Promise.reject(e);
  }
};

const getSupplyFromBarCode = async (barCode: string) => {
  const response = await fetch(
    `https://world.openfoodfacts.org/api/v2/product/${barCode}.json`
  );
  console.log('response status', response.status, typeof response.status);
  const data = await response.json();
  if (data.status === 0) {
    return Promise.reject('not found');
  }
  return Promise.resolve(data);
};

export default {
  createSupplyInSpot,
  getSupplyFromBarCode,
};
