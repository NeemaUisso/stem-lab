import React, { useState, useRef } from 'react';
import { Accordion, Button, Alert, Form, Card } from 'react-bootstrap';

// Import images (optimized sizes)
import bufferBottleImg from '../assets/buffer-bottle.png';
import indicatorBottleImg from '../assets/indicator-bottle.png';
import edtaBottleImg from '../assets/edta-bottle.png';
import waterBottleImg from '../assets/Water.png';
import emptyDropperImg from '../assets/dropper1.png';
import filledDropperImg from '../assets/dropper2.png';
import beakerImg from '../assets/Beaker.png';

const HardnessWaterLab = () => {
  // Experiment state
  const [step, setStep] = useState(0);
  const [beakerContent, setBeakerContent] = useState({
    water: false,
    buffer: false,
    indicator: false,
    edtaDrops: 0
  });
  const [dropperState, setDropperState] = useState('empty');
  const [dropperContent, setDropperContent] = useState(null);
  const [showDropper, setShowDropper] = useState(false);
  const [dropperPosition, setDropperPosition] = useState({ x: 0, y: 0 });
  const [hardness, setHardness] = useState(null);
  const [quizAnswer, setQuizAnswer] = useState('');
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Experiment data
  const experimentData = {
    title: "Removing Hardness of Water",
    hint: "1. Drag water to beaker 2. Take empty dropper 3. Drag to chemicals to fill 4. Add to beaker",
    steps: [
      "Drag water sample to the beaker",
      "Take empty dropper and fill with buffer solution",
      "Add buffer to beaker",
      "Take empty dropper and fill with indicator",
      "Add indicator to beaker",
      "Take empty dropper and fill with EDTA",
      "Add EDTA drops until color changes",
      "Record results"
    ],
    quiz: {
      question: "What causes permanent water hardness?",
      options: [
        "Calcium bicarbonate",
        "Magnesium sulfate",
        "Sodium chloride",
        "Potassium nitrate"
      ],
      correctAnswer: "Magnesium sulfate"
    }
  };

  // Handle water drag to beaker
  const handleWaterDrop = (e) => {
    e.preventDefault();
    if (step === 0) {
      setBeakerContent(prev => ({ ...prev, water: true }));
      setStep(1);
    }
  };

  // Handle dropper filling from chemical bottles
  const handleChemicalPickup = (e, chemical) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    if (data === 'dropper') {
      setDropperContent(chemical);
      setDropperState('filled');
    }
  };

  // Handle mouse move for dropper
  const handleMouseMove = (e) => {
    if (showDropper) {
      setDropperPosition({
        x: e.clientX - 20,
        y: e.clientY - 20
      });
    }
  };

  // Handle drop in beaker
  const handleChemicalDrop = (e) => {
    e.preventDefault();
    if (!dropperContent) return;

    if (dropperContent === 'buffer' && step === 1) {
      setBeakerContent(prev => ({ ...prev, buffer: true }));
      setStep(2);
    } else if (dropperContent === 'indicator' && step === 2) {
      setBeakerContent(prev => ({ ...prev, indicator: true }));
      setStep(3);
    } else if (dropperContent === 'edta' && step === 3) {
      const newDrops = beakerContent.edtaDrops + 1;
      setBeakerContent(prev => ({ ...prev, edtaDrops: newDrops }));
      
      if (newDrops >= 8) {
        calculateHardness(newDrops);
      }
    }
    
    setDropperContent(null);
    setDropperState('empty');
  };

  // Calculate hardness
  const calculateHardness = (drops) => {
    const hardnessValue = (drops * 0.05 * 0.01 * 100 * 1000) / 50;
    setHardness(hardnessValue.toFixed(2));
    setStep(4);
  };

  // Get current solution color (no background, just border color)
  const getSolutionStyle = () => {
    if (!beakerContent.water) return { border: 'none' };
    
    if (!beakerContent.buffer) {
      return { border: '2px solid rgba(173, 216, 230, 0.7)' };
    }
    if (!beakerContent.indicator) {
      return { border: '2px solid rgba(173, 216, 230, 0.9)' };
    }
    if (beakerContent.edtaDrops < 4) {
      return { border: '2px solid rgba(255, 107, 107, 0.7)' };
    }
    if (beakerContent.edtaDrops < 8) {
      return { border: '2px solid rgba(255, 185, 185, 0.7)' };
    }
    return { border: '2px solid rgba(137, 207, 240, 0.7)' };
  };

  return (
    <div className="container mt-4 pt-5" onMouseMove={handleMouseMove}>
      <h1 className="text-center text-primary mb-4">{experimentData.title}</h1>
      
      <div className="alert alert-info">
        <strong>💡 Hint:</strong> {experimentData.hint}
      </div>

      <Accordion defaultActiveKey="0" className="mb-4">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Steps & Procedure</Accordion.Header>
          <Accordion.Body>
            <ol>
              {experimentData.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <div className="row">
        {/* Components Panel */}
        <div className="col-md-3">
          <h4>Components</h4>
          
          {/* Water Bottle */}
          <Card 
            className="mb-3 text-center"
            draggable={step === 0}
            onDragStart={(e) => e.dataTransfer.setData('text/plain', 'water')}
            style={{ 
              cursor: step === 0 ? 'grab' : 'not-allowed',
              width: '80px',
              padding: '5px'
            }}
          >
            <Card.Img variant="top" src={waterBottleImg} style={{ width: '40px', height: '60px', margin: '0 auto' }} />
            <Card.Body className="p-1">
              <Card.Text style={{ fontSize: '0.8rem' }}>Water</Card.Text>
            </Card.Body>
          </Card>
          
          {/* Chemical Bottles - Now accept dropper drops */}
          {['buffer', 'indicator', 'edta'].map((chemical) => (
            <Card
              key={chemical}
              className="mb-3 text-center"
              onDrop={(e) => handleChemicalPickup(e, chemical)}
              onDragOver={(e) => e.preventDefault()}
              style={{ 
                width: '80px',
                padding: '5px',
                backgroundColor: dropperContent === chemical ? '#f8f9fa' : 'white'
              }}
            >
              <Card.Img 
                variant="top" 
                src={
                  chemical === 'buffer' ? bufferBottleImg :
                  chemical === 'indicator' ? indicatorBottleImg : edtaBottleImg
                } 
                style={{ width: '40px', height: '60px', margin: '0 auto' }} 
              />
              <Card.Body className="p-1">
                <Card.Text style={{ fontSize: '0.8rem' }}>
                  {chemical === 'buffer' ? 'Buffer' : 
                   chemical === 'indicator' ? 'Indicator' : 'EDTA'}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
          
          {/* Empty Dropper */}
          <Card
            className="mb-3 text-center"
            draggable={step >= 1}
            onDragStart={(e) => {
              e.dataTransfer.setData('text/plain', 'dropper');
              setShowDropper(true);
            }}
            onDragEnd={() => setShowDropper(false)}
            style={{ 
              cursor: step >= 1 ? 'grab' : 'not-allowed',
              width: '80px',
              padding: '5px'
            }}
          >
            <Card.Img variant="top" src={emptyDropperImg} style={{ 
              width: '30px', 
              height: '50px', 
              margin: '0 auto',
              transform: 'rotate(-30deg)'
            }} />
            <Card.Body className="p-1">
              <Card.Text style={{ fontSize: '0.8rem' }}>Dropper</Card.Text>
            </Card.Body>
          </Card>
        </div>

        {/* Beaker Area */}
      <div className="col-md-6 position-relative">
        <h4 className="text-center">Beaker</h4>
        <div 
          className="border rounded p-4 text-center"
          onDrop={step === 0 ? handleWaterDrop : handleChemicalDrop}
          onDragOver={(e) => e.preventDefault()}
          style={{ height: '350px', background: '#f8f9fa' }}
        >
          {/* Beaker with dynamic liquid filling */}
          <div className="mx-auto" style={{ 
            width: '120px', 
            height: '200px', 
            position: 'relative',
            overflow: 'hidden'
          }}>
            <img src={beakerImg} alt="Beaker" style={{ 
              width: '100%', 
              height: '100%', 
              position: 'relative', 
              zIndex: 2 
            }} />
            
            {/* Liquid filling visualization */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80px',
              ...getSolutionStyle(),
              borderRadius: '0 0 40px 40px',
              zIndex: 1
            }} />
          </div>
            
            {/* Step instructions */}
            {step === 0 && <p className="mt-5">Drag water to the beaker to start</p>}
            {step === 1 && <p className="mt-5">Drag empty dropper to buffer bottle to fill</p>}
            {step === 2 && <p className="mt-5">Drag empty dropper to indicator bottle to fill</p>}
            {step === 3 && <p className="mt-5">Drag empty dropper to EDTA bottle to fill</p>}
            {step === 4 && <p className="mt-5 text-success">Titration complete! Color changed to blue</p>}
          </div>
        </div>

        {/* Results Panel */}
        <div className="col-md-3">
          <Card className="mb-3">
            <Card.Header>Beaker Contents</Card.Header>
            <Card.Body>
              <ul className="list-unstyled">
                <li>{beakerContent.water ? "✓ Water added" : "✗ No water"}</li>
                <li>{beakerContent.buffer ? "✓ Buffer added" : "✗ No buffer"}</li>
                <li>{beakerContent.indicator ? "✓ Indicator added" : "✗ No indicator"}</li>
                <li>EDTA drops: {beakerContent.edtaDrops}</li>
              </ul>
            </Card.Body>
          </Card>
          
          {hardness && (
            <Card className="alert alert-success p-0">
              <Card.Header>Results</Card.Header>
              <Card.Body>
                <p>EDTA Used: {(beakerContent.edtaDrops * 0.05).toFixed(1)} mL</p>
                <p>Hardness: {hardness} ppm CaCO₃</p>
                <p>
                  Water is: <strong>
                    {hardness < 60 ? "Soft" : 
                     hardness < 120 ? "Moderately Hard" : 
                     hardness < 180 ? "Hard" : "Very Hard"}
                  </strong>
                </p>
              </Card.Body>
            </Card>
          )}
        </div>
      </div>

      {/* Floating Dropper */}
      {showDropper && (
        <img 
          src={dropperState === 'empty' ? emptyDropperImg : filledDropperImg}
          alt="Dropper"
          style={{
            position: 'fixed',
            left: `${dropperPosition.x}px`,
            top: `${dropperPosition.y}px`,
            width: '40px',
            height: '80px',
            zIndex: 1000,
            pointerEvents: 'none',
            transform: 'rotate(-30deg)'
          }}
        />
      )}

      {/* Reset Button */}
      <div className="text-center mt-4">
        <Button variant="outline-danger" onClick={() => {
          setStep(0);
          setBeakerContent({
            water: false,
            buffer: false,
            indicator: false,
            edtaDrops: 0
          });
          setHardness(null);
          setDropperContent(null);
          setDropperState('empty');
          setShowDropper(false);
        }}>
          Reset Experiment
        </Button>
      </div>
      
      {/* Explanation */}
      <div className="mt-4">
        <h4>Scientific Explanation</h4>
        <p>
          This experiment measures water hardness through EDTA titration:
        </p>
        <ul>
          <li>EDTA chelates Ca²⁺ and Mg²⁺ ions</li>
          <li>Eriochrome Black T indicator changes from red to blue at endpoint</li>
          <li>Buffer maintains pH 10 for proper reaction</li>
        </ul>
        <p>
          <strong>Calculation:</strong> Hardness (ppm CaCO₃) = (EDTA volume × 0.01M × 100 × 1000) / 50mL
        </p>
      </div>

      {/* Quiz */}
      <div className="mt-4 border-top pt-3">
        <h4>Quick Quiz</h4>
        <p className="fw-bold">{experimentData.quiz.question}</p>
        
        <Form>
          {experimentData.quiz.options.map((option) => (
            <Form.Check
              key={option}
              type="radio"
              name="quiz"
              id={option}
              label={option}
              checked={quizAnswer === option}
              onChange={() => setQuizAnswer(option)}
              disabled={quizSubmitted}
              className="mb-2"
            />
          ))}
        </Form>
        
        <Button
          variant="primary"
          onClick={() => setQuizSubmitted(true)}
          disabled={!quizAnswer || quizSubmitted}
          className="mt-2"
        >
          Submit Answer
        </Button>

        {quizSubmitted && (
          <Alert 
            variant={quizAnswer === experimentData.quiz.correctAnswer ? 'success' : 'danger'}
            className="mt-2"
          >
            {quizAnswer === experimentData.quiz.correctAnswer
              ? "Correct! MgSO₄ causes permanent hardness."
              : "Incorrect. The correct answer is Magnesium sulfate."}
          </Alert>
        )}
      </div>
    </div>
  );
};

export default HardnessWaterLab;
