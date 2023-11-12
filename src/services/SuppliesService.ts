import firestore from '@react-native-firebase/firestore';
import {
  Supply,
  SupplyDoc,
  SupplyPayload,
  SupplyWithSpot,
} from '@/services/schemas/supplies';
import keywordsUtils from '@/utils/keywordsUtils';
import KeywordsUtils from '@/utils/keywordsUtils';
import { SpotDoc } from '@/services/schemas/spots';
import collectionPaths from '@/services/collectionPaths';

const createSupplyInSpot = async (payload: {
  spotId: string;
  data: SupplyPayload;
}) => {
  try {
    const keywords = keywordsUtils.createKeywords(payload.data.name);
    const documentRef = await firestore()
      .collection(collectionPaths.suppliesPath)
      .add({
        ...payload.data,
        keywords,
        spotId: payload.spotId,
      });

    const response = await firestore()
      .collection(collectionPaths.spotsPath)
      .doc(payload.spotId)
      .update({
        supplies: firestore.FieldValue.arrayUnion(documentRef),
      });

    return Promise.resolve(response);
  } catch (e) {
    return Promise.reject(e);
  }
};

const getSimilarSupplies = async (name: Supply['name']) => {
  const keywords = keywordsUtils.createKeywords(name);

  try {
    const response = await firestore()
      .collection<SupplyDoc>(collectionPaths.suppliesPath)
      .where(
        'keywords',
        'array-contains-any',
        KeywordsUtils.getTenKeywords(keywords)
      )
      .get();

    const similarSupplies: SupplyWithSpot[] = [];

    for (const doc of response.docs) {
      if (
        KeywordsUtils.jaccardSimilarity(keywords, doc.data().keywords) >= 0.3
      ) {
        const data = doc.data();
        const spotSnapshot = await firestore()
          .collection<SpotDoc>(collectionPaths.spotsPath)
          .doc(data.spotId)
          .get();

        similarSupplies.push({
          ...data,
          id: doc.id,
          spot: {
            id: data.spotId,
            name: spotSnapshot.data()?.name || '',
            description: spotSnapshot.data()?.description || '',
            keywords: spotSnapshot.data()?.keywords || [],
          },
        });
      }
    }
    console.log(similarSupplies);
    return Promise.resolve(similarSupplies);
  } catch (e) {
    return Promise.reject(e);
  }
};

const deleteSupplyInSpot = async (payload: {
  spotId: string;
  supplyId: string;
}) => {
  try {
    await firestore()
      .collection(collectionPaths.suppliesPath)
      .doc(payload.supplyId)
      .delete();
    const response = await firestore()
      .collection(collectionPaths.spotsPath)
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
    `https://world.openfoodfacts.org/api/v2/product/${barCode}.json`
  );
  const data = await response.json();
  if (data.status === 0) {
    return Promise.reject('not found');
  }
  return Promise.resolve(data);
};

const searchSupplies = async (payload: {
  spotId?: string;
  keyword: string;
}) => {
  try {
    let suppliesCollection = firestore().collection<SupplyDoc>(
      collectionPaths.suppliesPath
    );

    let suppliesQuery = null;

    if (payload.spotId) {
      suppliesQuery = suppliesCollection.where('spotId', '==', payload.spotId);
    }

    if (payload.keyword !== '') {
      suppliesQuery = suppliesCollection.where(
        'keywords',
        'array-contains-any',
        KeywordsUtils.normalizeString(payload.keyword).split(' ')
      );
    }

    const suppliesSnapshot = suppliesQuery
      ? await suppliesQuery.get()
      : await suppliesCollection.get();

    const supplies: Supply[] = [];

    suppliesSnapshot.forEach((doc) => {
      supplies.push({
        ...doc.data(),
        id: doc.id,
      });
    });

    // order by jaccard similarity
    supplies.sort((a, b) => {
      return (
        KeywordsUtils.jaccardSimilarity(
          KeywordsUtils.createKeywords(payload.keyword),
          b.keywords
        ) -
        KeywordsUtils.jaccardSimilarity(
            KeywordsUtils.createKeywords(payload.keyword),
            a.keywords
        )
      );
    });

    return Promise.resolve(supplies);
  } catch (e) {
    return Promise.reject(e);
  }
};

export default {
  createSupplyInSpot,
  getSimilarSupplies,
  getSupplyFromBarCode,
  deleteSupplyInSpot,
  searchSupplies,
};
