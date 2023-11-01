import firestore from '@react-native-firebase/firestore';
import { Supply, SupplyDoc, SupplyPayload } from '@/services/schemas/supplies';
import keywordsUtils from '@/utils/keywordsUtils';

const createSupplyInSpot = async (payload: {
  spotId: string;
  data: SupplyPayload;
}) => {
  try {
    const keywords = keywordsUtils.createKeywords(payload.data.name);
    const documentRef = await firestore()
      .collection('supplies')
      .add({
        ...payload.data,
        keywords,
        spotId: payload.spotId,
      });

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

const deleteSupplyInSpot = async (payload: {
  spotId: string;
  supplyId: string;
}) => {
  try {
    await firestore().collection('supplies').doc(payload.supplyId).delete();
    const response = await firestore()
      .collection('spots')
      .doc(payload.spotId)
      .update({
        supplies: firestore.FieldValue.arrayRemove(payload.supplyId),
      });
    return Promise.resolve(response);
  } catch (e) {
    return Promise.reject(e);
  }
};

const getSupplyFromBarCode = async (barCode: string) => {
  const response = await fetch(
    `https://world.openfoodfacts.org/api/v2/product/${barCode}.json`,
  );
  console.log('response status', response.status, typeof response.status);
  const data = await response.json();
  if (data.status === 0) {
    return Promise.reject('not found');
  }
  return Promise.resolve(data);
};

const searchSupplies = async (payload: { spotId: string; keyword: string }) => {
  try {
    let suppliesQuery = firestore()
      .collection<SupplyDoc>('supplies')
      .where('spotId', '==', payload.spotId);

    if (payload.keyword !== '') {
      suppliesQuery = suppliesQuery.where(
        'keywords',
        'array-contains',
        payload.keyword,
      );
    }

    const suppliesSnapshot = await suppliesQuery.get();

    const supplies: Supply[] = [];

    suppliesSnapshot.forEach(doc => {
      supplies.push({
        ...doc.data(),
        id: doc.id,
      });
    });

    return Promise.resolve(supplies);
  } catch (e) {
    return Promise.reject(e);
  }
};

export default {
  createSupplyInSpot,
  getSupplyFromBarCode,
  deleteSupplyInSpot,
  searchSupplies,
};
