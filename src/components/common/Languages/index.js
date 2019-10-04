import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { bool, func, string } from 'prop-types';

// Custom
import config from 'config';
import trans from 'i18ns';

// Styles
import styles from './styles.module.scss';

function Languages({
  isMobile,
  isTablet,
  pathname,
  updateState,
  locale,
}) {
  return (
    <div className={classnames(styles.Languages, {
      [styles.tablet]: isMobile && isTablet,
      [styles.mobile]: isMobile && !isTablet,
    })}>
      {config.locales.map(({label, localePath, id}) => (
        <Link
          to={`${localePath}${pathname === '/' ? '' : pathname}`}
          href
          onClick={() => updateState('locale', label)}
          key={id}
        >
          <span>{trans(['locale', label], locale)}</span>
        </Link>
      ))}
    </div>
  );
}

Languages.propTypes = {
  isMobile: bool.isRequired,
  isTablet: bool.isRequired,
  locale: string.isRequired,
  pathname: string.isRequired,
  updateState: func.isRequired,
};

export default Languages;
