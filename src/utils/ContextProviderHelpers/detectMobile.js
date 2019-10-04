import { canUseDOM } from 'utils/DOM';
import MobileDetect from 'mobile-detect';

export default () => {
  if (canUseDOM()) {
    const md = new MobileDetect(window.navigator.userAgent);

    return {
      isMobile: !!md.mobile(),
      isPhone: !!md.phone(),
      isTablet: !!md.tablet(),
      os: md.os(),
    };
  }

  return {
    isMobile: false,
    isPhone: false,
    isTablet: false,
    os: false,
  };
};
