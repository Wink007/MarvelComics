import { get, isArray, isString } from 'lodash';
import translations from './translations';


const trans = (key, locale, defaultMessage = '') => {

  let k = key;
  let lc = locale;
  const defMsg = isString(defaultMessage) ? defaultMessage : '';

  if (!(isArray(k) || isString(k))) {
    console.error(`Key must be an Array or String, ${typeof k} given!`);
    return '';
  }
  if (!lc) {
    console.warn('Empty locale in translation method!');
    lc = 'en';
  }
  if (isArray(k)) {
    k = k.join('.');
  }

  return String(get(translations[lc], k, defMsg || k));
};

const choice = (key, locale, options = {}, defaultMessage = '') => (
  trans(key, locale, defaultMessage).replace(/{(\w+)}/g, (_, k) => options[k])
);

const capitalize = (key, locale) => {
  const translation = trans(key, locale);
  return translation.charAt(0).toUpperCase() + translation.slice(1);
};

const replaceInStr = (str, options = {}) => (
  str.replace(/{(\w+)}/g, (_, k) => options[k])
);

export default trans;

export { choice, capitalize, replaceInStr };
