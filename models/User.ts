import mongoose, { Document, Schema, Model } from "mongoose";

// Define the User interface extending Document
// export interface User extends Document { 
//   _id: string;
//   name: string;  
//   email: string;
//   phone: number;
// }

// Define the User schema
const UserSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/.+\@.+\..+/, 'Please use a valid email address'],
  },
  phone: {
    type: Number,
    required: [true, 'Phone number is required'],
  },
});


const UserModel= mongoose.models.User || mongoose.model<User>('User', UserSchema);

export default UserModel;
