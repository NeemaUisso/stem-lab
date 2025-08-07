import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  clubId: { type: mongoose.Schema.Types.ObjectId, ref: 'Club', required: true },
  teamName: { type: String, required: true },
  projectTitle: { type: String, required: true },
  projectCategory: { type: String, required: true },
  projectDescription: { type: String, required: true },
  teamMembers: { type: String, required: true },
  videoLink: { type: String },
  documentUrl: { type: String },
  imageUrl: { type: String },
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);
