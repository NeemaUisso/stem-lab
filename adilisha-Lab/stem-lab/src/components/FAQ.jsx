import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const faqData = [
  { question: "What is robotics?", answer: "Robotics involves building and programming intelligent machines." },
  { question: "How does aviation work?", answer: "Aviation is the science and practice of flying aircraft." },
  { question: "Why is math important?", answer: "Math helps us solve problems using numbers and logic." },
  { question: "What is coding?", answer: "Coding is writing instructions for computers to follow." },
  { question: "What is a virtual lab?", answer: "A virtual lab is an online space for experimenting with simulations." },
];

function FAQ() {
  const [show, setShow] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = (faq) => {
    setSelectedQuestion(faq);
    setShow(true);
  };

  // Styles
  const wrapperStyle = {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    position: 'relative',
    marginBottom: '40px',
  };

  const scrollerStyle = {
    display: 'inline-flex',
    animation: 'scrollLeft 30s linear infinite',
  };

  const faqCardStyle = {
    minWidth: '300px',
    margin: '0 15px',
    padding: '20px',
    backgroundColor: '#003366',
    color: 'white',
    fontWeight: 'bold',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    cursor: 'pointer',
    flexShrink: 0,
    transition: 'transform 0.3s ease',
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Frequently Asked Questions</h2>

      {/* Scrolling FAQ wrapper */}
      <div
        style={wrapperStyle}
        onMouseEnter={(e) =>
          (e.currentTarget.querySelector('.scroller').style.animationPlayState = 'paused')
        }
        onMouseLeave={(e) =>
          (e.currentTarget.querySelector('.scroller').style.animationPlayState = 'running')
        }
      >
        <div className="scroller" style={scrollerStyle}>
          {[...faqData, ...faqData].map((faq, index) => (
            <div
              key={index}
              style={faqCardStyle}
              onClick={() => handleShow(faq)}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              {faq.question}
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedQuestion.question}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{selectedQuestion.answer}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* Animation Keyframes */}
      <style>{`
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

export default FAQ;
