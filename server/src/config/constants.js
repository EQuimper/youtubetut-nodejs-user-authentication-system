const defaultConfig = {
  PORT: process.env.PORT || 8000,
};

const config = {
  development: {
    DB_URL: 'mongodb://localhost/user-authentication-dev',
  },
  production: {
    DB_URL: 'mongodb://localhost/user-authentication-prod',
  },
};

function getEnv(env) {
  return config[env];
}

export default {
  ...defaultConfig,
  ...getEnv(process.env.NODE_ENV),
};
