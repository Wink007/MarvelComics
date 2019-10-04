import PageObject from 'utils/test/pageObject';
import ModalWrapper from '../ModalWrapper';

const props = {
  background: false,
  children: null,
  onClick: jest.fn(),
};

jest.mock('utils/ContextProviderHelpers/detectMobile');
const mobileDetect = require('utils/ContextProviderHelpers/detectMobile').default;

mobileDetect.mockReturnValue({
  isMobile: false,
  isPhone: false,
  os: true,
});

const page = (new PageObject(props)).setComponent(ModalWrapper, false);
const wrapper = page.getShallowRendered();
let pageTwo;
let wrapperTwo;

describe('Check if the <ModalWrapper /> component rendered',
  () => {
    it('+++ render correctly component', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('+++ check onClick', () => {
      wrapper.find('.ModalWrapper').simulate('click');
      expect(props.onClick).toHaveBeenCalled();
    });

    it('+++ check attribute if background: true', () => {
      wrapper.setProps({
        background: true,
      });
      expect(wrapper.find('.ModalWrapper').props()).toHaveProperty(
        'data-background',
        'true',
      );
    });

    it('+++ check data-device attr for desktop', () => {
      expect(wrapper.find('.ModalWrapper').prop('data-device')).toEqual('desktop');
      wrapper.unmount();
      mobileDetect.mockClear();
    });

    it('+++ check data-device attr for mobile', () => {
      mobileDetect.mockReturnValue({
        isMobile: true,
        isPhone: true,
        os: false,
      });
      pageTwo = (new PageObject(props)).setComponent(ModalWrapper, false);
      wrapperTwo = pageTwo.getShallowRendered();
      expect(wrapperTwo.find('.ModalWrapper').prop('data-device')).toEqual('mobile');
    });
  });
