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

  const [teams, setTeams] = useState([
    {
      teamName: '',
      projectTitle: '',
      projectCategory: '',
      projectDescription: '',
      teamMembers: '',
      document: null,
      videoLink: '',
    },
  ]);

  const [errors, setErrors] = useState({});
  const [hasRegistered, setHasRegistered] = useState(false);
  const [loading, setLoading] = useState(true); // ✅ prevents premature render
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      checkUserRegistration(token);
    } else {
      setLoading(false); // no token, allow ClubForm to show
    }
  }, []);

  const checkUserRegistration = async (token) => {
    try {
      const res = await fetch(`http://127.0.0.1:3000/api/competition/my-club`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      console.log(data);

      // ✅ Handle various possible API shapes
      if (res.ok && (data.clubId || (data.club && data.club._id))) {
        setHasRegistered(true);
      } else {
        setHasRegistered(false);
      }
    } catch (err) {
      console.error('Error checking registration:', err);
      setHasRegistered(false);
    } finally {
      setLoading(false);
    }
  };

  const handleClubInfoChange = (e) => {
    setClubInfo({ ...clubInfo, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleClubSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to register a club.');
      return;
    }

    const newErrors = {};
    ['schoolName', 'clubInstructor', 'email', 'contactNumber', 'region'].forEach((field) => {
      if (!clubInfo[field]) newErrors[field] = 'Required';
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const res = await fetch('http://127.0.0.1:3000/api/competition/club', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(clubInfo),
      });

      const data = await res.json();
      if (res.ok && (data.clubId || (data.club && data.club._id))) {
        setHasRegistered(true);
        setErrors({});
      } else {
        setErrors({ api: data.message || 'Failed to create club. Please try again.' });
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
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to submit a team.');
      return;
    }

    const team = teams[0];
    if (!team.teamName || !team.projectTitle) {
      setErrors({ team: 'Team name and project title are required.' });
      return;
    }

    const formData = new FormData();
    formData.append('teamName', team.teamName);
    formData.append('projectTitle', team.projectTitle);
    formData.append('projectCategory', team.projectCategory);
    formData.append('projectDescription', team.projectDescription);
    formData.append(
      'teamMembers',
      JSON.stringify(team.teamMembers.split(',').map((m) => m.trim()))
    );
    formData.append('videoLink', team.videoLink);
    if (team.document) formData.append('document', team.document);

    try {
      const res = await fetch('http://127.0.0.1:3000/api/competition/team', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (res.ok) {
        alert('Registration completed successfully!');
        navigate('/success-page');
      } else {
        const errData = await res.json();
        setErrors({ team: errData.message || 'Failed to submit team data.' });
      }
    } catch (err) {
      console.error('Error submitting team:', err);
      setErrors({ team: 'Server error while submitting team.' });
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Checking registration...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">
        Adilisha Competition Registration
      </h1>

      {hasRegistered ? (
        <TeamForm
          teamInfo={teams[0]}
          onChange={handleTeamChange}
          onFileChange={handleTeamFileChange}
          onSubmit={handleSubmit}
          errors={errors}
        />
      ) : (
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
