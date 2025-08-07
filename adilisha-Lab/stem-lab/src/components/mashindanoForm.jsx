import React, { useEffect, useState } from 'react';
import ClubForm from './clubForm';
import TeamForm from './teamForm';
import { useNavigate } from 'react-router-dom'; 

const MashindanoForm = () => {
  const [clubInfo, setClubInfo] = useState({
    schoolName: '',
    clubInstructor: '',
    email: '',
    contactNumber: '',
    region: '',
  });
  const [clubId, setClubId] = useState(null);
  const [teams, setTeams] = useState([]); 
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); 

  // Load clubId from localStorage on component mount
  useEffect(() => {
    const savedClubId = localStorage.getItem('adilisha_clubId');
    if (savedClubId) {
      setClubId(savedClubId);
    }
  }, []);

  const handleClubInfoChange = (e) => {
    setClubInfo({ ...clubInfo, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleClubSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    const requiredFields = ['schoolName', 'clubInstructor', 'email', 'contactNumber', 'region'];
    requiredFields.forEach(field => {
      if (!clubInfo[field]) newErrors[field] = 'Required';
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const res = await fetch('http://127.0.0.1:3000/api/competition/club', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clubInfo),
      });
      const data = await res.json();
      if (data.clubId) {
        setClubId(data.clubId);
        localStorage.setItem('adilisha_clubId', data.clubId);
        setErrors({});
        // Initialize the single team state here
        setTeams([{
            teamName: '',
            projectTitle: '',
            projectCategory: '',
            projectDescription: '',
            teamMembers: '',
            document: null,
            videoLink: '',
        }]);
      } else {
        setErrors({ api: 'Failed to create club. Please try again.' });
      }
    } catch (err) {
      console.error('Error creating club:', err);
      setErrors({ api: 'Server error while saving club.' });
    }
  };

  const handleTeamChange = (field, value) => {
    setTeams([{ ...teams[0], [field]: value }]);
  };

  const handleTeamFileChange = (field, file) => {
    setTeams([{ ...teams[0], [field]: file }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const team = teams[0];

    // Basic validation for team form
    if (!team.teamName || !team.projectTitle) {
        setErrors({ team: 'Team name and project title are required.' });
        return;
    }

    const formData = new FormData();
    formData.append('clubId', clubId);
    formData.append('teamName', team.teamName);
    formData.append('projectTitle', team.projectTitle);
    formData.append('projectCategory', team.projectCategory);
    formData.append('projectDescription', team.projectDescription);
    formData.append('teamMembers', JSON.stringify(team.teamMembers.split(',').map(m => m.trim())));
    formData.append('videoLink', team.videoLink);
    if (team.document) formData.append('document', team.document);
 

    try {
      const res = await fetch('http://127.0.0.1:3000/api/competition/team', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        localStorage.clear();
        alert('Registration completed successfully!');
        // Optional: Redirect the user
        // navigate('/success-page');
      } else {
        setErrors({ team: 'Failed to submit team data.' });
      }
    } catch (err) {
      console.error('Error submitting team:', err);
      setErrors({ team: 'Server error while submitting team.' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">Adilisha Competition Registration</h1>
      
      {clubId ? (
        // Render Team Form if a club exists
        <TeamForm
            teamInfo={teams[0]}
            onChange={handleTeamChange}
            onFileChange={handleTeamFileChange}
            onSubmit={handleSubmit}
            errors={errors}
        />
      ) : (
        // Render Club Form if no club exists
        <ClubForm
          clubInfo={clubInfo}
          onChange={handleClubInfoChange}
          onSubmit={handleClubSubmit}
          errors={errors}
        />
      )}
    </div>
  );
};

export default MashindanoForm;