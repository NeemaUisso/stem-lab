import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import combImg from "../assets/comb.png";
import paperImg from "../assets/paper.png";
import hairImg from "../assets/hair.png";
import "bootstrap/dist/css/bootstrap.min.css";

export default function StaticElectricity() {
  const [isCharged, setIsCharged] = useState(false);
  const [paperAttracted, setPaperAttracted] = useState(false);
  const [draggedOverHair, setDraggedOverHair] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState("");
  const [quizResult, setQuizResult] = useState("");

  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", "comb");
  };

  const handleHairDrop = (e) => {
    const data = e.dataTransfer.getData("text");
    if (data === "comb") {
      setIsCharged(true);
      setDraggedOverHair(true);
    }
  };

  const handlePaperDrop = (e) => {
    const data = e.dataTransfer.getData("text");
    if (data === "comb" && isCharged) {
      setPaperAttracted(true);
      setShowQuiz(true);
    }
  };

  const handleReset = () => {
    setIsCharged(false);
    setPaperAttracted(false);
    setDraggedOverHair(false);
    setSelectedItem(null);
    setShowQuiz(false);
    setQuizAnswer("");
    setQuizResult("");
  };

  const paperStyle = {
    transition: "transform 0.6s ease-in-out",
    transform: paperAttracted ? "translateY(-20px)" : "translateY(0)",
  };

  const handleHairClick = () => {
    if (selectedItem === "comb") {
      setIsCharged(true);
      setDraggedOverHair(true);
      setSelectedItem(null);
    }
  };

  const handlePaperClick = () => {
    if (selectedItem === "comb" && isCharged) {
      setPaperAttracted(true);
      setShowQuiz(true);
      setSelectedItem(null);
    }
  };

  const handleQuizSubmit = () => {
    if (quizAnswer === "Electrons transferred to comb") {
      setQuizResult("✅ Correct! The comb gained electrons through friction.");
    } else {
      setQuizResult("❌ Incorrect. Try again!");
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
    <div className="container mt-5 pt-3">
      
      <div className="d-flex align-items-center mb-4">
          {/* Back Button */}
          <button onClick={goBack} className="btn btn-outline-secondary me-3">
            ⬅
          </button>

          {/* Title */}
          <h2 className="mb-0 text-primary">
            <strong>Static Electricity: Comb and Paper Experiment</strong>
          </h2>
        </div>
      
      {/* 2. Short Hint / Introduction */}
        <div className="alert alert-info w-100">
        💡 <strong>Hint:</strong> This experiment demonstrates how static electricity causes a comb to attract paper pieces after rubbing it against hair.
      </div>

      {/* 3. Steps and Procedure */}
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
                <li>Pick up or drag the comb and rub it against the hair.</li>
                <li>Then bring the comb close to the paper pieces.</li>
                <li>Observe how the paper is attracted to the comb.</li>
                <li>Read the scientific result of your experiment.</li>
                <li>Click reset to start again.</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Simulation Area */}
      <div className="row justify-content-center">
        {/* Hair Zone */}
        <div className="col-4 mb-4">
          <h5 className="text-center">Hair</h5>
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleHairDrop}
            onClick={handleHairClick}
            style={{
              border: "2px dashed #ccc",
              borderRadius: "8px",
              padding: "15px",
              minHeight: "150px",
              textAlign: "center",
            }}
          >
            <img src={hairImg} alt="Hair" style={{ maxWidth: "100%" }} />
            {draggedOverHair && (
              <p style={{ color: "green" }}>Comb is charged!</p>
            )}
          </div>
        </div>

        {/* Paper Zone */}
        <div className="col-4 mb-4">
          <h5 className="text-center">Paper Pieces</h5>
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handlePaperDrop}
            onClick={handlePaperClick}
            style={{
              border: "2px dashed #ccc",
              borderRadius: "8px",
              padding: "15px",
              minHeight: "150px",
              position: "relative",
              textAlign: "center",
            }}
          >
            <img
              src={paperImg}
              alt="Papers"
              style={{
                maxWidth: "50%",
                ...paperStyle,
                position: "absolute",
                left: "33%",
                top: "28%",
                zIndex: 1,
              }}
            />
            {paperAttracted && (
              <>
                <img
                  src={combImg}
                  alt="Comb"
                  style={{
                    maxWidth: "40%",
                    position: "absolute",
                    left: "50%",
                    top: "20%",
                    transform: "rotate(30deg)",
                    zIndex: 0,
                  }}
                />
                <p style={{ color: "#0dcaf0", marginTop: "130px" }}>
                  Paper is attracted by the charged comb!
                </p>
              </>
            )}
          </div>
        </div>

        {/* Comb Tool */}
        <div className="col-4 mb-4">
          <h5 className="text-center">Comb</h5>
          {!paperAttracted ? (
            <>
              <img
                src={combImg}
                alt="Comb"
                draggable
                onDragStart={handleDragStart}
                onClick={() => setSelectedItem("comb")}
                style={{
                  maxWidth: "100%",
                  cursor: "pointer",
                  border: isCharged ? "2px solid blue" : "none",
                  borderRadius: "8px",
                  padding: "5px",
                }}
              />
              <p className="mt-2 text-center">
                {selectedItem === "comb"
                  ? "Selected!"
                  : isCharged
                  ? "Charged!"
                  : "Click or drag me"}
              </p>
            </>
          ) : (
            <p className="text-muted text-center">
              Comb is with the paper.
            </p>
          )}
        </div>
      </div>

      {/* Reset Button */}
      <div className="text-center mt-4">
        <button className="btn btn-danger" onClick={handleReset}>
          🔄 Reset
        </button>
      </div>

      {/* 5. Explanation Section */}
      <div className="mt-5 p-4 bg-light rounded border">
        <h5>🧬 Explanation</h5>
        <p>
          When the comb is rubbed against hair, it picks up extra electrons through friction,
          becoming negatively charged. These extra electrons create a static electric field that can
          attract lightweight neutral objects like paper. This is why the paper pieces move toward the comb.
        </p>
      </div>

      {/* 6. Quiz Section */}

      {/* Quiz */}
  <div className="card w-100 shadow-sm mt-4 mb-3">
    <div className="card-body text-start">
      <h5 className="card-title">🧠 Quiz</h5>
      <p>Why does the paper stick to the comb after rubbing it on your hair?</p>

      <div className="form-check">
        <input
          type="radio"
          name="quiz"
          id="glue"
          value="glue"
          className="form-check-input"
          checked={quizAnswer === "glue"}
          onChange={(e) => setQuizAnswer(e.target.value)}
        />
        <label className="form-check-label" htmlFor="glue">
          Because the comb has glue
        </label>
      </div>

      <div className="form-check">
        <input
          type="radio"
          name="quiz"
          id="magnet"
          value="magnet"
          className="form-check-input"
          checked={quizAnswer === "magnet"}
          onChange={(e) => setQuizAnswer(e.target.value)}
        />
        <label className="form-check-label" htmlFor="magnet">
          Because the paper is magnetic
        </label>
      </div>

      <div className="form-check">
        <input
          type="radio"
          name="quiz"
          id="electrons"
          value="electrons"
          className="form-check-input"
          checked={quizAnswer === "electrons"}
          onChange={(e) => setQuizAnswer(e.target.value)}
        />
        <label className="form-check-label" htmlFor="electrons">
          Because electrons transferred to the comb
        </label>
      </div>

      <button
        className="btn btn-primary mt-2"
        onClick={() => {
          if (quizAnswer === "electrons") {
            setQuizResult("✅ Correct! Rubbing transfers electrons to the comb, making it attract paper.");
          } else {
            setQuizResult("❌ Incorrect. Hint: Think about what happens when you rub the comb.");
          }
        }}
      >
        Submit
      </button>

      <div className="mt-2">{quizResult}</div>
    </div>
  </div>


    </div>
  );
};
