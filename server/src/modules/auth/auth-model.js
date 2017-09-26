import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { hashSync, compareSync } from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';

import constants from '../../config/constants';

const AuthSchema = new Schema({
  email: {
    type: String,
    unique: true,
    trim: true,
    required: true,
    validate: {
      validator(email) {
        const emailRegex = /^[-a-z0-9%S_+]+(\.[-a-z0-9%S_+]+)*@(?:[a-z0-9-]{1,63}\.){1,125}[a-z]{2,63}$/i;
        return emailRegex.test(email);
      },
      message: '{VALUE} is not a valid email!',
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator(password) {
        return password.length >= 6 && password.match(/\d+/g);
      },
      message: 'Not a valid password!',
    },
  },
  username: String,
});

AuthSchema.plugin(uniqueValidator, {
  message: '{VALUE} already taken!',
});

AuthSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = this._hashPassword(this.password);
    return next();
  }

  return next();
});

AuthSchema.methods = {
  _hashPassword(password) {
    return hashSync(password);
  },

  authenticateUser(password) {
    return compareSync(password, this.password);
  },

  createToken() {
    return jwt.sign({ _id: this._id }, constants.JWT_SECRET);
  },

  toAuthJSON() {
    return {
      token: this.createToken(),
      ...this.toJSON(),
    };
  },

  // override the toJSON method for make sure we don't send password
  toJSON() {
    return {
      _id: this._id,
      username: this.username,
      email: this.email,
    };
  },
};

export default mongoose.model('Auth', AuthSchema);
