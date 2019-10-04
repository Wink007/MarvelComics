import React from 'react';
import { bool, object, oneOfType, shape, string } from 'prop-types';

// Custom
import withMobileDetection from 'ContextProvider/withMobileDetection';
import withLocale from 'ContextProvider/withLocale';

// Styles
import styles from './styles.module.scss';

const HomePage = ({
  match: { path },
  localization,
  localization: {locale},
  mobileDetect: { isMobile, isTablet },
}) => {

  return (
    <div className={styles.HomePage}>
      <h1>HOME PAGE</h1>
    </div>
  );
}

HomePage.propTypes = {
  localization: object.isRequired,
  match: object.isRequired,
  mobileDetect: shape({
    isMobile: bool,
    isPhone: bool,
    isTablet: bool,
    os: oneOfType([bool, string]),
  }).isRequired,
};

export default withLocale(withMobileDetection(HomePage));
