/** @format */

import React from 'react';
import { Router } from 'react-router-dom';
import history from '@router/history';
import { setModel } from '@utils/hooksModel';
import { renderRoutes } from 'react-router-config';
import routes from '@router';
import models from '@models';

Array.isArray(models) && models.forEach(({ name, model }) => setModel(name, model));

const App = () => <Router history={history}>{renderRoutes(routes)}</Router>;

export default App;
