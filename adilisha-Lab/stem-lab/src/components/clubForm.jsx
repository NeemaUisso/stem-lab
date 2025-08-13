import React from 'react';
import { Box, TextField, MenuItem, Typography, Paper, Button } from '@mui/material';

const regions = [
  'Arusha', 'Dar es Salaam', 'Dodoma', 'Geita', 'Iringa',
  'Kagera', 'Katavi', 'Kigoma', 'Kilimanjaro', 'Lindi',
  'Manyara', 'Mara', 'Mbeya', 'Morogoro', 'Mtwara',
  'Mwanza', 'Njombe', 'Pwani', 'Rukwa', 'Ruvuma',
  'Shinyanga', 'Simiyu', 'Singida', 'Tabora', 'Tanga'
];

const ClubRegistrationStep = ({ clubInfo, onChange, errors, onSubmit }) => {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: 2,
        backgroundColor: '#fff',
        maxWidth: 500,
        mx: 'auto'
      }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        color="primary"
        gutterBottom
        textAlign="center"
      >
        Club Registration
      </Typography>

      <Box
        component="form"
        onSubmit={onSubmit}
        display="flex"
        flexDirection="column"
        gap={1.8}
      >
        <TextField
          label="School Name"
          name="schoolName"
          value={clubInfo.schoolName}
          onChange={onChange}
          error={!!errors.schoolName}
          helperText={errors.schoolName}
          size="small"
          fullWidth
        />

        <TextField
          label="Club Instructor"
          name="clubInstructor"
          value={clubInfo.clubInstructor}
          onChange={onChange}
          error={!!errors.clubInstructor}
          helperText={errors.clubInstructor}
          size="small"
          fullWidth
        />

        <TextField
          label="Email Address"
          name="email"
          type="email"
          value={clubInfo.email}
          onChange={onChange}
          error={!!errors.email}
          helperText={errors.email}
          size="small"
          fullWidth
        />

        <TextField
          label="Contact Number"
          name="contactNumber"
          value={clubInfo.contactNumber}
          onChange={onChange}
          error={!!errors.contactNumber}
          helperText={errors.contactNumber}
          size="small"
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
          size="small"
          fullWidth
        >
          {regions.map((region) => (
            <MenuItem key={region} value={region}>
              {region}
            </MenuItem>
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
          size="small"
          fullWidth
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 1, borderRadius: 1 }}
        >
          Submit Registration
        </Button>
      </Box>
    </Paper>
  );
};

export default ClubRegistrationStep;
