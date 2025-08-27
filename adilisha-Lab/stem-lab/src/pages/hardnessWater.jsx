import React, { useState, useRef } from "react";
import { Accordion, Button, Alert, Form } from "react-bootstrap";
import water from "../assets/Water.png";
import buffer from "../assets/buffer-bottle.png";
import indicator from "../assets/indicator-bottle.png";
import edta from "../assets/edta-bottle.png";
import dropperEmpty from "../assets/dropper1.png";
import dropperFilled from "../assets/dropper2.png";
import beaker from "../assets/Beaker.png";

const chemicals = [
  { id: "water", label: "Water", image: water },
  { id: "buffer", label: "Buffer", image: buffer },
  { id: "indicator", label: "Indicator", image: indicator },
  { id: "edta", label: "EDTA", image: edta },
];

const MAX_EDTA_DROPS = 8;

export default function HardnessWaterDropper() {
  const [beakerContent, setBeakerContent] = useState({
    water: false,
    buffer: false,
    indicator: false,
    edtaDrops: 0,
  });

  const [dropper, setDropper] = useState({ state: "empty", content: null });
  const [dropperPosition, setDropperPosition] = useState({ x: 0, y: 0 });
  const [showDropper, setShowDropper] = useState(false);
  const [hardness, setHardness] = useState(null);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [draggingChemical, setDraggingChemical] = useState(null);

  const beakerRef = useRef(null);

  const isSmallScreen = () => window.innerWidth < 768;

  const getWaterHeight = () => {
    let height = 0;
    if (beakerContent.water) height += 30;
    if (beakerContent.buffer) height += 20;
    if (beakerContent.indicator) height += 20;
    if (beakerContent.edtaDrops > 0) height += beakerContent.edtaDrops * 3;
    return Math.min(height, 95);
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

  const handleChemicalClick = (chem) => {
    if (chem.id === "water") {
      setBeakerContent((prev) => ({ ...prev, water: true }));
    } else {
      setDropper({ state: "filled", content: chem.id });
      setShowDropper(true);
    }
  };

  const handleDragStart = (chem, e) => {
    if (isSmallScreen()) return;
    setDraggingChemical(chem.id);
    setDropper({ state: chem.id === "water" ? "empty" : "filled", content: chem.id });
    setShowDropper(true);
  };

  const handleDragEnd = (e) => {
    setDraggingChemical(null);
  };

  const handleBeakerDrop = (e) => {
    e.preventDefault();
    if (!dropper.content) return;

    const chemId = dropper.content;

    if (chemId === "water") setBeakerContent((prev) => ({ ...prev, water: true }));
    if (chemId === "buffer") setBeakerContent((prev) => ({ ...prev, buffer: true }));
    if (chemId === "indicator") setBeakerContent((prev) => ({ ...prev, indicator: true }));
    if (chemId === "edta") {
      setBeakerContent((prev) => {
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

  const handleDragOver = (e) => e.preventDefault();

  const handleMouseMove = (e) => {
    if (showDropper && dropper.state === "filled") {
      setDropperPosition({ x: e.clientX - 20, y: e.clientY - 20 });
    }
  };

  return (
    <div
      className="container mt-4 pt-5"
      onMouseMove={handleMouseMove}
      style={{ overflowX: isSmallScreen() ? "hidden" : "visible", overflowY: "hidden" }}
    >
      <h1 className="text-center text-primary mb-4">Removing Hardness of Water</h1>

      <div className="alert alert-info">
        💡 Hint: {isSmallScreen()
          ? "Click a chemical or dropper to add it to the beaker."
          : "Drag chemicals into the beaker to add them."}
      </div>

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

      <div className="d-flex flex-column flex-sm-row align-items-start gap-3">
        {/* Components */}
        <div className="flex-grow-1 text-start">
          <h4>Components</h4>
          <div className="d-flex flex-wrap justify-content-start gap-2">
            {chemicals.map((chem) => (
              <div
                key={chem.id}
                className="card d-flex align-items-center justify-content-center"
                style={{
                  cursor: "grab",
                  width: "100px",
                  height: "100px",
                  flex: "0 0 45%",
                  border: draggingChemical === chem.id ? "2px solid darkblue" : "1px solid #ccc",
                  opacity: chem.id === "water" && beakerContent.water ? 0.5 : 1,
                }}
                draggable={!isSmallScreen()}
                onDragStart={(e) => handleDragStart(chem, e)}
                onDragEnd={handleDragEnd}
                onClick={() => handleChemicalClick(chem)}
              >
                <img
                  src={chem.image}
                  alt={chem.label}
                  style={{ maxHeight: 60, objectFit: "contain" }}
                />
                <div style={{ fontSize: "0.8rem" }}>{chem.label}</div>
              </div>
            ))}

            {/* Dropper */}
            <div
              className="card d-flex align-items-center justify-content-center"
              style={{
                cursor: dropper.state === "empty" ? "not-allowed" : "grab",
                width: "100px",
                height: "100px",
                flex: "0 0 45%",
              }}
              onClick={() => {
                if (isSmallScreen() && dropper.state === "filled") {
                  handleBeakerDrop(new Event("click"));
                }
              }}
            >
              <img
                src={dropper.state === "filled" ? dropperFilled : dropperEmpty}
                alt="Dropper"
                style={{ maxHeight: 60, objectFit: "contain" }}
              />
              <div style={{ fontSize: "0.8rem" }}>
                {dropper.state === "filled" ? "Filled Dropper" : "Empty Dropper"}
              </div>
            </div>
          </div>
        </div>

        {/* Beaker */}
        <div className="col-12 col-md-6 mb-4 d-flex flex-column align-items-center">
          <h5>Beaker with Water</h5>
          <div
            ref={beakerRef}
            onDrop={handleBeakerDrop}
            onDragOver={handleDragOver}
            className="position-relative mx-auto"
            style={{
              width: "200px",
              height: "250px",
              background: `url(${beaker}) bottom center no-repeat`,
              backgroundSize: "contain",
              overflow: "hidden",
              borderRadius: 20,
              touchAction: "manipulation",
            }}
          >
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: "100%",
                height: `${getWaterHeight()}%`,
                backgroundColor: getSolutionColor(),
                opacity: 0.6,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                borderBottomLeftRadius: 40,
                borderBottomRightRadius: 40,
                transition: "height 0.3s ease, background-color 0.3s ease",
              }}
            ></div>
          </div>
        </div>

        {/* Results */}
        <div className="text-center flex-grow-1">
          <div className="card p-2 mb-3">
            <h5>Beaker Contents</h5>
            <ul className="list-unstyled">
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
              <p>
                Water is:{" "}
                <strong>
                  {hardness < 60
                    ? "Soft"
                    : hardness < 120
                    ? "Moderately Hard"
                    : hardness < 180
                    ? "Hard"
                    : "Very Hard"}
                </strong>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Floating Dropper */}
      {showDropper && dropper.state === "filled" && (
        <div
          style={{
            position: "fixed",
            left: dropperPosition.x,
            top: dropperPosition.y,
            width: 50,
            height: 50,
            zIndex: 1000,
            pointerEvents: "auto",
          }}
          onClick={() => {
            if (isSmallScreen() && dropper.content) handleBeakerDrop(new Event("click"));
          }}
        >
          <img
            src={dropper.content === "water" ? water : dropperFilled}
            alt="Dropper"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>
      )}

      {/* Reset */}
      <div className="text-center mt-4">
        <Button
          variant="outline-danger"
          onClick={() => {
            setBeakerContent({
              water: false,
              buffer: false,
              indicator: false,
              edtaDrops: 0,
            });
            setDropper({ state: "empty", content: null });
            setShowDropper(false);
            setHardness(null);
            setQuizAnswer(null);
            setQuizSubmitted(false);
          }}
        >
          Reset Experiment
        </Button>
      </div>

      {/* Scientific Explanation */}
      <div className="mt-4 p-3 border rounded bg-light">
        <h4>Scientific Explanation</h4>
        <p>
          This experiment demonstrates how the hardness of water can be determined using EDTA
          titration. The indicator changes color when calcium and magnesium ions are completely
          chelated by EDTA. The number of drops required indicates the hardness level in ppm of
          CaCO₃.
        </p>
      </div>

      {/* Quiz */}
      <div className="mt-4 border-top pt-3">
        <h4>Quick Quiz</h4>
        <p>What causes permanent water hardness?</p>
        <Form>
          {["Calcium bicarbonate", "Magnesium sulfate", "Sodium chloride", "Potassium nitrate"].map(
            (opt) => (
              <Form.Check
                key={opt}
                type="radio"
                name="quiz"
                id={opt}
                label={opt}
                checked={quizAnswer === opt}
                onChange={() => setQuizAnswer(opt)}
                disabled={quizSubmitted}
              />
            )
          )}
        </Form>
        <Button
          className="mt-2"
          onClick={() => setQuizSubmitted(true)}
          disabled={!quizAnswer || quizSubmitted}
        >
          Submit Answer
        </Button>
        {quizSubmitted && (
          <Alert
            variant={quizAnswer === "Magnesium sulfate" ? "success" : "danger"}
            className="mt-2"
          >
            {quizAnswer === "Magnesium sulfate"
              ? "Correct! MgSO₄ causes permanent hardness."
              : "Incorrect. The correct answer is Magnesium sulfate."}
          </Alert>
        )}
      </div>
    </div>
  );
}
