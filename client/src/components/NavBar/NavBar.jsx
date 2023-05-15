import React from "react";
import styles from "./NavBar.module.css";
import logo from "./LogoHome.png";
import login from "./login.png"
import Search from "../Search/Search";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const NavBar = ({handlePageChange}) => {


  return (
    <nav>
      <div>
        <img className={styles.logoImg} src={logo} alt="Logo" />
      </div>
      <Search handlePageChange={handlePageChange}/>

      <Link to="/register">
      <div>
        <img className={styles.loginImg} src={login} alt="Login" />
      </div>
      </Link>
    </nav>
  );
};

export default NavBar;