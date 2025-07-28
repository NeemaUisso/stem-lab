import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import OAuth from '../components/OAuth';
import Image from '../assets/stemImage.jpeg'

import LoginImage from '../assets/stemImage.jpeg'; // replace with your image path

export default function SignIn() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // submit logic here
  };

  return (
    <div className="container py-5 mt-5">
      <div className="row justify-content-center align-items-center">
        <div className="col-12 col-lg-10">
          <div className="row bg-white shadow rounded-4 overflow-hidden">

            {/* Image Section - on top for mobile, left for desktop */}
            <div className="col-12 col-md-6 order-1 order-md-0 p-0 d-none d-md-block">
              <img
                src={Image}
                alt="Sign In"
                className="img-fluid w-100 h-100"
                style={{ objectFit: 'cover', minHeight: '300px' }}
              />
            </div>

            {/* Form Section - below image on mobile */}
            <div className="col-12 col-md-6 order-2 order-md-1 p-4 p-md-5">
              <h2 className="text-center text-primary mb-4">Sign In</h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control form-control-lg"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3 position-relative">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    className="form-control form-control-lg"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <i
                    className={`bi ${showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'} position-absolute top-50 end-0 translate-middle-y me-3 fs-5 mt-3`}
                    onClick={() => setShowPassword(prev => !prev)}
                    style={{ cursor: 'pointer' }}
                  ></i>
                </div>

                <div className="d-grid mb-3">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Sign In
                  </button>
                </div>

                <div className="d-flex justify-content-between small">
                  <a href="/forgot-password" className="text-decoration-none">Forgot Password?</a>
                  <a href="/sign-up" className="text-decoration-none text-danger">Register</a>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}