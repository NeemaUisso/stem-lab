import React from 'react';


import {
  Box,
  Button,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { Link } from 'react-router-dom';

const AdilishaCompetition = () => {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      {/* Hero Section */}
      <Box textAlign="center" mb={6}  sx={{marginTop: '50px'}}>
        <Typography variant="h3" color="primary" fontWeight="bold" gutterBottom>
          Adilisha Innovation Competition 2025
        </Typography>
        <Typography variant="h6" color="textSecondary" paragraph>
          Empowering youth to build sustainable STEM solutions for African challenges.
        </Typography>
        <Button
          component={Link}
          to="/mashindano-form"
          variant="contained"
          color="primary"
          size="large"
        >
          Register Now
        </Button>
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* About Section */}
      <Box mb={4}>
        <Typography variant="h5" fontWeight="medium" gutterBottom>
          About the Competition
        </Typography>
        <Typography variant="body1">
          The Adilisha Competition invites young minds from across Africa to showcase their innovative ideas
          in STEM (Science, Technology, Engineering, and Mathematics). Participants are expected to submit
          project ideas or working prototypes that tackle real-world problems within their communities.
        </Typography>
      </Box>

      {/* Eligibility & Categories */}
      <Box mb={4}>
        <Typography variant="h5" fontWeight="medium" gutterBottom>
          Eligibility & Categories
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Open to African youth aged 15–30" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Individual or team submissions (max 3 per team)" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Categories: Environment, Education, Health, Agriculture, AI & Robotics" />
          </ListItem>
        </List>
      </Box>

      {/* Timeline */}
      <Box mb={4}>
        <Typography variant="h5" fontWeight="medium" gutterBottom>
          Timeline
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Aug 10 – Sept 15: Registration & Idea Submission" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Sept 20: Shortlisting & Notification" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Oct 5: Final Presentations (Online)" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Oct 10: Winners Announcement" />
          </ListItem>
        </List>
      </Box>

      {/* Prizes */}
      <Box mb={4}>
        <Typography variant="h5" fontWeight="medium" gutterBottom>
          Prizes
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="🥇 1st Place – $1,000 + mentorship + featured on Adilisha platform" />
          </ListItem>
          <ListItem>
            <ListItemText primary="🥈 2nd Place – $500 + mentorship" />
          </ListItem>
          <ListItem>
            <ListItemText primary="🥉 3rd Place – $300 + online training access" />
          </ListItem>
          <ListItem>
            <ListItemText primary="🏅 All finalists receive certificates & publication opportunities" />
          </ListItem>
        </List>
      </Box>

      {/* CTA */}
      <Box textAlign="center" mt={6}>
        <Typography variant="h6" paragraph>
          Ready to transform your ideas into action?
        </Typography>
        <Button
          component={Link}
          to="/mashindano-form"
          variant="contained"
          color="success"
          size="large"
        >
          Submit Your Idea
        </Button>
      </Box>
    </Container>
  );
};

export default AdilishaCompetition;
