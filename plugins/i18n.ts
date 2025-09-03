import { useLanguage } from '~/assets/js/useLanguage';

export default defineNuxtPlugin(() => {
  const { t } = useLanguage();
  
  return {
    provide: {
      t
    }
  };
});