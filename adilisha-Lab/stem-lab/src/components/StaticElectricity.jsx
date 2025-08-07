import React, { useState } from "react";
import combImg from "../assets/comb.png";
import paperImg from "../assets/paper.png";
import hairImg from "../assets/hair.png";
import "bootstrap/dist/css/bootstrap.min.css";

const StaticElectricity = () => {
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

  return (
    <div className="container mt-5 pt-5">
      {/* 1. Practical Title */}
      <h2 className="text-center mb-3 text-primary">
        <strong> Static Electricity: Comb and Paper Experiment </strong>
      </h2>

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
        <div className="col-md-4 mb-4">
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
        <div className="col-md-4 mb-4">
          <h5 className="text-center">Paper Pieces</h5>
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handlePaperDrop}
            onClick={handlePaperClick}
            style={{
              border: "2px dashed #ccc",
              borderRadius: "8px",
              padding: "15px",
              minHeight: "180px",
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
                left: "42%",
                top: "30%",
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
        <div className="col-md-3 mb-4">
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
      {showQuiz && (
        <div className="mt-5 border p-4 rounded">
          <h5 className="mb-3">🧠 Quiz: Why does the paper stick to the comb?</h5>
          <div className="form-check text-start">
            <input
              className="form-check-input"
              type="radio"
              name="quiz"
              id="option1"
              value="Comb has glue"
              onChange={(e) => setQuizAnswer(e.target.value)}
            />
            <label className="form-check-label" htmlFor="option1">
              The comb has glue on it
            </label>
          </div>
          <div className="form-check text-start">
            <input
              className="form-check-input"
              type="radio"
              name="quiz"
              id="option2"
              value="Paper is magnet"
              onChange={(e) => setQuizAnswer(e.target.value)}
            />
            <label className="form-check-label" htmlFor="option2">
              The paper is magnetic
            </label>
          </div>
          <div className="form-check text-start">
            <input
              className="form-check-input"
              type="radio"
              name="quiz"
              id="option3"
              value="Electrons transferred to comb"
              onChange={(e) => setQuizAnswer(e.target.value)}
            />
            <label className="form-check-label" htmlFor="option3">
              Electrons transferred to comb
            </label>
          </div>
          <button
            className="btn btn-success mt-3"
            onClick={handleQuizSubmit}
            disabled={!quizAnswer}
          >
            Submit Answer
          </button>
          {quizResult && (
            <div className="mt-3">
              <strong>{quizResult}</strong>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StaticElectricity;
