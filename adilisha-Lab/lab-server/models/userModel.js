import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  username: {   type: String, required: true, unique: true },
  email: {      type: String, required: true, unique: true },           
    password: {   type: String, required: true },   
    createdAt: {  type: Date, default: Date.now },

    updatedAt: {  type: Date, default: Date.now },
    isActive: {   type: Boolean, default: true },
    role: {      type: String, enum: ['user', 'admin'], default: 'user' },
    profilePicture: { type: String, default: '' },     
    createdBy: {  type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: {  type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    deletedAt: {  type: Date, default: null },
    isDeleted: {  type: Boolean, default: false },
   
}, {    
    timestamps: true,
    versionKey: false
    });                     
const User = mongoose.model('User', userSchema);        
export default User;