// Core
import { Map } from 'immutable';

export const canUseDOM = () => !!(
  !(typeof window === 'undefined')
  && window
  && window.document
  && window.document.createElement
);

export function openExtraWindow(slug, options = {}) {
  if (!canUseDOM()) return;
  if (typeof openExtraWindow.store === 'undefined') openExtraWindow.store = {};
  if (window.location.href.includes(slug)) return;
  const windowUrl = slug;
  const windowName = slug;
  const windowFeatures = `toolbar=no,scrollbars=yes,resizable=yes,top=20,left=20,width=${options.width
  || 768},height=${options.width || 768}`;

  if (
    !openExtraWindow.store[windowName]
    || openExtraWindow.store[windowName].closed
  ) {
    openExtraWindow.store[windowName] = window.open(
      windowUrl,
      windowName,
      windowFeatures,
    );
  } else {
    openExtraWindow.store[windowName].focus();
  }
}

export function withPathname(url) {
  if (canUseDOM()) {
    return `${url}${window.location.pathname}`;
  }
  return url;
}

export function gtmNoscript(config) {
  if (canUseDOM()) {
    const gtm = config.getIn(
      ['metrics', 'gtm_noscript'],
      Map({
        destination: 'body',
        tagName: 'noscript',
        body: '',
      }),
    );
    const noscript = document.querySelector(`${gtm.get('destination')} > ${gtm.get('tagName')}`);

    if (noscript) noscript.innerHTML = `${gtm.get('body')}`;
  }
}

export function ifError(error = Map()) {
  const errorCode = error instanceof Map && error.get('code');
  return errorCode ? `/${errorCode}` : '';
}

export default {
  canUseDOM,
  openExtraWindow,
  gtmNoscript,
  ifError,
};
