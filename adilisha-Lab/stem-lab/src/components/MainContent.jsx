import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MainContent = ({ subject }) => {
  const [practicals, setPracticals] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPracticals = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/get-practicals');
        const data = await response.json();

        if (data.success && Array.isArray(data.data)) {
          setPracticals(data.data);
        } else {
          console.error('Unexpected API response:', data);
          setPracticals([]);
        }
      } catch (error) {
        console.error('Error fetching practicals:', error);
        setPracticals([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPracticals();
  }, []);

  // Filter practicals by subject if provided via props
  const filteredPracticals = subject
    ? practicals.filter((p) => p.subject?.toLowerCase() === subject.toLowerCase())
    : practicals;

  // Group practicals by subject
  const groupedPracticals = filteredPracticals.reduce((groups, practical) => {
    const subjKey = practical.subject?.toLowerCase();
    if (!subjKey) return groups;

    if (!groups[subjKey]) groups[subjKey] = [];
    groups[subjKey].push(practical);
    return groups;
  }, {});

  if (loading) {
    return <div className="text-center mt-5">Loading practicals...</div>;
  }

  return (
    <div className="flex-grow-1" style={{ marginLeft: '200px', marginTop: '70px' }}>
      <div className="container py-4">
        {Object.keys(groupedPracticals).length > 0 ? (
          Object.entries(groupedPracticals).map(([subj, items]) => (
            <div key={subj} className="mb-5">
              <h3 className="text-capitalize mb-4 border-bottom pb-2">{subj}</h3>
              <div className="row">
                {items.map((practical) => (
                  <div className="col-md-4 mb-4" key={practical._id}>
                    <div
                      className="card h-100 shadow-sm"
                      onClick={() => navigate(`/virtual-lab/practical/${practical._id}`)}
                      style={{ cursor: 'pointer' }}
                    >
                      <img
                      src={`/${practical.image.replace(/\\/g, '/')}`}  
                        className="card-img-top"
                        alt={practical.title}
                        style={{ height: '200px', objectFit: 'cover' }}
                      />
                      <div className="card-body text-white" style={{ backgroundColor: '#050020ff' }}>
                        <h5 className="card-title">{practical.title}</h5>
                        <p className="card-text">{practical.topic}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="alert alert-info text-center">
            No practicals found{subject ? ` for ${subject}` : ''}.
          </div>
        )}
      </div>
    </div>
  );
};

export default MainContent;
