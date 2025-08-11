import React, { useState, useRef, useEffect } from "react";
import egg from '../assets/Egg.png';
import Water from '../assets/Water.png';
import Salt from '../assets/Salt.png';
import beaker from '../assets/Beaker.png';

const objects = [
  { image: Water, id: "water", label: "Water" },
  { image: Salt, id: "salt", label: "Salt" },
  { image: egg, id: "egg", label: "Egg" },
];

const EGG_DENSITY = 1.03; // g/cm³
const WATER_BASE_DENSITY = 1.0;
const SALT_COEFF = 0.003;
const SALT_UNIT = 8; // grams per granule / click
const MAX_WATER = 200;
const WATER_UNIT = 30;

function computeDensity(salt, water) {
  if (water <= 0) return WATER_BASE_DENSITY;
  return WATER_BASE_DENSITY + SALT_COEFF * salt * (100 / water);
}

export default function FlotationBootstrap() {
  const [water, setWater] = useState(0);
  const [salt, setSalt] = useState(0);
  const [eggIn, setEggIn] = useState(false);
  const [eggFloat, setEggFloat] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState("");
  const [quizFeedback, setQuizFeedback] = useState("");
  const beakerRef = useRef(null);

  const density = computeDensity(salt, water);

  // Drag handlers for desktop
  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("objectId", id);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (!beakerRef.current) return;

    const rect = beakerRef.current.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;

    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) return;

    const objectId = e.dataTransfer.getData("objectId");
    addObjectToBeaker(objectId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // For mobile / tap support: directly call this onClick
  const addObjectToBeaker = (objectId) => {
    if (objectId === "water") {
      setWater((prev) => Math.min(prev + WATER_UNIT, MAX_WATER));
    } else if (objectId === "salt") {
      setSalt((prev) => prev + SALT_UNIT);
    } else if (objectId === "egg") {
      if (water > 0) setEggIn(true);
    }
  };

  useEffect(() => {
    if (eggIn && density > 0 && EGG_DENSITY > density) setEggFloat(false);
    else if (eggIn) setEggFloat(true);
    else setEggFloat(false);
  }, [eggIn, density]);

  const reset = () => {
    setWater(0);
    setSalt(0);
    setEggIn(false);
    setEggFloat(false);
    setQuizAnswer("");
    setQuizFeedback("");
  };

  const handleQuiz = () => {
    if (quizAnswer === "density") {
      setQuizFeedback("✅ Correct! Removing salt decreases water density, causing the egg to sink.");
    } else {
      setQuizFeedback("❌ Incorrect. Hint: Think about what affects whether the egg floats or sinks — the density of the water.");
    }
  };

  return (
    <div className="container my-5 pt-5 d-flex flex-column align-items-center justify-content-center text-center">
      <h3 className="text-primary mb-4" style={{ color: "#003366" }}>
        Demonstrating the <strong>Law of Flotation</strong> Using an Egg, Salt, and Water
      </h3>

      {/* Hint */}
      <div
        className="alert alert-info w-100"
        style={{
          border: "1px solid #b3d9e8",
          borderRadius: 6,
          color: "#003366",
        }}
      >
        💡<strong>Hint:</strong> The egg will float if the water's density becomes greater than the egg's density.
      </div>

      {/* Procedure dropdown */}
      <div className="accordion w-100 mb-4 shadow-sm" id="procedureAccordion">
        <div className="accordion-item">
          <h2 className="accordion-header" id="procedureHeading">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#procedureCollapse"
              aria-expanded="false"
              aria-controls="procedureCollapse"
            >
              🧪 Steps & Procedure
            </button>
          </h2>
          <div
            id="procedureCollapse"
            className="accordion-collapse collapse"
            aria-labelledby="procedureHeading"
            data-bs-parent="#procedureAccordion"
          >
            <div className="accordion-body">
              <ol>
                <li>Drag water into the beaker or tap it until the desired level is reached.</li>
                <li>Drag the egg into the beaker or tap it and observe whether it sinks.</li>
                <li>Add salt gradually to increase the density of the water.</li>
                <li>Observe the egg’s behavior after each addition of salt.</li>
                <li>Record your observations and explain them using the law of flotation.</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="row align-items-start w-100">
        {/* Left: Tools */}
        <div className="col-12 col-md-3 d-flex justify-content-center flex-wrap mb-4 mb-md-0">
          <h5 className="w-100">Drag or Tap an Object</h5>
          {objects.map(({ image, id, label }) => (
            <div key={id} className="text-center mx-2 my-2" style={{ userSelect: "none" }}>
              <img
                src={image}
                alt={label}
                draggable
                onDragStart={(e) => handleDragStart(e, id)}
                onClick={() => addObjectToBeaker(id)}
                style={{
                  width: "8vw",
                  maxWidth: 60,
                  minWidth: 40,
                  cursor: "grab",
                  borderRadius: 8,
                  border: "1px solid #ccc",
                }}
              />
              <div style={{ fontSize: 14, marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Center: Beaker */}
        <div className="col-12 col-md-6 mb-4 d-flex flex-column align-items-center">
          <h5>Beaker with Water</h5>
          <div
            ref={beakerRef}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="position-relative mx-auto"
            style={{
              width: "250px",
              height: "300px",
              background: `url(${beaker}) bottom center no-repeat`,
              backgroundSize: "contain",
              overflow: "hidden",
              borderRadius: 20,
              touchAction: "manipulation", // improves touch support
            }}
          >
            {/* Water fill */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: "90%",
                height: `${(water / MAX_WATER) * 100}%`,
                backgroundColor: "#42a5f5",
                opacity: 0.6,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                borderBottomLeftRadius: 40,
                borderBottomRightRadius: 40,
                transition: "height 0.3s ease",
              }}
            ></div>

            {/* Salt granules */}
            {Array.from({ length: Math.floor(salt / SALT_UNIT) }).map((_, i) => (
              <img
                key={i}
                src={Salt}
                alt="salt"
                style={{
                  position: "absolute",
                  width: 20,
                  height: 20,
                  bottom: 10,
                  left: 50 + (i % 10) * 25,
                }}
              />
            ))}

            {/* Egg */}
            {eggIn && (
              <img
                src={egg}
                alt="Egg"
                style={{
                  position: "absolute",
                  width: 50,
                  left: "50%",
                  transform: "translateX(-50%)",
                  bottom: eggFloat ? 10 + (water / MAX_WATER) * 60 : 10,
                  transition: "bottom 0.3s ease",
                }}
              />
            )}

            {/* Water Level Percentage */}
            <div
              style={{
                position: "absolute",
                bottom: 5,
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: 12,
                fontWeight: "bold",
                background: "rgba(255,255,255,0.7)",
                padding: "2px 5px",
                borderRadius: 5,
                userSelect: "none",
              }}
            >
              {Math.round((water / MAX_WATER) * 100)}%
            </div>
          </div>
        </div>

        {/* Right: Results */}
        <div className="col-12 col-md-3 mb-4">
          <h5>Results</h5>
          <div className="p-3 border rounded bg-light shadow-sm" style={{ minHeight: "120px" }}>
            <p>Water: {water} mL</p>
            <p>Salt: {salt} g</p>
            <p>Egg: {eggIn ? (eggFloat ? "Floating" : "Sinking") : "Not placed"}</p>
            <button className="btn btn-danger w-100 mt-3" onClick={reset}>
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div className="card my-4 w-100 shadow-sm" style={{ backgroundColor: "#f9f9f9" }}>
        <h5 className="card-title">🧬 Explanation</h5>
        <p>
          This experiment demonstrates the <b>Law of Flotation</b>, which states that an object will
          float if its density is less than the density of the fluid it is placed in. By adding salt
          to water, we increase the water’s density. Once the water’s density becomes greater than
          that of the egg, the egg floats.
        </p>
      </div>

      {/* Quiz Question */}
      <div className="card w-100 shadow-sm">
        <div className="card-body text-start">
          <h6 className="card-title">🧠 Quick Quiz</h6>
          <p>If we remove some salt from the water after the egg is floating, what will happen?</p>
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
              Its weight will change
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
              Its color will change
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
              The density of the water will decrease, so the egg will sink
            </label>
          </div>
          <button className="btn btn-primary mt-2" onClick={handleQuiz}>
            Submit
          </button>
          <div className="mt-2">{quizFeedback}</div>
        </div>
      </div>
    </div>
  );
}
