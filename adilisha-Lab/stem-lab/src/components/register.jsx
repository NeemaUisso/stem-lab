import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Register() {
  const [show, setShow] = useState({ password: false, confirmPassword: false });
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
     lastName: '',
      gender: '',
    level: '', 
    school: '',
     phone: '',
    email: '', 
    password: '',
     confirmPassword: ''
  });

  const handleChange = ({ target: { id, value } }) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const toggleVisibility = (field) => {
    setShow(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://127.0.0.1:3000/api/users/registerUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const err = await res.json();
        console.error("Registration error:", err);
        throw new Error(err.message || 'Registration failed');
      }

      const result = await res.json();
      setMessage(`User created successfully! ID: ${result.id}`);
      setFormData({
        firstName: '',
         lastName: '',
          gender: '',
        level: '',
         school: '', 
         phone: '',
        email: '',
         password: '',
          confirmPassword: ''
      });

    } catch (err) {
      setMessage("Error: " + err.message);
      console.error("Registration error:", err);
    }
  };

  const renderInput = (label, id, type = 'text') => (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <input
        type={type}
        id={id}
        className="form-control border border-primary"
        value={formData[id]}
        onChange={handleChange}
        required
      />
    </div>
  );

  const renderPassword = (label, id) => (
    <div className="col-md-6 mb-3 position-relative">
      <label className="form-label">{label}</label>
      <input
        type={show[id] ? 'text' : 'password'}
        id={id}
        className="form-control border border-primary"
        value={formData[id]}
        onChange={handleChange}
        required
      />
      <i
        className={`bi ${show[id] ? 'bi-eye-slash-fill' : 'bi-eye-fill'} position-absolute top-50 end-0 translate-middle-y me-3 fs-5 mt-3`}
        style={{ cursor: 'pointer' }}
        onClick={() => toggleVisibility(id)}
      />
    </div>
  );

  return (
    <div className="container py-5 mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <div className="card shadow-lg rounded-4">
            <div className="card-body p-4">
              <h2 className="text-center mb-4 text-primary fw-bold">Register</h2>
              {message && <div className="alert alert-info">{message}</div>}
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">{renderInput("First Name", "firstName")}</div>
                  <div className="col-md-6">{renderInput("Last Name", "lastName")}</div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Gender</label>
                    <select
                      id="gender"
                      className="form-select border border-primary"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Level</label>
                    <select
                      id="level"
                      className="form-select border border-primary"
                      value={formData.level}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select level</option>
                      <option value="student">Student</option>
                      <option value="teacher">Teacher</option>
                      <option value="instructor">Instructor</option>
                    
                    </select>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">{renderInput("School", "school")}</div>
                  <div className="col-md-6">{renderInput("Phone", "phone", "tel")}</div>
                </div>

                {renderInput("Email", "email", "email")}

                <div className="row">
                  {renderPassword("Password", "password")}
                  {renderPassword("Confirm Password", "confirmPassword")}
                </div>

                <div className="d-grid mt-4">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
