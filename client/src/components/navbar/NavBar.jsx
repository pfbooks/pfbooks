import React from "react";
import { Link } from "react-router-dom";
import Search from "../Search/Search";
import logo from "./logoHome.png";

function Navbar({ setInput, setPag }) {
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
        <Search setInput={setInput} setPag={setPag} />
      </div>
    </nav>
  );
}

export default Navbar;