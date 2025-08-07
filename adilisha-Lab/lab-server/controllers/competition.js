
import Club from '../models/club.js';
import Team from '../models/projects.js';
import multer from 'multer';

export const club = async (req, res) => {
  try {
    const {
      schoolName,
      clubInstructor,   
      email,
      contactNumber,     
      region,
      numberOfTeams,
    } = req.body;

    // Validate required fields
    if (!schoolName || !clubInstructor || !email || !contactNumber || !region || !numberOfTeams) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create new club document
    const newClub = new Club({
      schoolName,
      clubInstructor,
      email,
      contactNumber,
      region,
      numberOfTeams,
    });

    await newClub.save();

    // Send success response
    res.status(201).json({
      message: 'Club created successfully',
      clubId: newClub._id,
    });
  } catch (error) {
    console.error('Error creating club:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export  const projectCompetition = async (req, res) => {

 const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

const upload = multer({ storage });

  try {
    const { clubId, teamName, projectTitle, projectCategory, projectDescription, teamMembers, videoLink, document, image } = req.body;

    // Hakikisha: maelezo yote muhimu yapo
    if (!clubId || !teamName || !projectTitle || !projectCategory || !projectDescription || !teamMembers) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Unda timu mpya
    const newTeam = new Team({
      clubId,
      teamName,
      projectTitle,
      projectCategory,
      projectDescription,
      teamMembers,
      videoLink,
      document,
      image,
    });

    await newTeam.save();

    // Jibu na taarifa ya mafanikio
    res.status(201).json({ message: 'Team created successfully', teamId: newTeam._id });
  } catch (error) {
    console.error('Error creating team:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}