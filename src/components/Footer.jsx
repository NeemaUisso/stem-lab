import React from 'react';

function Footer() {
  return (
    <footer className="text-center text-lg-start text-white" style={{ backgroundColor: '#2596be' }}>
      <div className="container p-4 pb-0">

        {/* Section: Links */}
        <section>
          <div className="row">

            {/* Useful Links */}
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold">
                USEFUL LINK
              </h6>
              <p><a href="#" className="text-white text-decoration-none">Home</a></p>
              <p><a href="#" className="text-white text-decoration-none">Partners</a></p>
              <p><a href="https://adilisha.or.tz" className="text-white text-decoration-none">Read-More</a></p>
            </div>

            <hr className="w-100 clearfix d-md-none" />

            {/* Contact */}
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold">Contact</h6>
              <p><i className="bi bi-house me-2"></i> Bondeni Street, Ghana <br /> Mwanza - Tanzania</p>
              <p><i className="bi bi-envelope-open-fill me-2"></i> info@adilisha.or.tz</p>
              <p><i className="bi bi-telephone-fill me-2"></i> 0282561724</p>
            </div>

          </div>
        </section>

        <hr className="my-3" />

        <section className="p-3 pt-0">
          <div className="row d-flex align-items-center">

            <div className="col-md-7 col-lg-8 text-center text-md-start">
              <div className="p-3">
                © 2025 Copyright:
                <a href="https://adilisha.or.tz" className="text-white text-decoration-none ms-1">adilisha All Rights Reserved</a>
              </div>
            </div>

            {/* Socials */}
            <div className="col-md-5 col-lg-4 text-center text-md-end">
              <a className="btn btn-outline-light btn-floating m-1" href="#"><i className="bi bi-facebook"></i></a>
              <a className="btn btn-outline-light btn-floating m-1" href="#"><i className="bi bi-twitter"></i></a>
              <a className="btn btn-outline-light btn-floating m-1" href="#"><i className="bi bi-instagram"></i></a>
              <a className="btn btn-outline-light btn-floating m-1" href="#"><i className="bi bi-tiktok"></i></a>
            </div>

          </div>
        </section>
      </div>
    </footer>
  );
}

export default Footer;
