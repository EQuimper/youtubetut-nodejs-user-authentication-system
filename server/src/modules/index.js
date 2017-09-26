import { Router } from 'express';

import authRoutes from './auth';
import AuthServices from './auth/auth-services';

const routes = new Router();

routes.use('/auth', authRoutes);

routes.get('/helloworld', AuthServices.jwtMiddleware, (req, res) => {
  res.send('You are the user with id', req.user._id);
});

export default routes;
