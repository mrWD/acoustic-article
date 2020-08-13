import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount, configure } from 'enzyme';
import { act } from 'react-dom/test-utils';

import { getArticle } from '../../../actions/article';

import AppArticle from '../AppArticle';

configure({ adapter: new Adapter() });

jest.mock('../../../actions/article.js', () => ({
  getArticle: jest.fn().mockResolvedValue({
    heading: 'Article title',
    author: 'Article Author',
    body: ['<p>Article text</p>'],
    date: '2019-12-13T17:00:00Z',
    mainImage: {
      leadImage: {
        url: '/img-url.jpeg',
        renditions: {
          default: {
            width: 1600,
            url: '/img-url.jpeg',
          },
        },
      },
      leadImageCaption: {
        value: 'Image caption.',
      },
    },
  }),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    push: jest.fn(),
  }),
}));

describe('AppArticle', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = null;
  });

  test('renders without crashing', async () => {
    await act(async () => {
      wrapper = await shallow(<AppArticle />);
    });

    wrapper.update();

    expect(wrapper).toMatchSnapshot();
  });

  test('renders article content', async () => {
    await act(async () => {
      wrapper = await mount(<AppArticle />);
    });

    wrapper.update();


    expect(wrapper).toMatchSnapshot();
  });

  test('returns errors', async () => {
    getArticle.mockRejectedValueOnce({
      response: {
        status: 404,
      },
    });

    await act(async () => {
      wrapper = await mount(<AppArticle />);
    });

    wrapper.update();

    expect(wrapper).toMatchSnapshot();
  });
});
