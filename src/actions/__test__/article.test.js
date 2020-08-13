import axios from 'axios';

import { getArticle } from '../article';

jest.mock('axios', () => ({
  get: jest.fn().mockResolvedValue({
    data: {
      elements: {
        heading: {
          value: 'Article title',
        },
        author: {
          value: 'Article Author',
        },
        body: {
          values: ['<p>Article text</p>'],
        },
        date: {
          value: '2019-12-13T17:00:00Z',
        },
        mainImage: {
          value: {
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
        },
      },
    },
  }),
}));

describe('getArticle', () => {
  test('calls axios.get with process.env.REACT_APP_API_URL and "article-id"', () => {
    getArticle('article-id');

    expect(axios.get).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/article-id`);
  });

  test('returns mutated object', async () => {
    const result = await getArticle('article-id');
    const expected = {
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
    };

    expect(result).toEqual(expected);
  });
});
