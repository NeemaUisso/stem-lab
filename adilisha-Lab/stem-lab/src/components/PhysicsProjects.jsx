import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import archImage from '../assets/archImage.png';
import staticImg from '../assets/staticImg.png'
import flotationImage from '../assets/flotation.png';


const physicsprojects = [
  {
    title: "Archimedes Principle",
    description: "Discover buoyancy and displacement using water.",
    image: archImage,
    link: "/physics/archimedes-principle",
  },
  {
    title: "Static Electricity",
    description: "Comb and Paper Experiment.",
    image: staticImg,
    link: "/physics/static-electricity",
  },
  {
    title: "Law of Flotation",
    description: "How salt makes an Egg float.",
    image: flotationImage,
    link: "/physics/law-of-flotation",
  },
  {
    title: "Static Electricity",
    description: "Comb and Paper Experiment.",
    image: staticImg,
    link: "/physics/static-electricity",
  },
  {
    title: "Archimedes Principle",
    description: "Discover buoyancy and displacement using water.",
    image: archImage,
    link: "/physics/archimedes-principle",
  },
  {
    title: "Static Electricity",
    description: "Comb and Paper Experiment.",
    image: staticImg,
    link: "/physics/static-electricity",
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

const PhysicsProjects = () => {
  

  return (
    <div className="container py-5 mt-5">
      <h2 className="text-center mb-4">Physics Practicals</h2>
      <div className="row g-4">
        {physicsprojects.map((project, index) => (
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
                  <h5 className="card-title">{project.title}</h5>
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

export default PhysicsProjects;
