import AuthModel from './auth-model';
import { authLocal, authJwt } from './passport';

class AuthServices {
  register({ email, password, username }) {
    if (!email) {
      throw new Error('Email is required');
    } else if (!password) {
      throw new Error('Password is required');
    } else if (!username) {
      throw new Error('Username is required');
    }

    try {
      return AuthModel.create({ email, password, username });
    } catch (error) {
      throw error;
    }
  }

  loginMiddleware(req, res, next) {
    return authLocal(req, res, next);
  }

  jwtMiddleware(req, res, next) {
    return authJwt(req, res, next);
  }
}

export default new AuthServices();
