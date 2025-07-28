import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle forgot password logic here
    console.log('Reset link sent to:', email);
  };

  return (
    <div className="container py-5 mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg rounded-4">
            <div className="card-body p-4">
              <h2 className="text-center mb-4 text-primary fw-bold">
                Forgot Password
              </h2>
              <p className="text-center mb-4">
                Enter your email address and we’ll send you a link to reset your password.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-control form-control-lg border border-primary"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="d-grid mt-4">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Send Reset Link
                  </button>
                </div>

                <div className="text-center mt-3">
                  <a href="/sign-in" className="text-decoration-none text-darkblue">
                    ← Back to Sign In
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
