import mongoose from 'mongoose';

const practicalSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { 
    type: String, 
    enum: ['physics', 'chemistry', 'biology'], 
    required: true 
  },
  topic: { type: String, required: true },
  objective: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { 
    type: String, 
    enum: ['easy', 'medium', 'hard'], 
    default: 'medium' 
  },
  tags: { type: [String], default: [] },
  
  // Main image for the practical
  image: { type: String },

  // NEW: Array of images for tools/materials
  materialImages: { type: [String], default: [] },

  simulationConfig: { type: String },

  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date },
  deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

}, { timestamps: true });

const Practical = mongoose.model('Practical', practicalSchema);
export default Practical;
