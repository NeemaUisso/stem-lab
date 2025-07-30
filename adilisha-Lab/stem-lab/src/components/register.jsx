import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    level: '',
    school: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="container py-5 mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <div className="card shadow-lg rounded-4">
            <div className="card-body p-4">
              <h2 className="text-center mb-4 text-primary fw-bold">Register</h2>
              <form onSubmit={handleSubmit}>
                {/* First and Last Name */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      className="form-control primary border border-primary"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      className="form-control border border-primary"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Gender and Level */}
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
                      <option value="form I">Form I</option>
                      <option value="form II">Form II</option>
                      <option value="form III">Form III</option>
                      <option value="form IV">Form IV</option>
                    </select>
                  </div>
                </div>

                {/* School and Phone */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">School</label>
                    <input
                      type="text"
                      id="school"
                      className="form-control border border-primary"
                      value={formData.school}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      className="form-control border border-primary"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control border border-primary"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Password and Confirm Password */}
                <div className="row">
                  <div className="col-md-6 mb-3 position-relative">
                    <label className="form-label">Password</label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      className="form-control border border-primary"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <i
                      className={`bi ${showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'} position-absolute top-50 end-0 translate-middle-y me-3 fs-5 mt-3`} 
                      onClick={() => setShowPassword((prev) => !prev)}
                      style={{ cursor: 'pointer' }}
                    ></i>
                  </div>

                  <div className="col-md-6 mb-3 position-relative">
                    <label className="form-label">Confirm Password</label>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      className="form-control border border-primary"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                    <i
                      className={`bi ${showConfirmPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'} position-absolute top-50 end-0 translate-middle-y me-3 fs-5 mt-3`}
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      style={{ cursor: 'pointer' }}
                    ></i>
                  </div>
                </div>

                {/* Submit Button */}
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
