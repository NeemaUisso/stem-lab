
import Club from '../models/club.js';
import Team from '../models/projects.js';
import multer from 'multer';


export const club = async (req, res) => {
  try {
    const { schoolName, clubInstructor, email, contactNumber, region, numberOfTeams } = req.body;

    
console.log("req.user:", req.user);

    // Prevent multiple clubs for same user
    const existingClub = await Club.findOne({ user: req.user.userId });
    if (existingClub) {
      return res.status(400).json({ message: 'You have already registered a club.' });
    }

    const newClub = new Club({
      schoolName,
      clubInstructor,
      email,
      contactNumber,
      region,
      numberOfTeams,
      user: req.user.userId 
    });

    const savedClub = await newClub.save();
    res.status(201).json({ clubId: savedClub._id, message: 'Club registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while creating club' });
  }
};




export const projectCompetition = async (req, res) => {
  try {
    // Find the club linked to the logged-in user
    const club = await Club.findOne({ user: req.user.id });
    if (!club) {
      return res.status(400).json({ error: 'You must register a club before adding a team.' });
    }

    const { teamName, projectTitle, projectCategory, projectDescription, teamMembers, videoLink } = req.body;

    // Validate required fields
    if (!teamName || !projectTitle || !projectCategory || !projectDescription || !teamMembers) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Parse teamMembers if sent as JSON string
    let membersArray = [];
    try {
      membersArray = typeof teamMembers === 'string' ? JSON.parse(teamMembers) : teamMembers;
    } catch {
      membersArray = [];
    }

    // Create new team
    const newTeam = new Team({
      club: club._id,
      teamName,
      projectTitle,
      projectCategory,
      projectDescription,
      teamMembers: membersArray,
      videoLink,
      document: req.file ? req.file.filename : null, 
    });

    await newTeam.save();

    res.status(201).json({ message: 'Team created successfully', teamId: newTeam._id });
  } catch (error) {
    console.error('Error creating team:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getMyClub = async (req, res) => {
  try {
    const club = await Club.findOne({ user: req.user.id }).select('_id schoolName');
    if (!club) {
      return res.status(404).json({ message: 'No club found for this user' });
    }

    res.status(200).json({ clubId: club._id, schoolName: club.schoolName });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while fetching club' });
  }
};