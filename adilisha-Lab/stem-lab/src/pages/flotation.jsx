import React, { useState, useRef, useEffect } from "react";
import egg from '../assets/Egg.png';
import Water from '../assets/Water.png';
import Salt from '../assets/Salt.png';
import beaker from '../assets/Beaker.png';

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
  const [showHints, setShowHints] = useState(false);
  const beakerRef = useRef(null);

  const density = computeDensity(salt, water);

  const handleDrop = (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("type");
    const rect = beakerRef.current.getBoundingClientRect();
    const x = e.clientX,
      y = e.clientY;

    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      return;
    }

    if (type === "water") {
      setWater((prev) => Math.min(prev + WATER_UNIT, MAX_WATER));
    } else if (type === "salt") {
      setSalt((prev) => prev + SALT_UNIT);
    } else if (type === "egg" && water > 0) {
      setEggIn(true);
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  useEffect(() => {
    if (eggIn && density > 0 && EGG_DENSITY > density) {
      setEggFloat(false);
    } else if (eggIn) {
      setEggFloat(true);
    } else {
      setEggFloat(false);
    }
  }, [eggIn, density]);

  const reset = () => {
    setWater(0);
    setSalt(0);
    setEggIn(false);
    setEggFloat(false);
    setShowHints(false);
  };

  return (
    <div className="container my-4">
      <h3 className="text-center mb-4">Flotation Practical</h3>

      {/* Hints Button + Dropdown at the Top with left arrow */}
      <div className="mb-4">
        <button
          className="btn btn-info d-flex align-items-center"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#hintsCollapse"
          aria-expanded={showHints}
          aria-controls="hintsCollapse"
          style={{ width: "100%", justifyContent: "flex-start" }}
          onClick={() => setShowHints(!showHints)}
        >
          <span style={{ marginRight: 8 , backgroundColor:"#2596be"}}>{showHints ? "▼" : "▶"}</span>
          Hints / Logic
        </button>
        <div className={`collapse ${showHints ? "show" : ""}`} id="hintsCollapse">
          <div
            className="card card-body"
            style={{ backgroundColor: "#f8f9fa", border: "1px solid #ccc" }}
          >
            <ul style={{ marginBottom: 0 }}>
              <li>Drag the egg to the beaker to test if it floats or sinks.</li>
              <li>Drag salt to increase water density.</li>
              <li>Use water only inside the beaker.</li>
              <li>Observe changes after each interaction.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="row justify-content-center">
        {/* Draggables */}
        <div className="d-flex justify-content-center flex-wrap mb-3">
          {[
            { src: Water, alt: "Water" },
            { src: Salt, alt: "Salt" },
            { src: egg, alt: "Egg" },
          ].map(({ src, alt }) => (
            <div key={alt} className="text-center mx-3" style={{ display: "inline-block" }}>
              <img
                src={src}
                alt={alt}
                draggable
                onDragStart={(e) => e.dataTransfer.setData("type", alt.toLowerCase())}
                style={{
                  width: "8vw",
                  maxWidth: 60,
                  minWidth: 40,
                  cursor: "grab",
                  margin: 10,
                  display: "inline-block",
                }}
              />
              <div style={{ fontSize: 14, marginTop: 4 }}>{alt}</div>
            </div>
          ))}
        </div>

        {/* Beaker Area */}
        <div className="col-md-8">
          <div
            ref={beakerRef}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="position-relative mx-auto"
            style={{
              width: 200,
              height: 300,
              background: `url(${beaker}) bottom center no-repeat`,
              backgroundSize: "contain",
              overflow: "hidden",
              borderRadius: 20,
            }}
          >
            {/* Water fill */}
            <div
              style={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)", 
              width: "70%", 
              height: `${(water / MAX_WATER)*100 }%`,
              backgroundColor: "#42a5f5",
              opacity: 0.6,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              borderBottomLeftRadius: 40, 
              borderBottomRightRadius: 40,
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
                  bottom: ((water / MAX_WATER) * 300) + 10 + i * 15,
                  left: 20 + (i % 5) * 30,
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
                  bottom: eggFloat ? 10 + ((water / MAX_WATER) * 200 * 0.3) +((salt /(MAX_WATER / SALT_UNIT)) * 10) : 10,
                }}
              />
            )}
          </div>
        </div>

        {/* Status + Controls */}
        <div className="text-center mt-3">
          <p>Water: {water} mL, Salt: {salt} g</p>
          <p>Egg: {eggIn ? (eggFloat ? "Floating" : "Sinking") : "Not placed"}</p>
          <button className="btn btn-danger me-2" onClick={reset}>
            Reset
          </button>
          {/* Bottom hint button removed */}
        </div>
      </div>
    </div>
  );
}
