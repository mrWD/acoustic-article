import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

import AppPicture, { getImgUrl } from '../AppPicture';

configure({ adapter: new Adapter() });

describe('AppPicture', () => {
  test('renders without crashing', () => {
    shallow(<AppPicture />);
  });

  test('returns empty object, if leadImage is undefined, boolean or object without url and renditions', () => {
    const wrapperWithNull = shallow(<AppPicture />);
    const wrapperWithEmptyObject = shallow(<AppPicture leadImage={{}} />);

    expect(wrapperWithNull).toEqual({});
    expect(wrapperWithEmptyObject).toEqual({});
  });

  test('renders content without source tags, if leadImage does not have renditions', () => {
    const leadImage = { url: '/img-url.jpeg' };
    const wrapper = shallow(<AppPicture leadImage={leadImage} />);

    expect(wrapper.find('source')).toHaveLength(0);
    expect(wrapper).toMatchSnapshot();
  });

  test('renders content with source tags, if leadImage has renditions', () => {
    const leadImage = {
      url: '/img-url.jpeg',
      renditions: {
        default: {
          width: 1600,
          url: '/img-url.jpeg',
        },
        card: {
          width: 800,
          url: '/img-url-800.jpeg',
        },
      },
    };

    const wrapper = shallow(<AppPicture leadImage={leadImage} />);

    expect(wrapper.find('source')).toHaveLength(2);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('getImgUrl', () => {
  test('returns process.env.REACT_APP_DESTINATION_URL + passed url', () => {
    const result = getImgUrl('/img-url.jpeg');

    expect(result).toBe(`${process.env.REACT_APP_DESTINATION_URL}/img-url.jpeg`);
  });
});
