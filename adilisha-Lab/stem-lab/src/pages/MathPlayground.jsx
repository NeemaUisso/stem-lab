import React, { useState } from 'react';
import { Box, Typography, Grid, Button, TextField } from '@mui/material';
import Swing from "../assets/Image/swing1.png";
import Slide from "../assets/Image/slide.png";
import Bench from "../assets/Image/bench1.png";
import Seesaw from "../assets/Image/seesaw.png";
import Sandpit from "../assets/Image/sandpit.jpg";
import Fountain from "../assets/Image/fountain.jpg";
import Trash from "../assets/Image/trash.jpg";

const tools = [
  { name: "Swing", cost: 100, img: Swing },
  { name: "Slide", cost: 150, img: Slide },
  { name: "Bench", cost: 120, img: Bench },
  { name: "Seesaw", cost: 90, img: Seesaw },
  { name: "Sandpit", cost: 70, img: Sandpit },
  { name: "Trash", cost: 50, img: Trash },
  { name: "Fountain", cost: 50, img: Fountain },
];

const Playground = () => {
  const [placedItems, setPlacedItems] = useState([]);
  const [studentTotal, setStudentTotal] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleDragStart = (event, tool) => {
    event.dataTransfer.setData('tool', JSON.stringify(tool));
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const tool = JSON.parse(event.dataTransfer.getData('tool'));
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setPlacedItems([...placedItems, { ...tool, x, y, id: Date.now() }]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDelete = (id) => {
    setPlacedItems(placedItems.filter(item => item.id !== id));
  };

  const handleRightClick = (event, id) => {
    event.preventDefault();
    handleDelete(id);
  };

  const handleReset = () => {
    setPlacedItems([]);
    setStudentTotal('');
    setFeedback('');
  };

  const handleCheck = () => {
    const correctTotal = placedItems.reduce((sum, item) => sum + item.cost, 0);
    const userAnswer = parseInt(studentTotal, 10);

    if (userAnswer === correctTotal) {
      setFeedback('✅ Correct! Great job!');
    } else {
      setFeedback('❌ Incorrect. Try recalculating the costs carefully.');
    }
  };

  return (
    <Box sx={{ p: 2, mt: 8}}>
      <Typography variant="h3" align="center" gutterBottom fontWeight="bold" color="primary">
        MATH PLAYGROUND
      </Typography>

      <Typography variant="h5" gutterBottom align="center">
        🧰 Drag Items to Design Your Playground
      </Typography>

      {/* Tools Panel */}
      <Grid container spacing={2} justifyContent="center" sx={{ mb: 3 }}>
        {tools.map((tool) => (
          <Grid item xs={4} sm={3} md={2} key={tool.name} sx={{ textAlign: 'center' }}>
            <img
              src={tool.img}
              alt={tool.name}
              draggable
              onDragStart={(e) => handleDragStart(e, tool)}
              style={{
                width: '60px',
                height: '60px',
                objectFit: 'contain',
                cursor: 'grab',
              }}
            />
            <Typography variant="caption" display="block">
              {tool.name} (${tool.cost})
            </Typography>
          </Grid>
        ))}
      </Grid>

      <Grid container  justifyContent="center">
      <Grid container spacing={3}>
        {/* Playground Area (Left) */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            🎨 Playground Area (Right-click to delete)
          </Typography>

          <Box
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            sx={{
              width: '100%',
              height: 400,
              border: '3px dashed #1976d2',
              borderRadius: 2,
              position: 'relative',
              backgroundColor: '#e3f2fd',
              mb: 2,
            }}
          >
            {placedItems.map((item) => (
              <Box
                key={item.id}
                onContextMenu={(e) => handleRightClick(e, item.id)}
                sx={{
                  position: 'absolute',
                  left: item.x,
                  top: item.y,
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center',
                }}
              >
                <img src={item.img} alt={item.name} style={{ width: 50 }} />
              </Box>
            ))}
          </Box>

          <Button variant="outlined" color="error" onClick={handleReset}>
            Reset Playground
          </Button>
        </Grid>

        {/* Calculation Area (Right) */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>🧮 Your Calculation Area</Typography>

          <Box sx={{ backgroundColor: '#f5f5f5', borderRadius: 2, p: 2 }}>
            {placedItems.length === 0 ? (
              <Typography>No items added yet.</Typography>
            ) : (
              <>
                <ul>
                  {placedItems.map((item, index) => (
                    <li key={index}>{item.name} - ${item.cost}</li>
                  ))}
                </ul>
              </>
            )}

            <TextField
              label="Your calculated total ($)"
              variant="outlined"
              type="number"
              fullWidth
              value={studentTotal}
              onChange={(e) => setStudentTotal(e.target.value)}
              sx={{ mt: 2 }}
            />

            <Button
              variant="contained"
              color="primary"
              onClick={handleCheck}
              sx={{ mt: 2 }}
              disabled={placedItems.length === 0}
            >
              Check My Answer
            </Button>

            {feedback && (
              <Typography sx={{ mt: 2, fontWeight: 'bold', color: feedback.includes('Correct') ? 'green' : 'red' }}>
                {feedback}
              </Typography>
            )}
          </Box>
        </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Playground;
