import React, { useEffect, useState } from "react";

const ClubList = () => {
  const [clubs, setClubs] = useState([]);
  const [error, setError] = useState("");
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedClub, setSelectedClub] = useState(null);

  // Fetch clubs from API
  const fetchClubs = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/clubs/get-clubs");
      const data = await response.json();

      if (response.ok) {
        setClubs(data);
      } else {
        setError(data.message || "Failed to fetch clubs");
      }
    } catch (err) {
      setError("Error fetching clubs");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchClubs();
  }, []);

  // Group clubs by region
  const regions = clubs.reduce((acc, club) => {
    acc[club.region] = acc[club.region] || [];
    acc[club.region].push(club);
    return acc;
  }, {});

  // Shared animation handlers
  const handleEnter = (e) => {
    e.currentTarget.style.transform = "scale(1.03)";
    e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.25)";
  };

  const handleLeave = (e) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.boxShadow = "0 .125rem .25rem rgba(0,0,0,.075)";
  };

  const handleTap = (e) => {
    e.currentTarget.style.transform = "scale(0.97)";
    e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.35)";
    setTimeout(() => {
      e.currentTarget.style.transform = "scale(1.03)";
      e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.25)";
    }, 150);
  };

  return (
    <div className="container mt-5 pt-5">
      {/* Heading */}
      <h1 className="fw-bold mb-4">
        {!selectedRegion
          ? "Clubs "
          : !selectedClub
          ? ` ${selectedRegion}`
          : ` ${selectedClub.schoolName}`}
      </h1>

      {/* Error */}
      {error && <p className="text-danger mb-4">{error}</p>}

      {/* --- REGION LIST --- */}
      {!selectedRegion && (
        <div className="row g-4">
          {Object.keys(regions).map((region) => (
            <div
              key={region}
              className="col-12 col-sm-6 col-md-4"
              onClick={() => {
                setSelectedRegion(region);
                setSelectedClub(null);
              }}
              style={{ cursor: "pointer" }}
            >
              <div
                className="card h-100 d-flex flex-column shadow-sm border-0 bg-light"
                style={{
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  padding: "1rem",
                  borderRadius: "0.5rem",
                }}
                onMouseEnter={handleEnter}
                onMouseLeave={handleLeave}
                onTouchStart={handleTap}
              >
                <div className="card-body flex-grow-1">
                  <h5 className="card-title fw-semibold">{region}</h5>
                  <p className="card-text text-muted">
                    {regions[region].length} club
                    {regions[region].length > 1 ? "s" : ""}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- CLUB LIST FOR SELECTED REGION --- */}
      {selectedRegion && !selectedClub && (
        <div>
          <button
            onClick={() => setSelectedRegion(null)}
            className="btn btn-primary mb-4"
          >
            ← Back 
          </button>

          <div className="row g-4">
            {regions[selectedRegion].map((club) => (
              <div
                key={club._id}
                className="col-12"
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedClub(club)}
              >
                <div
                  className="card d-flex flex-column shadow-sm border-0 bg-light"
                  style={{
                    padding: "1rem",
                    borderRadius: "0.5rem",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  }}
                  onMouseEnter={handleEnter}
                  onMouseLeave={handleLeave}
                  onTouchStart={handleTap}
                >
                  <div className="card-body flex-grow-1">
                    <h5 className="card-title fw-semibold">{club.schoolName}</h5>
                    <p className="card-subtitle text-muted">{club.region}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- CLUB DETAILS --- */}
      {selectedClub && (
        <div>
          <button
            onClick={() => setSelectedClub(null)}
            className="btn btn-secondary mb-4"
          >
            ← Back
          </button>

          <div
            className="card shadow-sm border-0 bg-light"
            style={{ padding: "1.5rem", borderRadius: "0.5rem" }}
          >
            <h3 className="mb-3">{selectedClub.schoolName}</h3>
            <p>
              <strong>Club Instructor:</strong> {selectedClub.clubInstructor}
            </p>
            <p>
              <strong>Email:</strong> {selectedClub.email}
            </p>
            <p>
              <strong>Contact Number:</strong> {selectedClub.contactNumber}
            </p>
            <p>
              <strong>Region:</strong> {selectedClub.region}
            </p>
            <p>
              <strong>Number of Teams:</strong> {selectedClub.numberOfTeams}
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {new Date(selectedClub.createdAt).toLocaleDateString()}
            </p>
            <p>
              <strong>Updated At:</strong>{" "}
              {new Date(selectedClub.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClubList;
