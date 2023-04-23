import React from "react";
import { Link } from "react-router-dom"; // Import the Link component from react-router-dom

const NavigationBar = () => {
  return (
    <nav>
          <ul className="dropdown-menu">
            <li>
              <Link to="/">Pokedex</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
    </nav>
  );
};

export default NavigationBar;
