import auth from '@react-native-firebase/auth';
import { z } from 'zod';

export const loginPayloadSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export type LoginPayload = z.infer<typeof loginPayloadSchema>;

const login = ({ email, password }: LoginPayload) =>
  auth().signInWithEmailAndPassword(email, password);

const logout = () => auth().signOut();

export const resetPasswordPayloadSchema = loginPayloadSchema.pick({ email: true });
export type ResetPasswordPayload = z.infer<typeof loginPayloadSchema>;

const sendResetPasswordEmail = ({email}: ResetPasswordPayload) => auth().sendPasswordResetEmail(email);

export const confirmResetPasswordPayloadSchema = loginPayloadSchema.pick({ password: true }).extend({
  oobCode: z.string(),
});
export type ConfirmResetPasswordPayload = z.infer<typeof confirmResetPasswordPayloadSchema>;
const confirmPasswordReset = ({oobCode, password}: ConfirmResetPasswordPayload) => auth().confirmPasswordReset(oobCode, password);

export default {
  login,
  logout,
  sendResetPasswordEmail,
  confirmPasswordReset,
};
