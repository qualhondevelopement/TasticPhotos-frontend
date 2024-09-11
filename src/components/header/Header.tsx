import React from "react";

const Header = () => {
  return (
    <div>
      <header>
        <div className="container">
          <nav className="navbar-custom">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-4 col-lg-4">
                  <a className="navbar-brand" href="#">
                    <img src="images/logo.png" />
                  </a>
                </div>
                <div className="col-8">
                  <div className="justify-content-end" id="collapsibleNavbar">
                    <ul className="navbar-nav justify-content-end">
                      <li className="nav-item">
                        <a className="nav-link" href="#">
                          Contact
                        </a>
                      </li>
                      <li className="nav-item checkout-btn">
                        <a className="nav-link custom-btn" href="#">
                          Checkout
                        </a>
                      </li>
                      <li className="nav-item signup-btn">
                        <a className="nav-link" href="#">
                          {" "}
                          <img src="images/cart.svg" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Header;
