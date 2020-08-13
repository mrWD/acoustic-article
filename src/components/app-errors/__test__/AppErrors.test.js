import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

import AppErrors from '../AppErrors';

configure({ adapter: new Adapter() });

describe('AppErrors', () => {
  test('renders without crashing', () => {
    shallow(<AppErrors />);
  });

  test('renders text', () => {
    const wrapper = shallow(<AppErrors errors="Error text" />);

    expect(wrapper.text()).toBe('Error text');
    expect(wrapper).toMatchSnapshot();
  });
});
