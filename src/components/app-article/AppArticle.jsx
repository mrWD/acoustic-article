import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';

import { getArticle } from '../../actions/article';
import { getMsgByError } from '../../helpers/getMsgByError';

import AppPicture from '../app-picture/AppPicture';
import AppLoader from '../app-loader/AppLoader';
import AppErrors from '../app-errors/AppErrors';

import './AppArticle.css';

const AppArticle = () => {
  const { id } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [errors, setErrors] = useState('');
  const [article, setArticle] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const article = await getArticle(id);

        setArticle(article);
      } catch (error) {
        const errorMsg = getMsgByError(error.response.status);

        setErrors(errorMsg);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (isLoading) {
    return <AppLoader />;
  }

  if (errors) {
    return <AppErrors errors={errors} />;
  }

  const body = article.body?.join('');
  const date = moment(article.date).format('DD.MM.YYYY');

  return (
    <article className="AppArticle">
      <h1 className="AppArticle__title">
        {article.heading}
      </h1>

      <AppPicture
        className="AppArticle__img"
        leadImage={article.mainImage?.leadImage}
        altText={article.mainImage?.leadImageCaption.value}
      />
  
      <div className="AppArticle__content-wrapper">
        <span className="AppArticle__info">
          {article.author}
        </span>
  
        <span className="AppArticle__info">
          {date}
        </span>

        <div
          className="AppArticle__text"
          dangerouslySetInnerHTML={{ __html: body }}
        ></div>
      </div>
    </article>
  );
};

export default AppArticle;
