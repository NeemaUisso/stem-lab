import React, { useState, useMemo, useRef, useEffect } from "react";
import { Card, CardContent, Typography, Button, Collapse } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// constants
const EGG_DENSITY = 1.03; // g/cm³
const WATER_BASE_DENSITY = 1.0; // pure water
const SALT_COEFF = 0.003; // tuned for visible float effect
const SALT_UNIT = 8; // grams per granule / click
const MAX_WATER_ML = 200; // capacity of beaker in mL
const WATER_UNIT = 30; // each drop or click adds 30 mL
const BEAKER_WIDTH = 140;
const BEAKER_HEIGHT = 220;
const PROXIMITY_PADDING = 35; // forgiving area for drop detection

function useSimpleDrag(onMove, onEnd) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let offsetX = 50,
      offsetY = 0,
      dragging = false;

    const down = (e) => {
      e.preventDefault();
      dragging = true;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const rect = el.getBoundingClientRect();
      offsetX = clientX - rect.left;
      offsetY = clientY - rect.top;
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
      document.addEventListener("touchmove", move, { passive: false });
      document.addEventListener("touchend", up);
      el.style.transition = "none";
      el.style.cursor = "grabbing";
    };

    const move = (e) => {
      if (!dragging) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const x = clientX - offsetX;
      const y = clientY - offsetY;
      el.style.transform = `translate(${x}px, ${y}px)`;
      if (onMove) onMove({ x, y, event: e });
    };

    const up = (e) => {
      if (!dragging) return;
      dragging = false;
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
      document.removeEventListener("touchmove", move);
      document.removeEventListener("touchend", up);
      el.style.cursor = "grab";
      if (onEnd) onEnd({ event: e });
    };

    el.addEventListener("mousedown", down);
    el.addEventListener("touchstart", down, { passive: false });

    return () => {
      el.removeEventListener("mousedown", down);
      el.removeEventListener("touchstart", down);
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
      document.removeEventListener("touchmove", move);
      document.removeEventListener("touchend", up);
    };
  }, [onMove, onEnd]);
  return ref;
}

function isOverBeaker(rect, beakerRect, padding = PROXIMITY_PADDING) {
  return (
    rect.right > beakerRect.left - padding &&
    rect.left < beakerRect.right + padding &&
    rect.bottom > beakerRect.top - padding &&
    rect.top < beakerRect.bottom + padding
  );
}

function computeSolutionDensity(saltGrams, waterVolumeMl) {
  if (waterVolumeMl <= 0) return WATER_BASE_DENSITY;
  return WATER_BASE_DENSITY + SALT_COEFF * saltGrams * (100 / waterVolumeMl);
}

export default function Flotation() {
  const [waterVolume, setWaterVolume] = useState(0);
  const [saltInSolution, setSaltInSolution] = useState(0);
  const [eggInside, setEggInside] = useState(false);
  const [eggSettled, setEggSettled] = useState(false);
  const [eggDensity] = useState(EGG_DENSITY);
  const [hintOpen, setHintOpen] = useState(false);

  const beakerRef = useRef(null);

  const waterDropRef = useSimpleDrag(null, () => {
    if (!beakerRef.current || !waterDropRef.current) return;
    const beakerRect = beakerRef.current.getBoundingClientRect();
    const dropRect = waterDropRef.current.getBoundingClientRect();
    if (isOverBeaker(dropRect, beakerRect)) {
      setWaterVolume((v) => Math.min(MAX_WATER_ML, v + WATER_UNIT));
      waterDropRef.current.style.transform = "none";
    }
  });

  const eggRef = useSimpleDrag(null, () => {
    if (!beakerRef.current || !eggRef.current) return;
    const beakerRect = beakerRef.current.getBoundingClientRect();
    const eggRect = eggRef.current.getBoundingClientRect();
    if (isOverBeaker(eggRect, beakerRect) && waterVolume > 0) {
      setEggInside(true);
      setEggSettled(true);
      eggRef.current.style.transform = "none";
    } else {
      setEggInside(false);
      setEggSettled(false);
    }
  });

  const solutionDensity = useMemo(
    () => computeSolutionDensity(saltInSolution, waterVolume),
    [saltInSolution, waterVolume]
  );

  const immersedFraction = Math.min(eggDensity / solutionDensity, 1);
  const floatOffsetPercent = eggDensity > solutionDensity ? 0 : (1 - immersedFraction) * 100;

  let statusText;
  if (waterVolume === 0) {
    statusText = "No water: add water first";
  } else if (!eggInside) {
    statusText = "Egg not in water";
  } else if (eggDensity > solutionDensity) {
    statusText = "Sinks";
  } else if (immersedFraction < 1) {
    statusText = "Partially floats";
  } else {
    statusText = "Floats fully";
  }

  const resetAll = () => {
    setWaterVolume(0);
    setSaltInSolution(0);
    setEggInside(false);
    setEggSettled(false);
    if (eggRef.current) eggRef.current.style.transform = "none";
    if (waterDropRef.current) waterDropRef.current.style.transform = "none";
  };

  const renderSaltGranules = () => {
    return [...Array(6)].map((_, i) => (
      <SaltGranule
        key={i}
        onDropIntoBeaker={() =>
          setSaltInSolution((s) => Math.min(200, s + SALT_UNIT))
        }
        onRemoveFromBeaker={() =>
          setSaltInSolution((s) => Math.max(0, s - SALT_UNIT))
        }
        beakerRef={beakerRef}
      />
    ));
  };

  return (
    <Card elevation={4} style={{ maxWidth: 1000, margin: "40px auto 30px", padding: 24, minHeight: 360,  }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Law of Flotation: Egg in Salt Water
        </Typography>

        <div
          style={{
            display: "flex",
            gap: 40,
            flexWrap: "nowrap",
            alignItems: "flex-start",
            marginTop: 24,
            justifyContent: "space-between",
          }}
        >
          {/* Left controls and hints */}
          <div
            style={{
              flex: "0 0 400px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <div>
              <Typography gutterBottom>
                Water in beaker: {waterVolume} mL / {MAX_WATER_ML} mL
              </Typography>
              <div style={{ marginBottom: 12, display: "flex", alignItems: "center", gap: 16 }}>
                <div>
                  <Typography variant="caption" display="block">
                    Add water:
                  </Typography>
                  <div
                    ref={waterDropRef}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: "#4fc3f7",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontWeight: "bold",
                      cursor: "grab",
                      userSelect: "none",
                      position: "relative",
                      boxShadow: "0 0 10px #4fc3f7",
                      perspective: "500px",
                      transformStyle: "preserve-3d",
                    }}
                    title="Drag this water drop into the beaker"
                  >
                    💧
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Button
                    size="small"
                    variant="text"
                    onClick={() => setWaterVolume((v) => Math.min(MAX_WATER_ML, v + WATER_UNIT))}
                  >
                    + Add {WATER_UNIT} mL
                  </Button>
                  <Button
                    size="small"
                    variant="text"
                    onClick={() => setWaterVolume((v) => Math.max(0, v - WATER_UNIT))}
                    disabled={waterVolume === 0}
                  >
                    - Remove {WATER_UNIT} mL
                  </Button>
                </div>
              </div>

              <Typography gutterBottom>Salt in solution: {saltInSolution} g</Typography>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 6 }}>
                <Button
                  size="small"
                  variant="text"
                  onClick={() => setSaltInSolution((s) => Math.min(200, s + SALT_UNIT))}
                >
                  + Add {SALT_UNIT} g salt
                </Button>
                <Button
                  size="small"
                  variant="text"
                  onClick={() => setSaltInSolution((s) => Math.max(0, s - SALT_UNIT))}
                  disabled={saltInSolution === 0}
                >
                  - Remove {SALT_UNIT} g salt
                </Button>
              </div>

              <Typography>Solution density: {solutionDensity.toFixed(4)} g/cm³</Typography>
              <Typography>Egg density: {eggDensity.toFixed(3)} g/cm³</Typography>
              <Typography variant="subtitle1" style={{ marginTop: 8 }}>
                Status: <strong>{statusText}</strong>
              </Typography>
            </div>

            {/* Hint / Logic dropdown */}
            <div style={{ marginTop: 16 }}>
              <Button
                variant="outlined"
                size="small"
                endIcon={
                  <ExpandMoreIcon
                    style={{
                      transform: hintOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s",
                    }}
                  />
                }
                onClick={() => setHintOpen((o) => !o)}
              >
                Hint / Logic
              </Button>
              <Collapse in={hintOpen}>
                <div
                  style={{
                    marginTop: 12,
                    padding: 12,
                    border: "1px solid #ccc",
                    borderRadius: 6,
                    backgroundColor: "#f9f9f9",
                    fontSize: 13,
                    lineHeight: 1.5,
                    color: "#333",
                  }}
                >
                  <ul style={{ paddingLeft: 20, margin: 0 }}>
                    <li>
                      Water density increases with added salt; higher salt concentration means higher water density.
                    </li>
                    <li>Egg sinks if its density is higher than the solution's density.</li>
                    <li>Egg floats partially if its density is close but less than solution density.</li>
                    <li>Drag salt granules to increase the solution density gradually.</li>
                    <li>Add water before dragging the egg into the beaker to observe flotation.</li>
                    <li>The immersed fraction is the ratio of egg density to solution density.</li>
                  </ul>
                </div>
              </Collapse>
            </div>

            <div style={{ marginTop: 16 }}>
              <Typography gutterBottom>
                Drag salt granules into the beaker to increase density:
              </Typography>
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  flexWrap: "wrap",
                  padding: 8,
                  border: "1px dashed #888",
                  borderRadius: 6,
                  minHeight: 100,
                  background: "#fafafa",
                }}
              >
                {renderSaltGranules()}
                <div style={{ marginTop: 8 }}>
                  <Typography variant="caption">Each granule ≈ {SALT_UNIT} g salt.</Typography>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 16 }}>
              <Button variant="outlined" size="small" onClick={resetAll}>
                Reset
              </Button>
            </div>
          </div>

          {/* Right visualization - beaker + egg */}
          <div
            style={{
              flex: "0 0 320px",
              position: "relative",
              height: BEAKER_HEIGHT + 40,
              perspective: 900,
            }}
          >
            {/* Beaker with 3D rotation */}
            <div
              ref={beakerRef}
              style={{
                position: "absolute",
                left: "50%",
                bottom: 0,
                width: BEAKER_WIDTH,
                height: BEAKER_HEIGHT,
                borderRadius: "0 0 18px 18px",
                overflow: "hidden",
                background:
                  "linear-gradient(135deg, #e0f0ff 0%, #a0c4ff 100%)",
                border: "3px solid #3f51b5",
                boxShadow:
                  "0 12px 30px rgba(63, 81, 181, 0.3), inset 0 0 30px rgba(255, 255, 255, 0.6)",
                transform: "translateX(-50%) rotateX(15deg) rotateY(-8deg)",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Water level */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  height: `${Math.max(5, (waterVolume / MAX_WATER_ML) * 100)}%`,
                  background:
                    "linear-gradient(to top, #2196f3cc, #90caf9aa)",
                  boxShadow:
                    "inset 0 8px 30px #bbdefb99, inset 0 -8px 20px #1976d299",
                  transition: "height 0.3s",
                  clipPath: "polygon(0 6%, 100% 0%, 100% 100%, 0 100%)",
                }}
              />

              {/* Egg inside */}
              {eggInside && waterVolume > 0 && (
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    bottom: `${floatOffsetPercent}%`,
                    width: 52,
                    height: 72,
                    borderRadius: "50% 50% 60% 60%",
                    background:
                      "radial-gradient(circle at 30% 30%, #fffbe6, #d7c39e 65%, #b4996d 90%)",
                    border: "2px solid #a78e5f",
                    boxShadow:
                      "0 12px 20px rgba(0,0,0,0.2), inset 0 6px 15px rgba(255,255,255,0.6)",
                    transform: "translateX(-50%) rotateY(20deg) rotateX(10deg)",
                    transition: "bottom 0.3s",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                    fontWeight: "600",
                    color: "#6b4e22",
                    userSelect: "none",
                    pointerEvents: "none",
                  }}
                >
                  Egg
                </div>
              )}
            </div>

            {/* Draggable egg outside */}
            {!eggInside && (
              <div
                ref={eggRef}
                style={{
                  width: 60,
                  height: 80,
                  borderRadius: "50% 50% 60% 60%",
                  background:
                    "radial-gradient(circle at 30% 30%, #fffbe6, #d7c39e 65%, #b4996d 90%)",
                  border: "2px solid #a78e5f",
                  boxShadow:
                    "0 14px 28px rgba(0,0,0,0.25), inset 0 6px 15px rgba(255,255,255,0.7)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  fontWeight: "600",
                  color: "#6b4e22",
                  cursor: "grab",
                  userSelect: "none",
                  position: "absolute",
                  top: 12,
                  left: 12,
                  transition: "bottom 0.3s",
                  perspective: 900,
                }}
                title="Drag egg into the beaker"
              >
                Egg
              </div>
            )}

            {/* Hint text for dragging egg */}
            {!eggInside && (
              <div
                style={{
                  position: "absolute",
                  bottom: BEAKER_HEIGHT + 18,
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "#ffffffdd",
                  padding: "6px 14px",
                  borderRadius: 8,
                  fontSize: 13,
                  border: "1px solid #ccc",
                  userSelect: "none",
                }}
              >
                Drag the egg into the water
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function SaltGranule({ onDropIntoBeaker, onRemoveFromBeaker, beakerRef }) {
  const [inBeaker, setInBeaker] = useState(false);
  const ref = useSimpleDrag(null, () => {
    if (!beakerRef.current || !ref.current) return;
    const beakerRect = beakerRef.current.getBoundingClientRect();
    const granuleRect = ref.current.getBoundingClientRect();
    const over = isOverBeaker(granuleRect, beakerRect);

    if (over && !inBeaker) {
      setInBeaker(true);
      onDropIntoBeaker();
      ref.current.style.opacity = 0.5;
    } else if (!over && inBeaker) {
      setInBeaker(false);
      onRemoveFromBeaker();
      ref.current.style.opacity = 1;
    }
  });

  return (
    <div
      ref={ref}
      style={{
        width: 26,
        height: 26,
        borderRadius: "50%",
        background: "radial-gradient(circle at 30% 30%, #fff, #bbb)",
        border: "1px solid #888",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 14,
        fontWeight: "700",
        cursor: "grab",
        userSelect: "none",
        boxShadow: "0 3px 6px rgba(0,0,0,0.1), inset 0 1px 1px #fff",
        position: "relative",
        transition: "opacity 0.3s",
        color: "#555",
      }}
      title={`Salt granule (+${SALT_UNIT} g salt)`}
    >
      +
    </div>
  );
}
