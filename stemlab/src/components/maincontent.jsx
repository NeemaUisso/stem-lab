import React from 'react';
import robot1 from '../assets/robot1.jpg';
import aviation2 from '../assets/aviation2.jpg';
import coding from '../assets/coding.jpg';
import mathematics from '../assets/mathematics.jpg';
import biology from '../assets/biology.jpg';
import physics from '../assets/physics.jpg';
import chemistry from '../assets/chemistry.jpg';


const subjects = [
  'Robotics',
  'Aviation',
  'Coding',
  'Mathematics',
  'Biology',
  'Physics',
  'Chemistry',
];

// Unique images for each card per subject
const cardImages = {
  Robotics: [ 
    robot1,
    robot1,
    robot1,
    robot1,
    robot1,
    robot1,    
  ],
  Aviation: [
    aviation2,
    aviation2,
    aviation2,
    aviation2,
    aviation2,
    aviation2,
  ],
  Coding: [
    coding,
    coding,
    coding,
    coding,
    coding,
    coding,
  ],
  Mathematics: [
    mathematics,
    mathematics,
    mathematics,
    mathematics,
    mathematics,
    mathematics,
  ],
  Biology: [
    biology,
    biology,
    biology,
    biology,
    biology,
    biology,
  ],
  Physics: [
    physics,
    physics,
    physics,
    physics,
    physics,
    physics,
  ],
  Chemistry: [
    chemistry,
    chemistry,
    chemistry,
    chemistry,
    chemistry,
    chemistry,
  ],
};

const MainContent = ({ toggleSidebar }) => {
  return (
    <div className="flex-grow-1">
      <nav className="navbar navbar-light" style={{backgroundColor: '#ffffffff'}}>
        <i
          className="bi bi-list-stars bg-primary p-2 rounded ms-2 text-white"
          onClick={toggleSidebar}
          style= {{ cursor: 'pointer' }}
        ></i>
      </nav>

      <div className="container py-4">
        {subjects.map((subject, idx) => (
          <div key={idx} className="mb-5">
            <h4 className="mb-3">{subject}</h4>

            {/* Large Screen Carousel - 3 Cards per slide */}
            <div
              id={`carouselLarge-${idx}`}
              className="carousel slide d-none d-lg-block"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                {[0, 1].map((slideIdx) => (
                  <div
                    key={slideIdx}
                    className={`carousel-item ${slideIdx === 0 ? 'active' : ''}`}
                  >
                    <div className="row gx-2">
                      {[0, 1, 2].map((colIdx) => {
                        const imgIdx = slideIdx * 3 + colIdx;
                        return (
                          <div className="col-lg-4" key={colIdx}>
                            <div className="card">
                              <img
                                src={cardImages[subject][imgIdx]}
                                className="card-img-top"
                                alt={`${subject} ${imgIdx + 1}`}
                              />
                              <div className="card-body text-white" style={{backgroundColor: '#050020ff'}}>
                                <h5 className="card-title">
                                  {subject} {imgIdx + 1}
                                </h5>
                                <p className="card-text">
                                  Content about {subject} {imgIdx + 1}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

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
            </div>

            {/* Small Screen Carousel - 1 Card per slide */}
            <div
              id={`carouselSmall-${idx}`}
              className="carousel slide d-lg-none"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                {cardImages[subject].map((img, j) => (
                  <div
                    key={j}
                    className={`carousel-item ${j === 0 ? 'active' : ''}`}
                  >
                    <div className="card">
                      <img
                        src={img}
                        className="card-img-top"
                        alt={`${subject} ${j + 1}`}
                      />
                      <div className="card-body text-white" style={{backgroundColor: '#050020ff'}}>
                        <h5 className="card-title">
                          {subject} {j + 1}
                        </h5>
                        <p className="card-text">
                          Content about {subject} {j + 1}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainContent;
