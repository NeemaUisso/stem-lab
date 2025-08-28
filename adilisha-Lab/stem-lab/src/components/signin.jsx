
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import LoginImage from '../assets/stemImage.jpeg';
import { useAuth } from './Auth';

export default function SignIn() {
  // Although we import useAuth, we won't use the 'user' state directly for navigation,
  // as it's not updated synchronously with the form submission.
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://127.0.0.1:3000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok || !result.token) {
        setMessage("Error: " + (result.message || 'Login failed'));
        return;
      }

         login(result.token); 

      // Decode token to get user info and role
      const decoded = jwtDecode(result.token);
      console.log("Login response:", result);
      console.log("Decoded token:", decoded);

      // Get the role from the decoded token, with a 'student' fallback
      const role = decoded.role || 'student';

      // Save token and user info to localStorage
      localStorage.setItem('token', result.token);
      localStorage.setItem('role', role);
      localStorage.setItem('user', JSON.stringify(decoded));

      setMessage(`Login successful! Welcome ${decoded.firstName || 'User'}`);
      setFormData({ email: '', password: '' });

      // The key change: Navigate based on the 'role' variable
      // that we just decoded from the token, instead of waiting for
      // the 'user' state from the Auth context to update.
      setTimeout(() => {
        switch (role) {
          case "admin":
            navigate('/admin');
            break;
          case "teacher":
            navigate('/teacher');
            break;
          case 'instructor':
            navigate('/instructor');
            break;
          case "student":
            navigate('/virtual-lab');
            break;
          default:
            navigate('/');
            break;
        }
      }, 1500);

    } catch (err) {
      console.error("Login error:", err);
      setMessage("Error: " + (err.message || 'An unknown error occurred.'));
    }
  };

  return (
    <div className="container py-5 mt-5">
      <div className="row justify-content-center align-items-center">
        <div className="col-12 col-lg-10">
          <div className="row bg-white shadow rounded-4 overflow-hidden">
            <div className="col-12 col-md-6 p-0 order-1 order-md-0">
              <img
                src={LoginImage}
                alt="Login Visual"
                className="img-fluid w-100 h-100"
                style={{ objectFit: 'cover', minHeight: '300px' }}
              />
            </div>

            <div className="col-12 col-md-6 p-4 p-md-5 order-2 order-md-1">
              <h2 className="text-center text-primary mb-4">Sign In</h2>

              {message && (
                <div className="alert alert-info text-center">{message}</div>
              )}

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
                    className={`bi ${showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'} position-absolute top-50 bottom-50 end-0 translate-middle-y me-3 fs-5`}
                    onClick={() => setShowPassword(prev => !prev)}
                    style={{ cursor: 'pointer' }}
                    aria-label="Toggle password visibility"
                    role="button"
                  ></i>
                </div>

                <div className="d-grid mb-3">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Sign In
                  </button>
                </div>

                <div className="d-flex justify-content-between small">
                  <Link to="/forgot-password" className="text-decoration-none">Forgot Password?</Link>
                  <Link to="/sign-up" className="text-decoration-none text-danger">Register</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
