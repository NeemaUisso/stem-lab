import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import OAuth from '../components/OAuth';
import Image from '../assets/stemImage.jpeg'

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  return (
    <section className="container mt-5 pt-5">
      <h1 className="text-center text-darkblue fw-bold mb-4">Sign In</h1>
      <div className="row justify-content-center align-items-center">
        <div className="col-md-6 mb-4 mb-md-0">
          <img
            src={Image}
            alt="key"
            className="img-fluid rounded-3"
          />
        </div>

        <div className="col-md-6 col-lg-5">
          <form>
            <div className="mb-3">
              <input
                type="email"
                id="email"
                value={email}
                onChange={onChange}
                placeholder="Email address"
                className="form-control form-control-lg"
              />
            </div>

            <div className="mb-3 position-relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={onChange}
                placeholder="Password"
                className="form-control form-control-lg"
              />
              <i
                className={`bi ${showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'} position-absolute top-50 end-0 translate-middle-y me-3 fs-5`}
                onClick={() => setShowPassword((prev) => !prev)}
                style={{ cursor: 'pointer' }}
              ></i>
            </div>

            <div className="d-flex justify-content-between mb-3">
              <p className='text-darkblue'>
                Don’t have an account?{' '}
                <Link to="/sign-up" className="text-danger text-decoration-none">
                  Register
                </Link>
              </p>
              <p>
                <Link
                  to="/forgot-password"
                  className="text-darkblue text-decoration-none"
                >
                  Forgot Password?
                </Link>
              </p>
            </div>

            <button
              className="btn btn-primary w-100 py-2 fw-semibold text-uppercase "
              type="submit"
              style={{ backgroundColor: '#2596be' }}
            >
              Sign in
            </button>

            <div className="my-4 d-flex align-items-center">
              <div className="flex-grow-1 border-top border-secondary"></div>
              <span className="mx-3 fw-semibold text-darkblue">OR</span>
              <div className="flex-grow-1 border-top border-secondary"></div>
            </div>

            <OAuth />
          </form>
        </div>
      </div>
    </section>
  );
}
