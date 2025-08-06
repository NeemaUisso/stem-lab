import React, { useState } from "react";
import { Box, Typography, Drawer, List, ListItem, Paper, Button } from "@mui/material";
import Draggable from "react-draggable";

const playgroundWidth = 600;
const playgroundHeight = 400;

const playgroundItems = [
  { id: "swing", label: "Swing", width: 100, height: 100, cost: 150, color: "lightblue" },
  { id: "slide", label: "Slide", width: 120, height: 80, cost: 200, color: "lightgreen" },
  { id: "bench", label: "Bench", width: 80, height: 50, cost: 100, color: "lightyellow" },
];

function MathPlayground() {
  const [placedItems, setPlacedItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  // Add new item on drag stop, with position relative to playground
  const onDropNewItem = (item, position) => {
    setPlacedItems([...placedItems, { ...item, x: position.x, y: position.y, uid: Date.now() }]);
  };

  // Calculate total cost
  const totalCost = placedItems.reduce((acc, item) => acc + item.cost, 0);

  return (
    <Box sx={{ display: "flex", gap: 2, p: 2 }}>
      {/* Sidebar Palette */}
      <Drawer variant="permanent" anchor="left" sx={{ width: 180, flexShrink: 0 }}>
        <List>
          {playgroundItems.map((item) => (
            <ListItem
              button
              key={item.id}
              onClick={() => setSelectedItem(item)}
              sx={{ cursor: "pointer", backgroundColor: selectedItem?.id === item.id ? "grey.300" : "inherit" }}
            >
              {item.label} (${item.cost})
            </ListItem>
          ))}
          <ListItem>
            <Typography variant="subtitle1">Total Cost: ${totalCost}</Typography>
          </ListItem>
        </List>
      </Drawer>

      {/* Playground Area */}
      <Box
        sx={{
          position: "relative",
          width: playgroundWidth,
          height: playgroundHeight,
          border: "2px solid black",
          backgroundColor: "#f0f0f0",
        }}
        onClick={(e) => {
          // Place selected item where user clicks
          if (selectedItem) {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left - selectedItem.width / 2;
            const y = e.clientY - rect.top - selectedItem.height / 2;
            onDropNewItem(selectedItem, { x, y });
          }
        }}
      >
        {placedItems.map((item) => (
          <Draggable
            key={item.uid}
            defaultPosition={{ x: item.x, y: item.y }}
            bounds="parent"
            onStop={(e, data) => {
              // Update position on drag stop
              setPlacedItems((prev) =>
                prev.map((pi) => (pi.uid === item.uid ? { ...pi, x: data.x, y: data.y } : pi))
              );
            }}
          >
            <Paper
              elevation={3}
              sx={{
                width: item.width,
                height: item.height,
                backgroundColor: item.color,
                textAlign: "center",
                lineHeight: `${item.height}px`,
                userSelect: "none",
                cursor: "move",
                position: "absolute",
              }}
            >
              {item.label}
            </Paper>
          </Draggable>
        ))}
      </Box>
    </Box>
  );
}

export default MathPlayground;
