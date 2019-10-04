import React from 'react';
import PageObject from 'utils/test/pageObject';
import Modal from '..';

const props = {
  children: <div />,
};

const page = (new PageObject(props)).setComponent(Modal, false);

describe('Check if the <Modal /> component rendered',
  () => {
    document.body.innerHTML = '<div id="root"></div><div id="modal-root"></div>';
    it('+++ render correctly component', () => {
      expect(page.getShallowRendered()).toMatchSnapshot();
    });
  });
