import React, { useState } from "react";
import stoneImg from "../assets/stone.png";
import woodImg from "../assets/wood.png";
import bottleImg from "../assets/bottle.png";
import beakerImg from "../assets/beaker.png";
import "bootstrap/dist/css/bootstrap.min.css";

const objects = [
  { id: "stone", name: "Stone", volume: 30, density: 5.5, image: stoneImg },
  { id: "wood", name: "Wood", volume: 20, density: 0.7, image: woodImg },
  { id: "bottle", name: "Bottle", volume: 10, density: 0.7, image: bottleImg },
];

const MAX_WATER_LEVEL = 100;

export default function ArchimedesSimulation() {
  const [waterLevel, setWaterLevel] = useState(50);
  const [droppedObjects, setDroppedObjects] = useState([]);
  const [result, setResult] = useState("");
  const [quizAnswer, setQuizAnswer] = useState("");
  const [quizFeedback, setQuizFeedback] = useState("");

  const onDragStart = (e, obj) => {
    e.dataTransfer.setData("objectId", obj.id);
  };

  const onDrop = (e) => {
    e.preventDefault();
    const objectId = e.dataTransfer.getData("objectId");
    const obj = objects.find((o) => o.id === objectId);
    if (!obj || droppedObjects.find((o) => o.id === obj.id)) return;

    const newWaterLevel = waterLevel + obj.volume;
    if (newWaterLevel > MAX_WATER_LEVEL) {
      setResult("⚠️ Water overflow! Try resetting.");
      return;
    }

    setWaterLevel(newWaterLevel);
    setDroppedObjects([...droppedObjects, obj]);

    let explanation = "";
    if (obj.density > 1) explanation = `${obj.name} sinks due to higher density than water.`;
    else if (obj.density < 1) explanation = `${obj.name} floats since it's less dense than water.`;
    else explanation = `${obj.name} is neutrally buoyant and stays suspended.`;

    setResult(explanation);
  };

  const onDragOver = (e) => e.preventDefault();

  const reset = () => {
    setWaterLevel(50);
    setDroppedObjects([]);
    setResult("");
    setQuizAnswer("");
    setQuizFeedback("");
  };

  const handleQuiz = () => {
    if (quizAnswer === "density") {
      setQuizFeedback("✅ Correct! Objects sink or float based on density.");
    } else {
      setQuizFeedback("❌ Try again! Hint: Think about how heavy the object is compared to water.");
    }
  };

  return (
    <div className="container my-5 d-flex flex-column align-items-center justify-content-center text-center">
      <h2 className="mb-4 text-primary">Archimedes' Principle Interactive Simulation</h2>

      {/* Hints */}
      <div className="alert alert-info w-100">
        💡 <strong>Hint:</strong> Objects that are denser than water will sink. Lighter objects float!
      </div>

      {/* Steps */}
      <div className="card w-100 mb-4 shadow-sm">
        <div className="card-body text-start">
          <h5 className="card-title">🧪 Steps & Procedure</h5>
          <ol>
            <li>Observe the beaker filled with water at 50% level.</li>
            <li>Drag one of the objects (Stone, Wood, Bottle) into the beaker.</li>
            <li>Notice the water level increase and the object behavior.</li>
            <li>Read the scientific result of your experiment.</li>
            <li>Click reset to start again.</li>
          </ol>
        </div>
      </div>

      <div className="row w-100">
        {/* Objects */}
        <div className="col-md-3 mb-4">
          <h5>Drag an Object</h5>
          <div className="d-flex flex-column gap-3">
            {objects.map((obj) => (
              <img
                key={obj.id}
                src={obj.image}
                alt={obj.name}
                draggable={!droppedObjects.find((o) => o.id === obj.id)}
                onDragStart={(e) => onDragStart(e, obj)}
                className="img-fluid border rounded"
                style={{
                  height: "80px",
                  objectFit: "contain",
                  opacity: droppedObjects.find((o) => o.id === obj.id) ? 0.5 : 1,
                  cursor: "grab",
                }}
              />
            ))}
          </div>
        </div>

        {/* Beaker */}
        <div className="col-md-6 mb-4 d-flex flex-column align-items-center">
          <h5>Beaker with Water</h5>
          <div
            className="position-relative"
            onDrop={onDrop}
            onDragOver={onDragOver}
            style={{
              width: "250px",
              height: "300px",
              backgroundImage: `url(${beakerImg})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              position: "relative",
            }}
          >
            {/* Water Level */}
            <div
              style={{
                position: "absolute",
                bottom: "0",
                left: "0",
                width: "100%",
                height: `${waterLevel}%`,
                backgroundColor: "#0d6efd",
                opacity: 0.5,
                transition: "height 0.5s ease",
                borderBottomLeftRadius: "50% 10%",
                borderBottomRightRadius: "50% 10%",
              }}
            ></div>

            
            {/* Objects dropped */}
            {droppedObjects.map((obj, index) => {
              const isFloating = obj.density < 1;
              const positionStyle = {
                width: "40px",
                left: "50%",
                transform: "translateX(-50%)",
                position: "absolute",
                transition: "bottom 0.5s ease",
                bottom: isFloating ? `${waterLevel - 5 + index * 5}%` : `${index * 8}%`, // float at water surface or sink to bottom
              };

              return (
                <img
                  key={obj.id}
                  src={obj.image}
                  alt={obj.name}
                  style={positionStyle}
                />
              );
            })}

          </div>

          {/* Water Level Indicator */}
          <div className="mt-2 fw-bold text-primary">Water Level: {waterLevel}%</div>
        </div>

        {/* Result */}
        <div className="col-md-3 mb-4">
          <h5>Result</h5>
          <div className="border rounded p-3 bg-light shadow-sm" style={{ minHeight: "120px" }}>
            {result || "Drop an object to see what happens."}
          </div>
          <button className="btn btn-danger mt-3 w-100" onClick={reset}>Reset</button>
        </div>
      </div>

      {/* Explanation */}
      <div className="card w-100 my-4 shadow-sm">
        <div className="card-body text-start">
          <h5 className="card-title">📘 Explanation</h5>
          <p>
            Archimedes’ Principle states that any object, wholly or partially immersed in a fluid,
            is buoyed up by a force equal to the weight of the fluid displaced by the object.
            Whether an object sinks or floats depends on its <strong>density</strong> compared to water.
          </p>
        </div>
      </div>

      {/* Quiz */}
      <div className="card w-100 shadow-sm">
        <div className="card-body text-start">
          <h5 className="card-title">📝 Quiz</h5>
          <p>What determines if an object will float or sink in water?</p>
          <div className="form-check">
            <input
              type="radio"
              name="quiz"
              id="weight"
              value="weight"
              className="form-check-input"
              checked={quizAnswer === "weight"}
              onChange={(e) => setQuizAnswer(e.target.value)}
            />
            <label className="form-check-label" htmlFor="weight">
              Its weight
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              name="quiz"
              id="color"
              value="color"
              className="form-check-input"
              checked={quizAnswer === "color"}
              onChange={(e) => setQuizAnswer(e.target.value)}
            />
            <label className="form-check-label" htmlFor="color">
              Its color
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              name="quiz"
              id="density"
              value="density"
              className="form-check-input"
              checked={quizAnswer === "density"}
              onChange={(e) => setQuizAnswer(e.target.value)}
            />
            <label className="form-check-label" htmlFor="density">
              Its density
            </label>
          </div>
          <button className="btn btn-primary mt-2" onClick={handleQuiz}>Submit</button>
          <div className="mt-2">{quizFeedback}</div>
        </div>
      </div>
    </div>
  );
}
