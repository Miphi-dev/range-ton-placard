import auth from '@react-native-firebase/auth';
import { z } from 'zod';

export const loginOrRegisterPayloadSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export type LoginOrRegisterPayload = z.infer<typeof loginOrRegisterPayloadSchema>;

const login = ({ email, password }: LoginOrRegisterPayload) =>
  auth().signInWithEmailAndPassword(email, password);

const logout = () => auth().signOut();

export const resetPasswordPayloadSchema = loginOrRegisterPayloadSchema.pick({ email: true });
export type ResetPasswordPayload = z.infer<typeof loginOrRegisterPayloadSchema>;

const sendResetPasswordEmail = ({email}: ResetPasswordPayload) => auth().sendPasswordResetEmail(email);

export const confirmResetPasswordPayloadSchema = loginOrRegisterPayloadSchema.pick({ password: true }).extend({
  oobCode: z.string(),
});
export type ConfirmResetPasswordPayload = z.infer<typeof confirmResetPasswordPayloadSchema>;
const confirmPasswordReset = ({oobCode, password}: ConfirmResetPasswordPayload) => auth().confirmPasswordReset(oobCode, password);


const register = ({email, password}: LoginOrRegisterPayload) => auth().createUserWithEmailAndPassword(email, password);


export default {
  login,
  logout,
  sendResetPasswordEmail,
  confirmPasswordReset,
  register
};
