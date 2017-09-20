import { Router } from 'express';

import * as authController from './auth-controller';

const routes = new Router();

routes.post('/register', authController.signup);

export default routes;
