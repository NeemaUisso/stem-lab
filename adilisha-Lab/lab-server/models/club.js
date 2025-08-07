import mongoose from 'mongoose';

const clubSchema = new mongoose.Schema({
  schoolName: { type: String, required: true },
  clubInstructor: { type: String, required: true }, 
  email: { type: String, required: true },
  contactNumber: { type: String, required: true },  
  region: { type: String, required: true },
  numberOfTeams: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model('Club', clubSchema);
