import React, { useState } from 'react';

function FAQ() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulated AI responses (you can customize)
    let simulatedAnswer = "That's a great question!";
    if (question.toLowerCase().includes('robotics')) {
      simulatedAnswer = "Robotics is all about building and programming intelligent machines!";
    } else if (question.toLowerCase().includes('aviation')) {
      simulatedAnswer = "Aviation involves the science and practice of flying aircraft.";
    } else if (question.toLowerCase().includes('math')) {
      simulatedAnswer = "Math helps us solve problems using numbers and logic.";
    }

    setAnswer(simulatedAnswer);
  };

  return (
    <div className="container  mt-5 pt-5 p-4 bg-light rounded shadow">
      <h2 className="text-center mb-4">Frequently Asked Questions</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Ask your question:</label>
          <input
            type="text"
            className="form-control"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="e.g., What is robotics?"
            required
          />
        </div>
        <button className="btn btn-primary" type="submit">Ask</button>
      </form>

      {answer && (
        <div className="alert alert-info mt-3">
          <strong>Answer:</strong> {answer}
        </div>
      )}
    </div>
  );
}

export default FAQ;
