import auth from '@react-native-firebase/auth';
import { z } from 'zod';

export const loginPayloadSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export type LoginPayload = z.infer<typeof loginPayloadSchema>;

const login = ({ email, password }: LoginPayload) =>
  auth().signInWithEmailAndPassword(email, password);

export default {
  login,
};
