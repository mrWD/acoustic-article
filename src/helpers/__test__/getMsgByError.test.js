import { getMsgByError } from '../getMsgByError';

describe('getMsgByError', () => {
  test('returns text "Sorry, but the article does not exist! Try another article ID.", if pass status 404 as an argument.', () => {
    const result = getMsgByError(404);

    expect(result).toBe('Sorry, but the article does not exist! Try another article ID.');
  });

  test('returns text "Ooops! Something went wrong! Please, try later.", if pass status all other statuses as an argument.', () => {
    const result = getMsgByError(500);

    expect(result).toBe('Ooops! Something went wrong! Please, try later.');
  });
});
