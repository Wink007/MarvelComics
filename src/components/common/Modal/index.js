/**
 *  Wrap <Modal> over the component you need to show in modal
 *  <Modal> component should have a single child <ModalWrapper>
 *  which handles modal closing and common styles
 * */

// Core
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { node } from 'prop-types';

export default class Modal extends Component {
  static propTypes = {
    children: node,
  };

  static defaultProps = {
    children: <div />,
  };

  state = {
    isInitialized: false,
  };

  componentDidMount() {
    this.root = document.getElementById('root');
    this.modalRoot = document.getElementById('modal-root');

    this.element = document.createElement('div');
    this.element.classList.add('modal');

    this.modalRoot.appendChild(this.element);
    this.root.style.position = 'fixed';

    this.handleInitializationEnd();
  }

  componentWillUnmount() {
    this.modalRoot.removeChild(this.element);
    this.root.style.position = 'static';
  }

  handleInitializationEnd = () => {
    this.setState(() => ({
      isInitialized: true,
    }));
  };

  render() {
    const { children } = this.props;
    const { isInitialized } = this.state;
    return (
      isInitialized
        ? ReactDOM.createPortal(children, this.element)
        : null
    );
  }
}
