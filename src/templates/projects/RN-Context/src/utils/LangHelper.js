import i18n from 'i18n-js';
import memoize from 'lodash.memoize'; // Use for caching/memoize for better performance
import { I18nManager } from 'react-native';
import * as RNLocalize from 'react-native-localize';
import RNRestart from 'react-native-restart';

export const translationGetters = {
  // lazy requires (metro bundler does not support symlinks)
  ar: () => require('../locales/ar.json'),
  en: () => require('../locales/en.json'),
};
const isRTL_ = ['ar'];
export const isRTL_Lang = (l) => { return isRTL_.includes(l) }
export const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key),
);

export const setI18nConfig = async (languageTag_inp) => {
  // fallback if no available language fits
  const fallback = { languageTag: 'en', isRTL: false };
  const force = languageTag_inp
    ? {
      languageTag: languageTag_inp,
      isRTL: isRTL_Lang(languageTag_inp),
    }
    : false;
  const { languageTag, isRTL } =
    force ||
    RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
    fallback;
  // clear translation cache
  translate.cache.clear();
  // update layout direction
  if (!isRTL) {
    if (I18nManager.isRTL) {
      await I18nManager.forceRTL(false);
      RNRestart.Restart();
    }
  } else {
    if (!I18nManager.isRTL) {
      await I18nManager.forceRTL(true);
      RNRestart.Restart();
    }
  }
  // await I18nManager.forceRTL(isRTL);
  // set i18n-js config
  i18n.translations = { [languageTag]: translationGetters[languageTag]() };
  console.log('Language::', languageTag, isRTL);
  i18n.locale = languageTag;
};
