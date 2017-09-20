import { Router } from 'express';

import authRoutes from './auth';

const routes = new Router();

routes.use('/auth', authRoutes);

export default routes;
