import { createI18n } from 'vue-i18n';
import { localeMap } from './config';
import { setHtmlPageLang, setLoadLocalePool } from './helper';
// import type { App } from 'vue';
import { useLocaleStoreWithOut } from '@/stores/modules/locale';
import Zh_CN from "@/locales/lang/zh_CN";
import en_US from "@/locales/lang/en_US";

function createI18nOptions() {
  const localeStore = useLocaleStoreWithOut();
  const locale = localeStore.getLocale;
  // const defaultLocal = await import(`./lang/${locale}.ts`);
  // const message = defaultLocal.default?.message ?? {};

  setHtmlPageLang(locale);
  setLoadLocalePool((loadLocalePool) => {
    loadLocalePool.push(locale);
  });

  return {
    locale,
    fallbackLocale: localeMap.zh_CN, // set fallback locale
    messages: {
      zh_CN: Zh_CN,
      en_US
    },
    globalInjection: true,
    silentTranslationWarn: true, // true - warning off
    missingWarn: false,
    silentFallbackWarn: true,
    // 修复组件引入i18n时vite脚手架报错的问题
    legacy: false
  };
}

const options = createI18nOptions();
export const i18n = createI18n(options);

// setup i18n instance with global
// export async function setupI18n(app: App) {
  // app.use(i18n);
// }
