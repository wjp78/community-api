import mongoose from "../config/DBHelpler";

const Schema = mongoose.Schema

const UserSchema = new Schema({
  'username': { type: String },
  'name': { type: String },
  'password': { type: String },
  createTime: {
    type: Date,
    default: Date.now()
  }
})

const UserModel = mongoose.model('users', UserSchema)

export default UserModel
