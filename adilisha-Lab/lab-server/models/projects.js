import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  club: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Club',
    required: true,
  },
  teamName: { type: String, required: true },
  projectTitle: { type: String, required: true },
  projectCategory: { type: String, required: true },
  projectDescription: { type: String, required: true },
  teamMembers: {
    type: [String], 
    required: true,
  },
  videoLink: { type: String },
  document: { type: String },
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);
