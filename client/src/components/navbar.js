import React from "react";

// bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

// NavLink to utilize the react router.
import { NavLink } from "react-router-dom";

// Display Navbar
const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to="/">
          MongoDB
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        
      </nav>
    </div>
  );
};

export default Navbar;
