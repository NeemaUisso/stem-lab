import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import roboticArm from '../assets/robot1.png';


const roboticsProjects = [
  {
    title: "Line Following Robot",
    description: "A robot that follows a line using infrared sensors. Great for understanding control systems.",
    image: roboticArm,
    link: "/robotics/line-follower",
  },
  {
    title: "Obstacle Avoidance Robot",
    description: "Uses ultrasonic sensors to detect and avoid obstacles in real-time.",
    image: roboticArm,
    link: "/robotics/obstacle-avoidance",
  },
  {
    title: "Robotic Arm",
    description: "A mechanical arm controlled by Arduino for performing pick and place tasks.",
    image: roboticArm,
    link: "/robotics/robotic-arm",
  },
  {
    title: "Gesture Controlled Robot",
    description: "Controlled using hand gestures via accelerometer or flex sensors.",
    image: roboticArm,
    link: "/robotics/gesture-controlled",
  },
  {
    title: "Fire Fighting Robot",
    description: "Detects and extinguishes fire using flame sensors and a water pump.",
    image: roboticArm,
    link: "/robotics/fire-fighting",
  },
  {
    title: "Voice Controlled Robot",
    description: "Operates using voice commands through Bluetooth or voice recognition modules.",
    image: roboticArm,
    link: "/robotics/voice-controlled",
  },
];

const baseCardStyle = {
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  borderRadius: "1rem",
  border: "none",
  textDecoration: "none",
  color: "inherit"
};

const hoverStyle = {
  transform: "translateY(-5px)",
  boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.15)"
};

const RoboticsProjects = () => {
  return (
    <div className="container py-5 mt-3 mb-3">
      <h2 className="text-center mb-4" style={{color: '#003366'}}>Robotics Projects</h2>
      <div className="row g-4">
        {roboticsProjects.map((project, index) => (
          <div className="col-12 col-sm-6 col-lg-4 d-flex" key={index}>
            <Link
              to={project.link}
              className="w-100"
              style={baseCardStyle}
              onMouseEnter={(e) => Object.assign(e.currentTarget.firstChild.style, hoverStyle)}
              onMouseLeave={(e) => Object.assign(e.currentTarget.firstChild.style, baseCardStyle)}
            >
              <div className="card h-100 shadow-sm" style={baseCardStyle}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="card-img-top"
                  style={{
                    height: "220px",
                    objectFit: "cover",
                    borderTopLeftRadius: "1rem",
                    borderTopRightRadius: "1rem",
                  }}
                />
                <div className="card-body" style={{backgroundColor: "#2596be", borderBottomRightRadius: "1rem", borderBottomLeftRadius: "1rem"}}>
                  <h5 className="card-title text-white">{project.title}</h5>
                  <p className="card-text">{project.description}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoboticsProjects;
