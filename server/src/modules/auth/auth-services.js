import AuthModel from './auth-model';

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
}

export default new AuthServices();
