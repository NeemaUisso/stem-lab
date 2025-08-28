import React, { useState } from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { keyframes } from '@emotion/react';

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
`;

const Ask = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setQuestion('');
    setAnswer('');
  };

  const handleSend = () => {
    if (question.trim() === '') return;
    setAnswer("🤖 Thanks for asking! You asked: " + question);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'ask-popover' : undefined;

  return (
    <>
      <div style={{ position: 'fixed', bottom: '60px', right: '20px', zIndex: 9999 }}>
        <Button
          aria-describedby={id}
          onClick={handleClick}
          sx={{
            width: '60px',
            height: '60px',
            borderRadius: '50px',
            backgroundColor: '#003366',
            color: 'white',
            fontWeight: 'bold',
            animation: `${bounce} 1.5s infinite`,
            textTransform: 'none',
            fontSize: '15px',
            padding: 5,
            
          }}
        >
          Ask a Teacher
        </Button>
      </div>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        PaperProps={{
          sx: {
            p: 2,
            maxWidth: 300,
            borderRadius: '12px',
            boxShadow: 3,
          },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="body1" fontWeight="bold">👩‍🏫 Ask your question:</Typography>
          <TextField
            size="small"
            multiline
            minRows={2}
            maxRows={4}
            placeholder="Type your question here..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            fullWidth
          />
          <Button
            onClick={handleSend}
            variant="contained"
            size="small"
            sx={{ backgroundColor: '#2596be', textTransform: 'none' }}
          >
            Send
          </Button>
          {answer && (
            <Box sx={{ mt: 1, p: 1, bgcolor: '#f0f0f0', borderRadius: '6px' }}>
              <Typography variant="body2">{answer}</Typography>
            </Box>
          )}
        </Box>
      </Popover>
    </>
  );
};

export default Ask;
