import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { MultiBackend, TouchTransition } from 'react-dnd-multi-backend';

import beaker from '../assets/Beaker.png';
import dropper_empty from '../assets/dropper_empty.png';
import dropper_filled from '../assets/dropper_filled.png';
import litmus_red from '../assets/litmus_red.png';
import litmus_purple from '../assets/litmus_purple.png';
import litmus_blue from '../assets/litmus_blue.png';
import bottle_acid from '../assets/bottle_acid.png';
import bottle_base from '../assets/bottle_base.png';

// Hybrid backend for touch + mouse
const HTML5toTouch = {
  backends: [
    { backend: HTML5Backend },
    {
      backend: TouchBackend,
      options: { enableMouseEvents: true },
      preview: true,
      transition: TouchTransition,
    },
  ],
};

const ItemTypes = {
  DROPPER: 'dropper',
  SOURCE_BOTTLE: 'source_bottle',
};

function getPH(acidVol, baseVol) {
  if (acidVol === 0 && baseVol === 0) return 7;
  const total = acidVol + baseVol;
  const acidRatio = acidVol / total;
  const baseRatio = baseVol / total;
  let pH = 7 + (baseRatio - acidRatio) * 6;
  return Math.min(14, Math.max(1, +pH.toFixed(2)));
}

function mixColor(acidVol, baseVol) {
  const total = acidVol + baseVol;
  if (total === 0) return '#6BCB77';
  const ratio = acidVol / total;
  const r = Math.round(255 * ratio + 76 * (1 - ratio));
  const g = Math.round(76 * ratio + 203 * (1 - ratio));
  const b = Math.round(76 * ratio + 255 * (1 - ratio));
  return `rgb(${r},${g},${b})`;
}

// ---------------- Dropper Component ----------------
function Dropper({ dropper, onClear }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.DROPPER,
    item: { type: ItemTypes.DROPPER },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  }), [dropper]);

  const imgSrc = dropper.currentVolume > 0 ? dropper_filled : dropper_empty;

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1, cursor: 'grab', touchAction: 'none' }} className="dropper">
      <img src={imgSrc} alt="dropper" style={{ width: 120, maxWidth: '100%', height: 'auto' }} />
      <div className="text-center small mt-1">
        <strong>Dropper</strong>
        <div>{dropper.currentVolume.toFixed(1)} ml</div>
        <div style={{ fontSize: 12 }}>
          <span className="me-2">acid: {dropper.acidVol.toFixed(1)}ml</span>
          <span>base: {dropper.baseVol.toFixed(1)}ml</span>
        </div>
        <button className="btn btn-sm btn-outline-secondary mt-2" onClick={onClear}>Empty</button>
      </div>
    </div>
  );
}

// ---------------- SourceBottle Component ----------------
function SourceBottle({ kind }) {
  const imgSrc = kind === 'acid' ? bottle_acid : bottle_base;
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.SOURCE_BOTTLE,
    item: { type: ItemTypes.SOURCE_BOTTLE, kind },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  }), [kind]);

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1, cursor: 'grab', touchAction: 'none' }} className="text-center">
      <img src={imgSrc} alt={`${kind} bottle`} style={{ width: 120, maxWidth: '100%' }} />
      <div className="small mt-1">{kind === 'acid' ? 'Acid Bottle' : 'Base Bottle'}</div>
    </div>
  );
}

// ---------------- LitmusPaper Component ----------------
function LitmusPaper({ pH }) {
  let src = litmus_purple;
  let interpretation = 'Neutral-ish';
  if (pH < 7) { src = litmus_red; interpretation = 'Acidic'; }
  else if (pH > 7) { src = litmus_blue; interpretation = 'Basic/Alkaline'; }

  return (
    <div style={{ cursor: 'pointer' }} onClick={() => alert(`pH = ${pH}\nInterpretation: ${interpretation}`)}>
      <img src={src} alt="litmus" style={{ width: 48 }} />
      <div style={{ fontSize: 12 }}>{interpretation}</div>
    </div>
  );
}

// ---------------- Container Component ----------------
function Container({ id, label, container, onDropperDrop, onSourceDrop, onQuizTrigger }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: [ItemTypes.DROPPER, ItemTypes.SOURCE_BOTTLE],
    drop: (item) => {
      if (item.type === ItemTypes.DROPPER) onDropperDrop(id);
      else if (item.type === ItemTypes.SOURCE_BOTTLE && item.kind) onSourceDrop(id, item.kind);
    },
    collect: monitor => ({ isOver: monitor.isOver() })
  }), [container, onDropperDrop, onSourceDrop]);

  const totalVol = container.acidVol + container.baseVol;
  const heightPercent = Math.min(100, (totalVol / 100) * 100);
  const liquidColor = mixColor(container.acidVol, container.baseVol);
  const overflow = totalVol > 100;
  const pH = getPH(container.acidVol, container.baseVol);

  if (overflow) onQuizTrigger?.();

  return (
    <div className=" col-4 text-center mb-4">
      <h5>{label}</h5>
      <div ref={drop} className="beaker" style={{ position: 'relative', width: '100%', maxWidth: 160, height: 220, margin: '0 auto' }}>
        <img src={beaker} alt={label} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        <div className="liquid" style={{
          position: 'absolute',
          bottom: 15,
          left: 5,
          right: 5,
          height: `${heightPercent}%`,
          background: liquidColor,
          borderRadius: 30,
          transition: 'height 0.5s ease, background 0.5s ease',
          zIndex: 5
        }} />
        {isOver && <div style={{ position:'absolute', inset:0, background:'rgba(255,255,0,0.08)', border:'2px dashed rgba(0,0,0,0.2)', zIndex:10, borderRadius:8 }} />}
        {overflow && <div className="text-danger fw-bold position-absolute w-100 text-center" style={{top:5}}>⚠ Overflow!</div>}
      </div>
      <div className="mt-2 small d-flex flex-wrap justify-content-center align-items-center gap-2">
        <div>Volume: <strong>{totalVol.toFixed(1)} ml</strong></div>
        <div>pH: <strong>{pH}</strong></div>
        <LitmusPaper pH={pH} />
      </div>
    </div>

  );
}

// ---------------- Main Simulation ----------------
export default function AcidBaseTitration() {
  const [containers, setContainers] = useState({
    beaker: { acidVol: 20, baseVol: 0 },
    testTube: { acidVol: 0, baseVol: 0 },
    flask: { acidVol: 0, baseVol: 0 },
  });

  const dropperCapacity = 5;
  const [dropper, setDropper] = useState({ currentVolume: 0, acidVol: 0, baseVol: 0 });
  const [simfeedback, setSimFeedback] = useState('');  // kwa actions za drag & drop

   const [quizFeedback, setQuizFeedback] = useState(""); // kwa quiz pekee

  const [quiz, setQuiz] = useState(null);

  const handleQuizTrigger = () => {
  setQuiz(questions[0]); // show first quiz
};

  const handleDropperOnContainer = useCallback((containerId) => {
    setContainers(prev => {
      const target = prev[containerId];
      let newFeedback = '';

      if (dropper.currentVolume === 0) {
        const total = target.acidVol + target.baseVol;
        if (total <= 0) return prev;
        const amountToTake = Math.min(dropperCapacity, total);
        const acidTaken = (target.acidVol / total) * amountToTake || 0;
        const baseTaken = (target.baseVol / total) * amountToTake || 0;
        const newContainer = { acidVol: target.acidVol - acidTaken, baseVol: target.baseVol - baseTaken };
        setDropper({ currentVolume: amountToTake, acidVol: acidTaken, baseVol: baseTaken });
        newFeedback = `Picked up ${amountToTake.toFixed(1)}ml from ${containerId}`;
        setSimFeedback(newFeedback);
        return { ...prev, [containerId]: newContainer };
      }

      const newContainer = {
        acidVol: target.acidVol + dropper.acidVol,
        baseVol: target.baseVol + dropper.baseVol,
      };
      setDropper({ currentVolume: 0, acidVol: 0, baseVol: 0 });
      newFeedback = `Poured ${dropper.currentVolume.toFixed(1)}ml into ${containerId}`;
      setSimFeedback(newFeedback);
      return { ...prev, [containerId]: newContainer };
    });
  }, [dropper]);

  const handleSourceOnContainer = useCallback((containerId, kind) => {
    const added = 3;
    setContainers(prev => {
      const t = prev[containerId];
      return kind === 'acid'
        ? { ...prev, [containerId]: { acidVol: t.acidVol + added, baseVol: t.baseVol } }
        : { ...prev, [containerId]: { acidVol: t.acidVol, baseVol: t.baseVol + added } };
    });
    setSimFeedback(`${kind.charAt(0).toUpperCase() + kind.slice(1)} added to ${containerId}`);
  }, []);

  const clearDropper = () => setDropper({ currentVolume: 0, acidVol: 0, baseVol: 0 });
  const resetAll = () => {
    setContainers({
      beaker: { acidVol: 20, baseVol: 0 },
      testTube: { acidVol: 0, baseVol: 0 },
      flask: { acidVol: 0, baseVol: 0 },
    });
    clearDropper();
    setSimFeedback('');
    setQuiz(null);
  };

     const [selected, setSelected] = useState("");  // choice ya user
      

  const correctAnswer = "blue";

  const handleSubmit = () => {

    if (!selected) {
      setQuizFeedback("⚠️ Please select answer.");
      return;
    }
    if (selected === correctAnswer) {
      setQuizFeedback("✅ Correct! A base turns red litmus paper blue.");
    } else {
      setQuizFeedback("❌ Incorrect! Try again.");
    }

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
    <DndProvider backend={MultiBackend} options={HTML5toTouch}>
      <div className="container my-4 pt-5">

      <div className="d-flex align-items-center mb-4">
          {/* Back Button */}
          <button onClick={goBack} className="btn btn-outline-secondary me-3">
            ⬅
          </button>

          {/* Title */}
          <h2 className="mb-0 text-primary fs-3">
           <strong>Acid-Base Titration — Drag & Drop Simulation</strong>
          </h2>
        </div>

        {/* Hint */}
      <div className="alert alert-info w-100"
        style={{
          border: "1px solid #b3d9e8",
          borderRadius: 6,
          color: "#003366",
        }}
        >
        💡 <strong>Hint:</strong> Use litmus paper to test acidity or basicity: acid turns blue litmus red, base turns red litmus blue!.
      </div>

      {/* Steps & Procedure Dropdown */}
      <div className="accordion w-100 mb-4 shadow-sm" id="procedureAccordion">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="false"
              aria-controls="collapseOne"
            >
              🧪 Steps & Procedure
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse"
            aria-labelledby="headingOne"
            data-bs-parent="#procedureAccordion"
          >
            <div className="accordion-body text-start">
              <ol>
                <li>Start with a beaker containing acid.</li>
                <li>Use the dropper to transfer acid or base into other containers.</li>
                <li>If you add acid, the litmus paper will turn red.</li>
                <li>If you add base, the litmus paper will turn blue.</li>
                <li>Continue adding until you see neutralization (litmus paper may show no clear color change).</li>
                <li>Record your observations and Click reset to start again.</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

        <div className="row mb-3 text-center">
          <div className="col-4 mb-3">
            <strong>Source Bottles</strong>
            <div className="d-flex justify-content-around mt-2">
              <SourceBottle kind="acid" />
              <SourceBottle kind="base" />
            </div>
            <small className="text-muted">Drag bottles to containers.</small>
          </div>

          <div className="col-4 mb-3">
            <strong>Your Dropper (drag me)</strong>
            <Dropper dropper={dropper} onClear={clearDropper} />
            <small className="text-muted d-block mt-2">Capacity: {dropperCapacity} ml</small>
          </div>

          <div className="col-4 mb-3">
            <strong>Actions</strong>
            <div>
              <button className="btn btn-sm btn-outline-secondary mt-2" onClick={() => {
                setContainers(prev => {
                  const next = {};
                  for (const k of Object.keys(prev)) {
                    const t = prev[k];
                    const neutral = Math.min(t.acidVol, t.baseVol);
                    next[k] = { acidVol: t.acidVol - neutral, baseVol: t.baseVol - neutral };
                  }
                  return next;
                });
                setSimFeedback('All containers neutralized');
              }}>Auto-mix</button>
              <button className="btn btn-sm btn-danger mt-2 ms-2" onClick={resetAll}>🔄 Reset</button>
            </div>
          </div>
        </div>

        <div className="row">
          <Container id="beaker" label="Beaker" container={containers.beaker} onDropperDrop={handleDropperOnContainer} onSourceDrop={handleSourceOnContainer} onQuizTrigger={handleQuizTrigger} />
          <Container id="testTube" label="Test Tube" container={containers.testTube} onDropperDrop={handleDropperOnContainer} onSourceDrop={handleSourceOnContainer} onQuizTrigger={handleQuizTrigger} />
          <Container id="flask" label="Flask" container={containers.flask} onDropperDrop={handleDropperOnContainer} onSourceDrop={handleSourceOnContainer} onQuizTrigger={handleQuizTrigger} />
        </div>

       {/* EXPLANATION SECTION */}
      <div className="card mt-4 shadow-sm">
        <div className="card-body text-start">
          <h5 className="card-title">🧬 Explanation</h5>
          <p className="card-text">
            In this experiment, we use litmus paper to test acidic and basic solutions. 
            An <b>acid</b> turns blue litmus paper red, while a <b>base</b> turns red litmus paper blue. 
            Neutral solutions do not change the color of litmus paper.
          </p>
        </div>
      </div>

      {/* QUIZ SECTION */}
      <div className="card mt-4 shadow-sm">
        <div className="card-body text-start">
          <h5 className="card-title">🧠 Quiz</h5>
          
          <p>1. What color does red litmus turn in a base?</p>
          <div onChange={(e) => setSelected(e.target.value)}>
            <input type="radio" id="q1a" name="q1" value="red" />
            <label htmlFor="q1a" className="ms-2">Red</label><br/>
            <input type="radio" id="q1b" name="q1" value="blue" />
            <label htmlFor="q1b" className="ms-2">Blue</label><br/>
            <input type="radio" id="q1c" name="q1" value="green" />
            <label htmlFor="q1c" className="ms-2">Green</label>
          </div>

          <button className="btn btn-primary" onClick={handleSubmit}>Submit Answer</button>

          {quizFeedback && (
          <div className="mt-2 alert alert-info">
            {quizFeedback}
          </div>
        )}

        </div>
      </div>
    
      </div>

      <style>
        {`
          @media (max-width: 768px) {
            .beaker {
              max-width: 100px !important;
              height: 150px !important;
            }
            .beaker .liquid {
              left: 4px !important;
              right: 4px !important;
              bottom: 16px !important;
              border-radius: 15px !important;
            }
            .dropper img {
              width: 70px !important;
            }
          }
        `}
      </style>
    </DndProvider>
  );
}
