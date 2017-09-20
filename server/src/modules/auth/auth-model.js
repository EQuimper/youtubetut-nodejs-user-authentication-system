import mongoose, { Schema } from 'mongoose';

const AuthSchema = new Schema({
  email: String,
  password: String,
  username: String,
});

export default mongoose.model('Auth', AuthSchema);
