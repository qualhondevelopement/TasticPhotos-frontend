import React from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const router = useRouter();
  const currentSlug = useSelector((state: any) => state.slug.currentSlug);

  const handleCartButton = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault(); // Prevent the default anchor link behavior
    router.push(`/cart-items/${currentSlug}`); // Push to the correct URL
  };

  return (
    <div>
      <header>
        <div className="container">
          <nav className="navbar-custom">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-4 col-lg-4">
                  <a className="navbar-brand" href="/">
                    <img src="images/logo.png" alt="Logo" />
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
                        <a
                          className="nav-link"
                          href="#"
                          onClick={handleCartButton}
                        >
                          <img src="images/cart.svg" alt="Cart" />
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
