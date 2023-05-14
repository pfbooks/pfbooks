import React from "react";
import styles from "./NavBar.module.css";
import logo from "./LogoHome.png";
import login from "./login.png"
import Search from "../Search/Search";

const NavBar = ({handlePageChange}) => {
  return (
    <nav>
      <div>
        <img className={styles.logoImg} src={logo} alt="Logo" />
      </div>
      <Search handlePageChange={handlePageChange}/>

      <div>
        <img className={styles.loginImg} src={login} alt="Login" />
      </div>
    </nav>
  );
};

export default NavBar;