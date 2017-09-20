import bodyParser from 'body-parser';

const isDev = process.env.NODE_ENV === 'development';

export default app => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  if (isDev) {
    const morgan = require('morgan');

    app.use(morgan('dev'));
  }
};
