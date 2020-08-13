import axios from 'axios';

export const getArticle = async (id) => {
  const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/${id}`);

  const article = Object.entries(data.elements).reduce((res, [key, item]) => ({
    ...res,
    [key]: item.value || item.values,
  }), {});

  return article;
};
