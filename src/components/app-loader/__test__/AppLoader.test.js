import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

import AppLoader from '../AppLoader';

configure({ adapter: new Adapter() });

describe('AppLoader', () => {
  test('renders without crashing', () => {
    const wrapper = shallow(<AppLoader />);
    expect(wrapper).toMatchSnapshot();
  });
});
