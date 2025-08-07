import React from 'react';
import { Box, TextField, MenuItem, Typography } from '@mui/material';

const regions = [
  'Arusha', 'Dar es Salaam', 'Dodoma', 'Geita', 'Iringa',
  'Kagera', 'Katavi', 'Kigoma', 'Kilimanjaro', 'Lindi',
  'Manyara', 'Mara', 'Mbeya', 'Morogoro', 'Mtwara',
  'Mwanza', 'Njombe', 'Pwani', 'Rukwa', 'Ruvuma',
  'Shinyanga', 'Simiyu', 'Singida', 'Tabora', 'Tanga'
];

const ClubRegistrationStep = ({ clubInfo, onChange, errors }) => {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography variant="h6" gutterBottom>Club Registration</Typography>

      <TextField
        label="School Name"
        name="schoolName"
        value={clubInfo.schoolName}
        onChange={onChange}
        error={!!errors.schoolName}
        helperText={errors.schoolName}
        fullWidth
      />
      <TextField
        label="Club Instructor"
        name="clubInstructor"
        value={clubInfo.clubInstructor}
        onChange={onChange}
        error={!!errors.clubInstructor}
        helperText={errors.clubInstructor}
        fullWidth
      />
      <TextField
        label="Email"
        name="email"
        value={clubInfo.email}
        onChange={onChange}
        error={!!errors.email}
        helperText={errors.email}
        fullWidth
      />
      <TextField
        label="Contact Number"
        name="contactNumber"
        value={clubInfo.contactNumber}
        onChange={onChange}
        error={!!errors.contactNumber}
        helperText={errors.contactNumber}
        fullWidth
      />
      <TextField
        select
        label="Region"
        name="region"
        value={clubInfo.region}
        onChange={onChange}
        error={!!errors.region}
        helperText={errors.region}
        fullWidth
      >
        {regions.map((region) => (
          <MenuItem key={region} value={region}>{region}</MenuItem>
        ))}
      </TextField>
      <TextField
        label="Number of Teams"
        name="numberOfTeams"
        type="number"
        inputProps={{ min: 1 }}
        value={clubInfo.numberOfTeams}
        onChange={onChange}
        error={!!errors.numberOfTeams}
        helperText={errors.numberOfTeams}
        fullWidth
      />
    </Box>
  );
};

export default ClubRegistrationStep;
