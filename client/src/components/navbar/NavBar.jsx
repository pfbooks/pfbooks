import React from "react";
import { Link } from "react-router-dom";
import Search from "../Search/Search";
import logo from './LogoHome.png';
import styles from './NavBar.module.css'

function NavBar({handlePageChange}) {
  return (
    <nav>
      <div>
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <div>
        <ul>
          <li>
            <Link to="/cart">
              <i className="fas fa-shopping-cart"></i>
            </Link>
          </li>
          <li>
            <Link to="/login">
              Log In
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <Search handlePageChange={handlePageChange} />
      </div>
    </nav>
  );
}

export default NavBar;