import React, { useState, useRef, useEffect } from "react";
import { Accordion, Button, Alert, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import water from "../assets/Water.png";
import buffer from "../assets/buffer-bottle.png";
import indicator from "../assets/indicator-bottle.png";
import edta from "../assets/edta-bottle.png";
import dropperEmpty from "../assets/dropper1.png";
import dropperFilled from "../assets/dropper2.png";
import beaker from "../assets/Beaker.png";

const MAX_EDTA_DROPS = 8;

export default function HardnessWater() {
  const [beakerContent, setBeakerContent] = useState({ water: false, buffer: false, indicator: false, edtaDrops: 0 });
  const [dropper, setDropper] = useState({ state: "empty", content: null });
  const [dropperPosition, setDropperPosition] = useState({ x: 0, y: 0 });
  const [showDropper, setShowDropper] = useState(false);
  const [hardness, setHardness] = useState(null);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [draggingChemical, setDraggingChemical] = useState(null);

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const beakerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getWaterHeight = () => {
    let height = 0;
    if (beakerContent.water) height += 30;
    if (beakerContent.buffer) height += 20;
    if (beakerContent.indicator) height += 20;
    if (beakerContent.edtaDrops > 0) height += beakerContent.edtaDrops * 3;
    return Math.min(height, 85);
  };

  const getSolutionColor = () => {
    if (!beakerContent.water) return "#4da6ff";
    if (beakerContent.indicator) {
      if (beakerContent.edtaDrops < 4) return "#ff4d4d";
      else if (beakerContent.edtaDrops < 8) return "#ff9999";
      else return "#4da6ff";
    }
    if (beakerContent.buffer) return "#99ccff";
    return "#4da6ff";
  };

  const handleChemicalClick = (id) => {
    if (id === "water") setBeakerContent(prev => ({ ...prev, water: true }));
    else if (id === "dropper" && dropper.state === "filled") handleBeakerDrop(new Event("click"));
    else {
      setDropper({ state: "filled", content: id });
      setShowDropper(true);
    }
  };

  const handleDragStart = (id, e) => {
    if (isSmallScreen) return;
    setDraggingChemical(id);
    setDropper({ state: id === "water" ? "empty" : "filled", content: id });
    setShowDropper(true);
  };

  const handleDragEnd = () => setDraggingChemical(null);

  const handleBeakerDrop = (e) => {
    e.preventDefault();
    if (!dropper.content) return;

    const chemId = dropper.content;
    if (chemId === "water") setBeakerContent(prev => ({ ...prev, water: true }));
    if (chemId === "buffer") setBeakerContent(prev => ({ ...prev, buffer: true }));
    if (chemId === "indicator") setBeakerContent(prev => ({ ...prev, indicator: true }));
    if (chemId === "edta") {
      setBeakerContent(prev => {
        const newDrops = prev.edtaDrops + 1;
        if (newDrops >= MAX_EDTA_DROPS) {
          const hardnessValue = (newDrops * 0.05 * 0.01 * 100 * 1000) / 50;
          setHardness(hardnessValue.toFixed(2));
        }
        return { ...prev, edtaDrops: newDrops };
      });
    }

    setDropper({ state: "empty", content: null });
    setShowDropper(false);
    setDraggingChemical(null);
  };

  const handleDragOver = e => e.preventDefault();
  const handleMouseMove = e => {
    if (showDropper && dropper.state === "filled") setDropperPosition({ x: e.clientX - 20, y: e.clientY - 20 });
  };

  const chemicals = [
    { id: "water", label: "Water", image: water },
    { id: "buffer", label: "Buffer", image: buffer },
    { id: "indicator", label: "Indicator", image: indicator },
    { id: "edta", label: "EDTA", image: edta },
    { id: "dropper", label: dropper.state === "filled" ? "Filled Dropper" : "Empty Dropper", image: dropper.state === "filled" ? dropperFilled : dropperEmpty },
  ];

  const imageStyle = {
    width: isSmallScreen ? "50px" : "100px",
    height: isSmallScreen ? "70px" : "120px",
    objectFit: "contain",
    borderRadius: 8,
    border: "1px solid #ccc",
    cursor: "grab",
  };

  const navigate = useNavigate();
        const goBack = () => {
          if (window.history.length > 1) {
            navigate(-1); // jaribu kurudi history
          } else {
            navigate("/virtual-lab"); // fallback page
          }
        };

  return (
    <div className="container mt-4 pt-5 mb-3" onMouseMove={handleMouseMove}>

      <div className="d-flex align-items-center mb-4">
          {/* Back Button */}
          <button onClick={goBack} className="btn btn-outline-secondary me-3">
            ⬅
          </button>

          {/* Title */}
          <h2 className="mb-0 text-primary fs-3">
           <strong>Removing Hardness of Water</strong>
          </h2>
        </div>

      <div className="alert alert-info">💡 Hint: {isSmallScreen ? "Click a chemical or dropper to add it to the beaker." : "Drag chemicals into the beaker to add them."}</div>
      <Accordion defaultActiveKey="0" className="mb-4">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Steps & Procedure</Accordion.Header>
          <Accordion.Body>
            <ol>
              <li>Add water to the beaker.</li>
              <li>Add buffer solution.</li>
              <li>Add indicator solution.</li>
              <li>Add EDTA until color changes.</li>
              <li>Record hardness.</li>
            </ol>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/* Layout */}
      {isSmallScreen ? (
        <>
          <div className="d-flex flex-row flex-wrap justify-content-center gap-2 mb-3">
            {chemicals.map(({ id, label, image }) => (
              <div key={id} className="text-center">
                <img src={image} alt={label} onClick={() => handleChemicalClick(id)} style={imageStyle} />
                <div style={{ fontSize: 12 }}>{label}</div>
              </div>
            ))}
          </div>
          <h5 className="text-center mb-2">Beaker</h5>
          <div className="d-flex justify-content-center mb-3">
            <div ref={beakerRef} onDrop={handleBeakerDrop} onDragOver={handleDragOver} style={{ width: "120px", height: "160px", background: `url(${beaker}) bottom center no-repeat`, backgroundSize: "contain", overflow: "hidden", borderRadius: 20, position: "relative" }}>
              <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "95%", height: `${getWaterHeight()}%`, backgroundColor: getSolutionColor(), opacity: 0.6, borderTopLeftRadius: 10, borderTopRightRadius: 10, borderBottomLeftRadius: 40, borderBottomRightRadius: 40, transition: "height 0.3s ease, background-color 0.3s ease" }}></div>
            </div>
          </div>

          <div className="mb-4 text-center">
            <div className="card p-2 mb-3">
              <h5>Beaker Contents</h5>
              <ul className="list-unstyled align-items-center">
                <li>{beakerContent.water ? "✓ Water" : "✗ Water"}</li>
                <li>{beakerContent.buffer ? "✓ Buffer" : "✗ Buffer"}</li>
                <li>{beakerContent.indicator ? "✓ Indicator" : "✗ Indicator"}</li>
                <li>EDTA drops: {beakerContent.edtaDrops}</li>
              </ul>
            </div>
            {hardness && (
              <div className="alert alert-success">
                <h5>Results</h5>
                <p>Hardness: {hardness} ppm CaCO₃</p>
                <p>Water is: <strong>{hardness < 60 ? "Soft" : hardness < 120 ? "Moderately Hard" : hardness < 180 ? "Hard" : "Very Hard"}</strong></p>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="d-flex flex-row justify-content-between align-items-start gap-2">
          {/* Components column */}
          <div className="d-flex flex-column align-items-center" style={{ flex: 1 }}>
            <h5>Components</h5>
            <div className="d-flex flex-wrap justify-content-center gap-2">
              {chemicals.map(({ id, label, image }) => (
                <div key={id} className="text-center" style={{ width: "100px", minWidth: 80 }}>
                  <img src={image} alt={label} draggable={id !== "dropper"} onDragStart={(e) => handleDragStart(id, e)} onDragEnd={handleDragEnd} onClick={() => handleChemicalClick(id)} style={imageStyle} />
                  <div style={{ fontSize: 12, marginTop: 4 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Beaker column */}
          <div className="d-flex flex-column align-items-center" style={{ flex: 1 }}>
            <h5>Beaker</h5>
            <div ref={beakerRef} onDrop={handleBeakerDrop} onDragOver={handleDragOver} style={{ width: "150px", height: "200px", background: `url(${beaker}) bottom center no-repeat`, backgroundSize: "contain", overflow: "hidden", borderRadius: 20, position: "relative" }}>
              <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "95%", height: `${getWaterHeight()}%`, backgroundColor: getSolutionColor(), opacity: 0.6, borderTopLeftRadius: 10, borderTopRightRadius: 10, borderBottomLeftRadius: 40, borderBottomRightRadius: 40, transition: "height 0.3s ease, background-color 0.3s ease" }}></div>
            </div>
          </div>

          {/* Results column */}
          <div className="d-flex flex-column align-items-center" style={{ flex: 1 }}>
            <h5>Results</h5>
            <div className="card p-2 mb-3 w-100">
              <ul className="list-unstyled">
                <li>{beakerContent.water ? "✓ Water" : "✗ Water"}</li>
                <li>{beakerContent.buffer ? "✓ Buffer" : "✗ Buffer"}</li>
                <li>{beakerContent.indicator ? "✓ Indicator" : "✗ Indicator"}</li>
                <li>EDTA drops: {beakerContent.edtaDrops}</li>
              </ul>
            </div>
            {hardness && (
              <div className="alert alert-success w-100">
                <p>Hardness: {hardness} ppm CaCO₃</p>
                <p>Water is: <strong>{hardness < 60 ? "Soft" : hardness < 120 ? "Moderately Hard" : hardness < 180 ? "Hard" : "Very Hard"}</strong></p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Dropper */}
      {showDropper && dropper.state === "filled" && (
        <div style={{ position: "fixed", left: dropperPosition.x, top: dropperPosition.y, width: 50, height: 50, zIndex: 1000, pointerEvents: "auto" }}
             onClick={() => { if (isSmallScreen && dropper.content) handleBeakerDrop(new Event("click")); }}>
          <img src={dropper.content === "water" ? water : dropperFilled} alt="Dropper" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>
        )}

      <div className="text-center mt-4">
        <Button variant="outline-danger" onClick={() => { setBeakerContent({ water: false, buffer: false, indicator: false, edtaDrops: 0 }); setDropper({ state: "empty", content: null }); setShowDropper(false); setHardness(null); setQuizAnswer(null); setQuizSubmitted(false); }}>Reset Experiment</Button>
      </div>

      <div className="mt-4 p-3 border rounded bg-light">
        <h4>Scientific Explanation</h4>
        <p>This experiment demonstrates how the hardness of water can be determined using EDTA titration. The indicator changes color when calcium and magnesium ions are completely chelated by EDTA. The number of drops required indicates the hardness level in ppm of CaCO₃.</p>
      </div>

      <div className="mt-4 border-top pt-3">
        <h4>Quick Quiz</h4>
        <p>What causes permanent water hardness?</p>
        <Form>
          {['Calcium bicarbonate', 'Magnesium sulfate', 'Sodium chloride', 'Potassium nitrate'].map(opt => (
            <Form.Check key={opt} type="radio" name="quiz" id={opt} label={opt} checked={quizAnswer === opt} onChange={() => setQuizAnswer(opt)} disabled={quizSubmitted} />
          ))}
        </Form>
        <Button className="mt-2" onClick={() => setQuizSubmitted(true)} disabled={!quizAnswer || quizSubmitted}>Submit Answer</Button>
        {quizSubmitted && <Alert variant={quizAnswer === "Magnesium sulfate" ? "success" : "danger"} className="mt-2">{quizAnswer === "Magnesium sulfate" ?
          "Correct! Magnesium sulfate is a common cause of permanent hardness." :
          "Incorrect. Please try again."}</Alert>}
      </div>
    </div>
  );
}

