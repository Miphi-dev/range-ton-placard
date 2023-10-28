import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import * as fr from './fr';

type TupleUnion<U extends string, R extends any[] = []> = {
  [S in U]: Exclude<U, S> extends never
    ? [...R, S]
    : TupleUnion<Exclude<U, S>, [...R, S]>;
}[U];

const ns = Object.keys(fr) as TupleUnion<keyof typeof fr>;

export const defaultNS = ns[0];

i18n.use(initReactI18next).init({
  ns,
  defaultNS,
  resources: {
    fr,
  },
  lng: 'fr',
  fallbackLng: 'fr',
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  compatibilityJSON: 'v3',
});

export default i18n;
