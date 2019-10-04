import React from 'react';
import { LocaleContext } from './index';
import getDisplayName from 'utils/getDisplayName';

export default (WrappedComponent) => {
  const WithLocale = props => (
    <LocaleContext.Consumer>
      {localization => <WrappedComponent {...props} localization={localization} />}
    </LocaleContext.Consumer>
  );
  WithLocale.displayName = `WithLocale(${getDisplayName(WrappedComponent)})`;

  return WithLocale;
};
