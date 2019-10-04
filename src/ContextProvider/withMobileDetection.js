import React from 'react';
import getDisplayName from 'utils/getDisplayName';
import { MobileDetectContext } from './index';

export default (WrappedComponent) => {
  const WithMobileDetection = props => (
    <MobileDetectContext.Consumer>
      {mobileDetect => <WrappedComponent {...props} mobileDetect={mobileDetect} />}
    </MobileDetectContext.Consumer>
  );
  WithMobileDetection.displayName = `WithMobileDetection(${getDisplayName(WrappedComponent)})`;

  return WithMobileDetection;
};
