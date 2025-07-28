import Practical from '../models/practical.js';

export const uploadPractical = async (req, res) => {
  try {
    const {
      title,
      subject,
      topic,
      objective,
      description,
      difficulty,
      tags,
      simulationConfig
    } = req.body;

    const files = req.files;

    const practical = new Practical({
      title,
      subject,
      topic,
      objective,
      description,
      difficulty,
      tags: tags?.split(',').map(t => t.trim()) || [],
      simulationConfig,
      image: files?.image?.[0]?.path || null,
      materialImages: files?.materialImages?.map(file => file.path) || [],
    });

    await practical.save();

    res.status(201).json({ message: 'Practical uploaded successfully', practical });
  } catch (err) {
    console.error('Error uploading practical:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
