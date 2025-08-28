import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [studentTotal, setStudentTotal] = useState("");
  const [feedback, setFeedback] = useState("");
  const [draggingItem, setDraggingItem] = useState(null);

  const navigate = useNavigate();
  const goBack = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate("/virtual-lab");
  };

  // Desktop drag start
  const handleDragStart = (event, tool) => {
    event.dataTransfer.setData("tool", JSON.stringify(tool));
  };

  // Mobile touch start
  const handleTouchStart = (event, tool) => {
    setDraggingItem(tool);
  };

  // Mobile touch move
  const handleTouchMove = (event) => {
    event.preventDefault(); // avoid scrolling
  };

  // Mobile touch end
  const handleTouchEnd = (event, playgroundRef) => {
    if (!draggingItem || !playgroundRef.current) return;

    const rect = playgroundRef.current.getBoundingClientRect();
    const touch = event.changedTouches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    setPlacedItems([...placedItems, { ...draggingItem, x, y, id: Date.now() }]);
    setDraggingItem(null);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    let tool;
    if (event.dataTransfer.getData("tool")) {
      tool = JSON.parse(event.dataTransfer.getData("tool"));
    }
    if (!tool) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setPlacedItems([...placedItems, { ...tool, x, y, id: Date.now() }]);
  };

  const handleDragOver = (event) => event.preventDefault();

  const handleRightClick = (event, id) => {
    event.preventDefault();
    setPlacedItems(placedItems.filter((item) => item.id !== id));
  };

  const handleReset = () => {
    setPlacedItems([]);
    setStudentTotal("");
    setFeedback("");
  };

  const handleCheck = () => {
    const correctTotal = placedItems.reduce((sum, item) => sum + item.cost, 0);
    const userAnswer = parseInt(studentTotal, 10);
    if (userAnswer === correctTotal)
      setFeedback("✅ Correct! Great job!");
    else
      setFeedback("❌ Incorrect. Try recalculating the costs carefully.");
  };

  const playgroundRef = React.useRef(null);

  return (
    <div className="container mt-5 pt-3">
      <div className="d-flex align-items-center justify-content-center mb-3">
        <button onClick={goBack} className="btn btn-outline-secondary me-3">
          ⬅
        </button>
        <h2 className="text-center fw-bold text-primary">MATH PLAYGROUND</h2>
      </div>

      <p className="text-center">🧰 Drag Items to Design Your Playground</p>

      {/* Tools */}
      <div className="d-flex flex-row flex-nowrap overflow-auto mb-4 p-2 border rounded bg-light justify-content-center">
        {tools.map((tool) => (
          <div key={tool.name} className="text-center me-3">
            <img
              src={tool.img}
              alt={tool.name}
              draggable
              onDragStart={(e) => handleDragStart(e, tool)}
              onTouchStart={(e) => handleTouchStart(e, tool)}
              onTouchMove={handleTouchMove}
              onTouchEnd={(e) => handleTouchEnd(e, playgroundRef)}
              style={{
                width: "60px",
                height: "60px",
                objectFit: "contain",
                cursor: "grab",
              }}
            />
            <small className="d-block">{tool.name} (${tool.cost})</small>
          </div>
        ))}
      </div>

      <div className="row">
        {/* Playground Area */}
        <div className="col-md-6 mb-3">
          <h5>🎨 Playground Area (Right-click to delete)</h5>
          <div
            ref={playgroundRef}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="border border-primary border-3 rounded position-relative"
            style={{ width: "100%", height: "300px", backgroundColor: "#e3f2fd" }}
          >
            {placedItems.map((item) => (
              <div
                key={item.id}
                onContextMenu={(e) => handleRightClick(e, item.id)}
                className="position-absolute text-center"
                style={{
                  left: item.x,
                  top: item.y,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <img src={item.img} alt={item.name} style={{ width: "50px" }} />
              </div>
            ))}
          </div>
        </div>

        {/* Calculation Area */}
        <div className="col-md-6 mb-3">
          <h5>🧮 Your Calculation Area</h5>
          <div className="bg-light rounded p-3">
            {placedItems.length === 0 ? (
              <p>No items added yet.</p>
            ) : (
              <ul>
                {placedItems.map((item, index) => (
                  <li key={index}>
                    {item.name} - ${item.cost}
                  </li>
                ))}
              </ul>
            )}
            <input
              type="number"
              className="form-control mt-2"
              placeholder="Your calculated total ($)"
              value={studentTotal}
              onChange={(e) => setStudentTotal(e.target.value)}
            />
            <button
              className="btn btn-primary mt-2"
              onClick={handleCheck}
              disabled={placedItems.length === 0}
            >
              Check My Answer
            </button>
          </div>
          <button className="btn btn-outline-danger mt-2" onClick={handleReset}>
            Reset Playground
          </button>
        </div>
      </div>
    </div>
  );
};

export default Playground;
