import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ExperimentView = () => {
  const { id } = useParams();
  const [practical, setPractical] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/api/get-practicals/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPractical(data.data);
        } else {
          console.error('Failed to fetch practical:', data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching practical:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="container pt-5">Loading...</div>;
  if (!practical) return <div className="container pt-5">Practical not found.</div>;

  return (
    <div className="container mt-5 mb-5 pt-5">
      <div className="card shadow-sm p-4">
        <h2 className="text-primary">{practical.title}</h2>
        <h5 className="text-muted mb-4">{practical.topic}</h5>

       {/* Image — nicely styled, fully responsive */}
{practical.image && (
  <div className="mb-4 text-center" style={{ overflow: 'hidden' }}>
    <img
      src={`/${practical.image.replace(/\\/g, '/')}`}   // normalise "\" → "/"
      alt={practical.title}
      className="img-fluid w-100 rounded-3 shadow-sm"
      style={{
        height:200,
        width:200
      }}
    />
  </div>
)}

        <section className="mb-4">
          <h4>Objective</h4>
          <ul>
            {Array.isArray(practical.objective) ? practical.objective.map((item, i) => (
              <li key={i}>{item}</li>
            )) : <li>{practical.objective}</li>}
          </ul>
        </section>

        {Array.isArray(practical.materials) && practical.materials.length > 0 && (
          <section className="mb-4">
            <h4>Materials Needed</h4>
            <ul>
              {practical.materials.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {practical.description && (
          <section className="mb-4">
            <h4>Description</h4>
            <p>{practical.description}</p>
          </section>
        )}

        {practical.procedures && (
          <section className="mb-4">
            <h4>Procedure</h4>

            {Array.isArray(practical.procedures.partA) && (
              <>
                <h5 className="mt-3">A. {practical.procedures.partATitle || 'Procedure A'}</h5>
                <ol>
                  {practical.procedures.partA.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </>
            )}

            {Array.isArray(practical.procedures.partB) && (
              <>
                <h5 className="mt-4">B. {practical.procedures.partBTitle || 'Procedure B'}</h5>
                <ol>
                  {practical.procedures.partB.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </>
            )}
          </section>
        )}
      </div>
    </div>
  );
};

export default ExperimentView;
