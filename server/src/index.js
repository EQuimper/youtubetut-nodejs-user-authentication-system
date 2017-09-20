/* eslint-disable no-console */

import express from 'express';

import constants from './config/constants';
import './config/db';
import middlewares from './config/middlewares';
import Routes from './modules';

const app = express();

middlewares(app);

app.use('/api/v1', Routes);

app.listen(constants.PORT, (err) => {
  if (err) {
    throw err;
  }

  console.log(`Server running on port: ${constants.PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});
