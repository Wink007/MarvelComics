/**
 * Use this component to
 * - handle modal closing event
 * - stopPropagation on the div that covers { children }
 * */

// Core
import React, { Component } from 'react';
import { func, node, bool } from 'prop-types';

// Custom
import detectMobile from 'utils/ContextProviderHelpers/detectMobile';

// Styles
import './styles.scss';


class ModalWrapper extends Component {
  static propTypes = {
    children: node,
    onClick: func.isRequired,
    background: bool,
  };

  static defaultProps = {
    background: false,
    children: null,
  };

  stopPropagation = (event) => {
    event.stopPropagation();
  };

  render() {
    const { children, onClick, background } = this.props;
    const deviceDetect = detectMobile();
    const { isMobile } = deviceDetect;
    return (
      <div // eslint-disable-line
        className="ModalWrapper"
        onClick={onClick}
        data-background={background ? 'true' : ''}
        data-device={isMobile ? 'mobile' : 'desktop'}
      >
        <div // eslint-disable-line
          onClick={this.stopPropagation}
        >
          {children}
        </div>
      </div>
    );
  }
}

export default ModalWrapper;
