import React from 'react';
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  FormHelperText,
} from '@mui/material';

const TeamForm = ({ teamInfo, onChange, onFileChange, onSubmit, errors }) => {
  return (
    <Box
      component="div"
      sx={{
        backgroundColor: 'background.paper',
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        maxWidth: 600,
        mx: 'auto',
      }}
    >
      <Typography variant="h5" component="h2" align="center" gutterBottom>
        Team Registration
      </Typography>

      {errors.team && (
        <Typography color="error" variant="body2" sx={{ mb: 2 }}>
          {errors.team}
        </Typography>
      )}

      <Box component="form" onSubmit={onSubmit} sx={{ '& > :not(style)': { my: 1.5 } }}>
        <TextField
          label="Team Name"
          name="teamName"
          fullWidth
          variant="outlined"
          value={teamInfo?.teamName || ''}
          onChange={(e) => onChange('teamName', e.target.value)}
        />
        
        <TextField
          label="Project Title"
          name="projectTitle"
          fullWidth
          variant="outlined"
          value={teamInfo?.projectTitle || ''}
          onChange={(e) => onChange('projectTitle', e.target.value)}
        />

        <TextField
          label="Project Category"
          name="projectCategory"
          fullWidth
          variant="outlined"
          value={teamInfo?.projectCategory || ''}
          onChange={(e) => onChange('projectCategory', e.target.value)}
        />

        <TextField
          label="Project Description"
          name="projectDescription"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          value={teamInfo?.projectDescription || ''}
          onChange={(e) => onChange('projectDescription', e.target.value)}
        />

        <TextField
          label="Team Members (comma-separated)"
          name="teamMembers"
          fullWidth
          variant="outlined"
          value={teamInfo?.teamMembers || ''}
          onChange={(e) => onChange('teamMembers', e.target.value)}
        />

        <TextField
          label="Video Link"
          name="videoLink"
          fullWidth
          variant="outlined"
          value={teamInfo?.videoLink || ''}
          onChange={(e) => onChange('videoLink', e.target.value)}
        />

        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Upload Document (PDF/DOCX)
          </Typography>
          <input
            type="file"
            accept=".pdf,.docx"
            onChange={(e) => onFileChange('document', e.target.files[0])}
            style={{ display: 'block' }}
          />
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          sx={{ mt: 3 }}
        >
          Submit Team Registration
        </Button>
      </Box>
    </Box>
  );
};

export default TeamForm;