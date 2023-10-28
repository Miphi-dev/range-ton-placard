import * as fr from '@/translations/fr';
import { defaultNS } from '@/translations';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: typeof fr;
  }
}
