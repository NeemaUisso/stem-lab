import React from 'react';
import { Link } from 'react-router-dom';

import archImage from '../assets/archImage.png';
import robotImage from '../assets/robot1.png';
import aviationImage from '../assets/aviation1.png';
import codeImage from '../assets/code1.png';
import mathImage from '../assets/math1.png';
import biologyImage from '../assets/biology1.png';
import chemistryImage from '../assets/chemistry1.png';
import staticImg from '../assets/staticImg.png'

import flotationImage from '../assets/flotation.png';


const subjects = [
  'Robotics', 'Aviation', 'Coding', 'Mathematics', 'Biology', 'Physics', 'Chemistry',
];

const subjectCards = {
  Robotics: [
    {
      image: robotImage,
      title: 'Line Following Robot',
      description: 'Build a robot that follows a line using IR sensors.',
      link: '/practicals/robotics1',
    },
  ],
  Aviation: [
    {
      image: aviationImage,
      title: 'Paper Plane Aerodynamics',
      description: 'Learn how wing shape affects flight distance.',
      link: '/practicals/aviation1',
    },
  ],
  Coding: [
    {
      image: codeImage,
      title: 'Simple Calculator App',
      description: 'Create a calculator using HTML, CSS, and JavaScript.',
      link: '/practicals/coding1',
    },
  ],
  Mathematics: [
    {
      image: mathImage,
      title: 'Pythagorean Theorem',
      description: 'Explore right-angled triangles using interactive tools.',
      link: '/practicals/mathematics1',
    },
  ],
  Biology: [
    {
      image: biologyImage,
      title: 'Microscope Exploration',
      description: 'Identify plant and animal cells under a microscope.',
      link: '/practicals/biology1',
    },
  ],
  Physics: [
    {
      image: archImage,
      title: 'Archimedes Principle',
      description: 'Discover buoyancy and displacement using water.',
      link: '/physics/archimedes-principle',
    },
    {
      image: staticImg,
      title: 'Static Electricity',
      description: 'Comb and Paper Experiment.',
      link: '/physics/static-electricity',
    },
    {
      image: staticImg,
      title: 'Static Electricity',
      description: 'Comb and Paper Experiment.',
      link: '/physics/static-electricity',
    },
    {
      image: archImage,
      title: 'Law of Flotation',
      description: 'Salt, Water and egg Experiment.',
      link: '/physics/static-electricity',
    },
  ],
  Chemistry: [
    {
      image: chemistryImage,
      title: 'Acid-Base Reaction',
      description: 'Observe color changes in litmus as pH varies.',
      link: '/practicals/chemistry1',
    },
  ],
};

const MainContent = () => {
  return (
    <div className="pt-5">
      <div className="container py-4">
        {subjects.map((subject, idx) => (
          <div key={idx} className="mb-5">
            <h4 className="mb-3 fw-bold text-primary">{subject}</h4>

            {/* Desktop Carousel */}
            {subjectCards[subject].length > 0 && (
              <div
                id={`carouselLarge-${idx}`}
                className="carousel slide d-none d-lg-block"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner">
                  {Array.from({
                    length: Math.ceil(subjectCards[subject].length / 3),
                  }).map((_, slideIdx) => (
                    <div
                      key={slideIdx}
                      className={`carousel-item ${slideIdx === 0 ? 'active' : ''}`}
                    >
                      <div className="row gx-3">
                        {subjectCards[subject]
                          .slice(slideIdx * 3, slideIdx * 3 + 3)
                          .map((card, imgIdx) => (
                            <div className="col-lg-4" key={imgIdx}>
                              <Link
                                to={card.link}
                                className="text-decoration-none text-light"
                              >
                                <div className="card h-100 border-0 transition hover-shadow">
                                  <img
                                    src={card.image}
                                    className="card-img-top rounded-top"
                                    alt={card.title}
                                    style={{
                                    height: "220px",
                                    objectFit: "cover",
                                    borderTopLeftRadius: "1rem",
                                    borderTopRightRadius: "1rem",
                                  }}
                                  />
                                  <div className="card-body" style={{backgroundColor: "#2596be", borderBottomRightRadius: "1rem", borderBottomLeftRadius: "1rem"}}>
                                    <h5 className="card-title fw-bold text-light">
                                      {card.title}
                                    </h5>
                                    <p className="card-text text-muted small text-light">
                                      {card.description}
                                    </p>
                                  </div>
                                </div>
                              </Link>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>

                {subjectCards[subject].length > 3 && (
                  <>
                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target={`#carouselLarge-${idx}`}
                      data-bs-slide="prev"
                    >
                      <span className="carousel-control-prev-icon"></span>
                    </button>
                    <button
                      className="carousel-control-next"
                      type="button"
                      data-bs-target={`#carouselLarge-${idx}`}
                      data-bs-slide="next"
                    >
                      <span className="carousel-control-next-icon"></span>
                    </button>
                  </>
                )}
              </div>
          )}
        
            {/* Mobile Carousel */}
            {subjectCards[subject].length > 0 && (
              <div
                id={`carouselSmall-${idx}`}
                className="carousel slide d-lg-none"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner">
                  {subjectCards[subject].map((card, j) => (
                    <div
                      key={j}
                      className={`carousel-item ${j === 0 ? 'active' : ''}`}
                    >
                      <Link
                        to={card.link}
                        className="text-decoration-none text-light"
                      >
                        <div className="card shadow rounded border-0">
                          <img
                            src={card.image}
                            className="card-img-top rounded-top"
                            alt={card.title}
                            style={{
                            height: "220px",
                            objectFit: "cover",
                            borderTopLeftRadius: "1rem",
                            borderTopRightRadius: "1rem",
                          }}
                          />
                          <div className="card-body" style={{backgroundColor: "#2596be", borderBottomRightRadius: "1rem", borderBottomLeftRadius: "1rem"}}>
                            <h5 className="card-title fw-bold text-light">
                              {card.title}
                            </h5>
                            <p className="card-text text-muted small text-light">
                              {card.description}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>

                {subjectCards[subject].length > 1 && (
                  <>
                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target={`#carouselSmall-${idx}`}
                      data-bs-slide="prev"
                    >
                      <span className="carousel-control-prev-icon"></span>
                    </button>
                    <button
                      className="carousel-control-next"
                      type="button"
                      data-bs-target={`#carouselSmall-${idx}`}
                      data-bs-slide="next"
                    >
                      <span className="carousel-control-next-icon"></span>
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainContent;
