import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Container,
  MenuItem,
} from '@mui/material';

const MashindanoForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [clubInfo, setClubInfo] = useState({
    schoolName: '',
    clubInstructor: '',
    email: '',
    contactNumber: '',
    numberOfTeams: 1,
  });
  const [clubId, setClubId] = useState(null);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const savedClub = localStorage.getItem('adilisha_club');
    const savedTeams = localStorage.getItem('adilisha_teams');
    const savedClubId = localStorage.getItem('adilisha_clubId');

    if (savedClub) setClubInfo(JSON.parse(savedClub));
    if (savedTeams) setTeams(JSON.parse(savedTeams));
    if (savedClubId) setClubId(savedClubId);
  }, []);

  useEffect(() => {
    localStorage.setItem('adilisha_club', JSON.stringify(clubInfo));
  }, [clubInfo]);

  useEffect(() => {
    localStorage.setItem('adilisha_teams', JSON.stringify(teams));
  }, [teams]);

  useEffect(() => {
    if (clubId) localStorage.setItem('adilisha_clubId', clubId);
  }, [clubId]);

  const handleClubInfoChange = (e) => {
    setClubInfo({ ...clubInfo, [e.target.name]: e.target.value });
  };

  const handleTeamChange = (index, field, value) => {
    const updatedTeams = [...teams];
    updatedTeams[index] = { ...updatedTeams[index], [field]: value };
    setTeams(updatedTeams);
  };

  const handleTeamFileChange = (index, field, file) => {
    const updatedTeams = [...teams];
    updatedTeams[index] = { ...updatedTeams[index], [field]: file };
    setTeams(updatedTeams);
  };

  const handleNext = async () => {
    if (activeStep === 0) {
      if (!clubId) {
        try {
          const res = await fetch('http://localhost:5000/api/competition/club', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(clubInfo),
          });
          const data = await res.json();
          if (data.clubId) {
            setClubId(data.clubId);
            const initTeams = Array.from({ length: Number(clubInfo.numberOfTeams) }, () => ({
              teamName: '',
              projectTitle: '',
              projectCategory: '',
              projectDescription: '',
              teamMembers: '',
              document: null,
              image: null,
              videoLink: '',
            }));
            setTeams(initTeams);
          }
        } catch (err) {
          console.error('Error saving club:', err);
        }
      }
    } else {
      const team = teams[activeStep - 1];
      const formData = new FormData();
      formData.append('clubId', clubId);
      formData.append('teamName', team.teamName);
      formData.append('projectTitle', team.projectTitle);
      formData.append('projectCategory', team.projectCategory);
      formData.append('projectDescription', team.projectDescription);
      formData.append('teamMembers', JSON.stringify(team.teamMembers.split(',').map(m => m.trim())));
      formData.append('videoLink', team.videoLink);
      if (team.document) formData.append('document', team.document);
      if (team.image) formData.append('image', team.image);

      try {
        await fetch('#', {
          method: 'POST',
          body: formData,
        });
      } catch (err) {
        console.error('Error saving team:', err);
      }
    }
    setActiveStep(prev => prev + 1);
  };

  const handleBack = () => setActiveStep(prev => prev - 1);

  const handleSubmit = () => {
    alert('All data submitted!');
    localStorage.clear();
  };

  const totalSteps = 1 + Number(clubInfo.numberOfTeams || 1);

  return (
    <Container maxWidth="md">
      <Box py={5}>
        <Typography variant="h4" align="center" gutterBottom>
          Adilisha Competition Registration
        </Typography>

        <Stepper activeStep={activeStep} alternativeLabel>
          <Step><StepLabel>Club Info</StepLabel></Step>
          {Array.from({ length: Number(clubInfo.numberOfTeams) }, (_, i) => (
            <Step key={i}><StepLabel>Team {i + 1}</StepLabel></Step>
          ))}
        </Stepper>

        <Box mt={4}>
          {activeStep === 0 && (
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField label="School Name" name="schoolName" value={clubInfo.schoolName} onChange={handleClubInfoChange} fullWidth />
              <TextField label="Club Instructor" name="clubInstructor" value={clubInfo.clubInstructor} onChange={handleClubInfoChange} fullWidth />
              <TextField label="Email" name="email" value={clubInfo.email} onChange={handleClubInfoChange} fullWidth />
              <TextField label="Contact Number" name="contactNumber" value={clubInfo.contactNumber} onChange={handleClubInfoChange} fullWidth />
              <TextField label="Number of Teams" name="numberOfTeams" type="number" inputProps={{ min: 1 }} value={clubInfo.numberOfTeams} onChange={handleClubInfoChange} fullWidth />
            </Box>
          )}

          {activeStep > 0 && (
            <Box display="flex" flexDirection="column" gap={2}>
              <Typography variant="h6">Team {activeStep}</Typography>
              <TextField label="Team Name" value={teams[activeStep - 1]?.teamName || ''} onChange={(e) => handleTeamChange(activeStep - 1, 'teamName', e.target.value)} fullWidth />
              <TextField label="Project Title" value={teams[activeStep - 1]?.projectTitle || ''} onChange={(e) => handleTeamChange(activeStep - 1, 'projectTitle', e.target.value)} fullWidth />
              <TextField select label="Project Category" value={teams[activeStep - 1]?.projectCategory || ''} onChange={(e) => handleTeamChange(activeStep - 1, 'projectCategory', e.target.value)} fullWidth>
                {['Environment', 'Education', 'Health', 'Agriculture', 'AI & Robotics'].map((cat) => (
                  <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                ))}
              </TextField>
              <TextField label="Project Description" multiline minRows={3} value={teams[activeStep - 1]?.projectDescription || ''} onChange={(e) => handleTeamChange(activeStep - 1, 'projectDescription', e.target.value)} fullWidth />
              <TextField label="Team Members (comma-separated)" value={teams[activeStep - 1]?.teamMembers || ''} onChange={(e) => handleTeamChange(activeStep - 1, 'teamMembers', e.target.value)} fullWidth />
              <TextField label="Video Link (YouTube, Vimeo, etc.)" value={teams[activeStep - 1]?.videoLink || ''} onChange={(e) => handleTeamChange(activeStep - 1, 'videoLink', e.target.value)} fullWidth />
              <Typography variant="subtitle1">Upload Files</Typography>
              <input type="file" accept=".pdf,.docx" onChange={(e) => handleTeamFileChange(activeStep - 1, 'document', e.target.files[0])} />
              <input type="file" accept="image/*" onChange={(e) => handleTeamFileChange(activeStep - 1, 'image', e.target.files[0])} />
            </Box>
          )}

          <Box mt={4} display="flex" justifyContent="space-between">
            <Button variant="outlined" onClick={handleBack} disabled={activeStep === 0}>Back</Button>
            {activeStep < totalSteps - 1 ? (
              <Button variant="contained" onClick={handleNext}>Next</Button>
            ) : (
              <Button variant="contained" color="success" onClick={handleSubmit}>Submit All</Button>
            )}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default MashindanoForm;
