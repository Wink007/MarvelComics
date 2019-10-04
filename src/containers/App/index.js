// Core
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { object } from 'prop-types';
import { connect } from 'react-redux';

// Custom
import {
  MobileDetectContext,
  LocaleContext,
} from 'ContextProvider';
import getLocaleSwitcher from 'utils/ContextProviderHelpers/getLocaleSwitcher';
import detectMobile from 'utils/ContextProviderHelpers/detectMobile';
import config from '../../config';
import routes from 'routes';

// Styles
import 'sanitize.css/sanitize.css';
import 'themes/theme-default.scss';
import { fetchCharacters } from 'store/actions/app';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locale: config.locale,
    };
  }

  componentDidMount() {
    const { handleGetData } = this.props;
    handleGetData();
  }

  updateState = (key, val) => {
    this.setState({[key]: val});
  };

  render() {
    const deviceDetect = detectMobile();
    const { locale } = this.state;
    const { location } = this.props;

    const isDevice = ({ isMobile, isTablet }) => {
      switch (true) {
        case isMobile && !isTablet:
          return 'mobile';
        case isMobile && isTablet:
          return 'tablet';
        default:
          return 'desktop';
      }
    }

    return (
      <MobileDetectContext.Provider value={deviceDetect}>
        <LocaleContext.Provider value={getLocaleSwitcher(config, location, locale, this.updateState )}>
          <div className="App" data-device={isDevice(deviceDetect)}>
            {routes(this)}
          </div>
        </LocaleContext.Provider>
      </MobileDetectContext.Provider>
    );
  }
}

export const mapDispatchToProps = dispatch => ({
  handleGetData: () => dispatch(fetchCharacters()),
});

App.propTypes = {
  location: object.isRequired,
};

export default withRouter(connect(null, mapDispatchToProps)(App));
