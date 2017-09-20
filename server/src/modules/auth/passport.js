import passport from 'passport';
import LocalStrategy from 'passport-local';

import AuthModel from './auth-model';

const localOpts = {
  usernameField: 'email',
};

const localLogin = new LocalStrategy(localOpts, async (email, password, done) => {
  try {
    const user = await AuthModel.findOne({ email });

    if (!user) {
      return done(null, false);
    } else if (!user.authenticateUser(password)) {
      return done(null, false);
    }

    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
});

passport.use(localLogin);

export const authLocal = passport.authenticate('local', { session: false });
