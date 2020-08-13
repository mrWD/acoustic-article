import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import AppArticle from './components/app-article/AppArticle';

const App = () => (
  <BrowserRouter>
    <div className="container">
      <Route exact path="/">
        <Redirect to={`/${process.env.REACT_APP_DEFAULT_PRODUCT_ID}`} />
      </Route>

      <Route path="/:id" component={AppArticle} />
    </div>
  </BrowserRouter>
);

export default App;
