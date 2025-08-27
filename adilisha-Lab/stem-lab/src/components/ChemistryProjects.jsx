import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import chemistryImage from '../assets/chemistry1.png';


const chemistryprojects = [
  {
    title: "Acid-Base Titration",
    description: "Observe color changes in litmus as pH varies.",
    image: chemistryImage,
    link: "/practicals/AcidBaseTitration",
  },
  {
    title: "Acid-Base Reaction",
    description: "Observe color changes in litmus as pH varies.",
    image: chemistryImage,
    link: "/practicals/chemistry1",
  },
  {
    title: "Acid-Base Reaction",
    description: "Observe color changes in litmus as pH varies.",
    image: chemistryImage,
    link: "/practicals/chemistry1",
  },
  {
    title: "Acid-Base Reaction",
    description: "Observe color changes in litmus as pH varies.",
    image: chemistryImage,
    link: "/practicals/chemistry1",
  },
  {
    title: "Acid-Base Reaction",
    description: "Observe color changes in litmus as pH varies.",
    image: chemistryImage,
    link: "/practicals/chemistry1",
  },
  {
    title: "Acid-Base Reaction",
    description: "Observe color changes in litmus as pH varies.",
    image: chemistryImage,
    link: "/practicals/chemistry1",
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

const ChemistryProjects = () => {
  return (
    <div className="container py-5 mt-3 mb-3">
      <h2 className="text-center mb-4" style={{color: '#003366'}}>Chemistry Practicals</h2>
      <div className="row g-4">
        {chemistryprojects.map((project, index) => (
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

export default ChemistryProjects;
