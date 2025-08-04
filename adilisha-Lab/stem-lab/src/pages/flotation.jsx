import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Collapse,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// constants
const EGG_DENSITY = 1.03; // g/cm³
const WATER_BASE_DENSITY = 1.0;
const SALT_COEFF = 0.003;
const SALT_UNIT = 8; // grams per granule / click
const MAX_WATER_ML = 200;
const WATER_UNIT = 30;
const BEAKER_WIDTH = 140;
const BEAKER_HEIGHT = 220;
const PROXIMITY_PADDING = 60; // forgiving zone for dropping

// improved drag hook: pointer events, computes offset on press (no jump)
function usePointerDrag(onMove, onEnd) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let dragging = false;
    let offsetX = 0;
    let offsetY = 0;

    const down = (e) => {
      e.preventDefault();
      el.setPointerCapture?.(e.pointerId);
      dragging = true;
      const rect = el.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
      el.style.transition = "none";
      el.style.cursor = "grabbing";
      el.style.zIndex = 2000;
      document.addEventListener("pointermove", move);
      document.addEventListener("pointerup", up);
    };

    const move = (e) => {
      if (!dragging) return;
      const x = e.clientX - offsetX;
      const y = e.clientY - offsetY;
      el.style.transform = `translate(${x}px, ${y}px)`;
      if (onMove) onMove({ x, y, event: e });
    };

    const up = (e) => {
      if (!dragging) return;
      dragging = false;
      el.releasePointerCapture?.(e.pointerId);
      el.style.cursor = "grab";
      el.style.zIndex = "";
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerup", up);
      if (onEnd) onEnd({ event: e });
    };

    el.addEventListener("pointerdown", down);
    return () => {
      el.removeEventListener("pointerdown", down);
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerup", up);
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
  return (
    WATER_BASE_DENSITY + SALT_COEFF * saltGrams * (100 / waterVolumeMl)
  );
}

export default function Flotation2D() {
  const [waterVolume, setWaterVolume] = useState(0);
  const [saltInSolution, setSaltInSolution] = useState(0);
  const [eggInside, setEggInside] = useState(false);
  const [eggDensity] = useState(EGG_DENSITY);
  const [hintOpen, setHintOpen] = useState(false);
  const [beakerHighlight, setBeakerHighlight] = useState(false);

  const beakerRef = useRef(null);
  const waterDropRef = useRef(null);
  const eggRef = useRef(null);

  const solutionDensity = useMemo(
    () => computeSolutionDensity(saltInSolution, waterVolume),
    [saltInSolution, waterVolume]
  );
  const immersedFraction = Math.min(eggDensity / solutionDensity, 1);
  const floatOffsetPercent =
    eggDensity > solutionDensity ? 0 : (1 - immersedFraction) * 100;

  let statusText;
  if (waterVolume === 0) statusText = "No water: add water first";
  else if (!eggInside) statusText = "Egg not in water";
  else if (eggDensity > solutionDensity) statusText = "Sinks";
  else if (immersedFraction < 1) statusText = "Partially floats";
  else statusText = "Floats fully";

  const resetAll = () => {
    setWaterVolume(0);
    setSaltInSolution(0);
    setEggInside(false);
    if (eggRef.current) eggRef.current.style.transform = "none";
    if (waterDropRef.current) waterDropRef.current.style.transform = "none";
  };

  // Water drop drag: add water on proximity, reset on release
  const waterDropPointer = usePointerDrag(
    ({ event }) => {
      if (!beakerRef.current || !waterDropRef.current) return;
      const beakerRect = beakerRef.current.getBoundingClientRect();
      const dropRect = waterDropRef.current.getBoundingClientRect();
      const near = isOverBeaker(dropRect, beakerRect);
      setBeakerHighlight(near);
      if (near) {
        setWaterVolume((v) => Math.min(MAX_WATER_ML, v + WATER_UNIT));
      }
    },
    () => {
      if (waterDropRef.current) {
        waterDropRef.current.style.transition = "transform 0.2s ease";
        waterDropRef.current.style.transform = "none";
      }
      setBeakerHighlight(false);
    }
  );
  waterDropRef.current = waterDropPointer.current;

  // Egg drag: proximity to put inside
  const eggPointer = usePointerDrag(
    ({ event }) => {
      if (!beakerRef.current || !eggRef.current) return;
      const beakerRect = beakerRef.current.getBoundingClientRect();
      const eggRect = eggRef.current.getBoundingClientRect();
      const near = isOverBeaker(eggRect, beakerRect);
      setBeakerHighlight(near);
    },
    () => {
      if (!beakerRef.current || !eggRef.current) return;
      const beakerRect = beakerRef.current.getBoundingClientRect();
      const eggRect = eggRef.current.getBoundingClientRect();
      const over = isOverBeaker(eggRect, beakerRect);
      if (over && waterVolume > 0) {
        setEggInside(true);
      } else {
        setEggInside(false);
      }
      setBeakerHighlight(false);
    }
  );
  eggRef.current = eggPointer.current;

  const renderSaltGranules = () => {
    return [...Array(6)].map((_, i) => (
      <SaltGranule2D
        key={i}
        onDropIntoBeaker={() =>
          setSaltInSolution((s) => Math.min(200, s + SALT_UNIT))
        }
        onRemoveFromBeaker={() =>
          setSaltInSolution((s) => Math.max(0, s - SALT_UNIT))
        }
        beakerRef={beakerRef}
        setBeakerHighlight={setBeakerHighlight}
      />
    ));
  };

  return (
    <Card
      elevation={3}
      style={{
        maxWidth: 1000,
        margin: "40px auto 30px",
        padding: 24,
        minHeight: 380,
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Law of Flotation: Egg in Salt Water (Flat 2D)
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
          {/* Left controls */}
          <div
            style={{
              flex: "0 0 400px",
              display: "flex",
              flexDirection: "column",
              gap: 16,
              height: "100%",
            }}
          >
            <div>
              <Typography gutterBottom>
                Water in beaker: {waterVolume} mL / {MAX_WATER_ML} mL
              </Typography>
              <div
                style={{
                  marginBottom: 12,
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <div>
                  <Typography variant="caption" display="block">
                    Add water:
                  </Typography>
                  <div
                    ref={waterDropPointer}
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
                      boxShadow: "0 4px 12px rgba(79,195,247,0.6)",
                      touchAction: "none",
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
                    onClick={() =>
                      setWaterVolume((v) =>
                        Math.min(MAX_WATER_ML, v + WATER_UNIT)
                      )
                    }
                  >
                    + Add {WATER_UNIT} mL
                  </Button>
                  <Button
                    size="small"
                    variant="text"
                    onClick={() =>
                      setWaterVolume((v) => Math.max(0, v - WATER_UNIT))
                    }
                    disabled={waterVolume === 0}
                  >
                    - Remove {WATER_UNIT} mL
                  </Button>
                </div>
              </div>

              <Typography gutterBottom>
                Salt in solution: {saltInSolution} g
              </Typography>
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  flexWrap: "wrap",
                  marginBottom: 6,
                }}
              >
                <Button
                  size="small"
                  variant="text"
                  onClick={() =>
                    setSaltInSolution((s) => Math.min(200, s + SALT_UNIT))
                  }
                >
                  + Add {SALT_UNIT} g salt
                </Button>
                <Button
                  size="small"
                  variant="text"
                  onClick={() =>
                    setSaltInSolution((s) => Math.max(0, s - SALT_UNIT))
                  }
                  disabled={saltInSolution === 0}
                >
                  - Remove {SALT_UNIT} g salt
                </Button>
              </div>

              <Typography>
                Solution density: {solutionDensity.toFixed(4)} g/cm³
              </Typography>
              <Typography>
                Egg density: {eggDensity.toFixed(3)} g/cm³
              </Typography>
              <Typography variant="subtitle1" style={{ marginTop: 8 }}>
                Status: <strong>{statusText}</strong>
              </Typography>
            </div>

            <div>
              <Button
                variant="outlined"
                size="small"
                endIcon={
                  <ExpandMoreIcon
                    style={{
                      transform: hintOpen
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
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
                    backgroundColor: "#f5f5f5",
                    fontSize: 13,
                    lineHeight: 1.4,
                    color: "#333",
                  }}
                >
                  <ul style={{ paddingLeft: 20, margin: 0 }}>
                    <li>
                      Adding salt increases solution density; more salt → denser
                      water.
                    </li>
                    <li>
                      Egg sinks if its density exceeds the solution's density.
                    </li>
                    <li>
                      Egg floats partially when densities are close.
                    </li>
                    <li>
                      Drag salt granules near the beaker to add salt easily.
                    </li>
                    <li>
                      Add water before placing the egg to observe flotation.
                    </li>
                    <li>
                      Immersed fraction = egg density / solution density.
                    </li>
                  </ul>
                </div>
              </Collapse>
            </div>

            <div>
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
                  <Typography variant="caption">
                    Each granule ≈ {SALT_UNIT} g salt.
                  </Typography>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 8 }}>
              <Button variant="outlined" size="small" onClick={resetAll}>
                Reset
              </Button>
            </div>
          </div>

          {/* Visualization panel */}
          <div
            style={{
              flex: "0 0 320px",
              position: "relative",
              height: BEAKER_HEIGHT + 40,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            {/* Beaker */}
            <div
              ref={beakerRef}
              style={{
                position: "relative",
                width: BEAKER_WIDTH,
                height: BEAKER_HEIGHT,
                borderRadius: 12,
                border: "3px solid #3f51b5",
                background: "#e0f4ff",
                overflow: "hidden",
                boxShadow: beakerHighlight
                  ? "0 0 20px rgba(63,81,181,0.4)"
                  : "0 6px 18px rgba(63,81,181,0.2)",
                transition: "box-shadow 0.2s, border-color 0.2s",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
            >
              {/* Water */}
              <div
                style={{
                  width: "100%",
                  height: `${Math.max(
                    5,
                    (waterVolume / MAX_WATER_ML) * 100
                  )}%`,
                  background: "#42a5f5",
                  transition: "height 0.3s",
                  position: "absolute",
                  bottom: 0,
                }}
              />

              {/* Salt pile visual */}
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  bottom: `${Math.max(
                    5,
                    (waterVolume / MAX_WATER_ML) * 100
                  ) - 5}%`,
                  transform: "translateX(-50%)",
                  display: "flex",
                  gap: 4,
                  flexWrap: "wrap",
                  width: 60,
                  pointerEvents: "none",
                }}
              >
                {Array.from({
                  length: Math.min(10, Math.floor(saltInSolution / SALT_UNIT)),
                }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: "#cfcfcf",
                      border: "1px solid #aaa",
                      opacity: 0.7,
                    }}
                  />
                ))}
              </div>

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
                    background: "#fff8e0",
                    border: "2px solid #a78e5f",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    transform: "translateX(-50%)",
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

            {/* Draggable egg when not inside */}
            {!eggInside && (
              <div
                ref={eggPointer}
                style={{
                  position: "absolute",
                  top: 12,
                  left: 12,
                  width: 60,
                  height: 80,
                  borderRadius: "50% 50% 60% 60%",
                  background: "#fff8e0",
                  border: "2px solid #a78e5f",
                  boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  fontWeight: "600",
                  color: "#6b4e22",
                  cursor: "grab",
                  userSelect: "none",
                  touchAction: "none",
                }}
                title="Drag egg into the beaker"
              >
                Egg
              </div>
            )}

            {/* Prompt */}
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

function SaltGranule2D({
  onDropIntoBeaker,
  onRemoveFromBeaker,
  beakerRef,
  setBeakerHighlight,
}) {
  const [inBeaker, setInBeaker] = useState(false);
  const ref = usePointerDrag(
    ({ event }) => {
      if (!beakerRef.current || !ref.current) return;
      const beakerRect = beakerRef.current.getBoundingClientRect();
      const granuleRect = ref.current.getBoundingClientRect();
      const over = isOverBeaker(granuleRect, beakerRect);
      setBeakerHighlight(over);
      if (over && !inBeaker) {
        setInBeaker(true);
        onDropIntoBeaker();
        ref.current.style.opacity = 0.5;
        ref.current.style.transform = "scale(0.8)";
      } else if (!over && inBeaker) {
        setInBeaker(false);
        onRemoveFromBeaker();
        ref.current.style.opacity = 1;
        ref.current.style.transform = "scale(1)";
      }
    },
    () => {
      setBeakerHighlight(false);
    }
  );

  return (
    <div
      ref={ref}
      style={{
        width: 26,
        height: 26,
        borderRadius: "50%",
        background: "#f0f0f0",
        border: "1px solid #888",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 14,
        fontWeight: "700",
        cursor: "grab",
        userSelect: "none",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        position: "relative",
        transition: "opacity 0.2s, transform 0.2s",
        color: "#555",
        touchAction: "none",
      }}
      title={`Salt granule (+${SALT_UNIT} g salt)`}
    >
      +
    </div>
  );
}
