import firestore from '@react-native-firebase/firestore';
import { SupplyPayload } from '@/services/schemas/supplies';

const createSupplyInSpot = async (payload: {
  id: string;
  data: SupplyPayload;
}) => {
  try {
    const documentRef = await firestore()
      .collection('supplies')
      .add(payload.data);

    const response = await firestore()
      .collection('spots')
      .doc(payload.id)
      .update({
        supplies: firestore.FieldValue.arrayUnion(documentRef),
      });

    return Promise.resolve(response);
  } catch (e) {
    return Promise.reject(e);
  }
};

export default {
  createSupplyInSpot,
};
