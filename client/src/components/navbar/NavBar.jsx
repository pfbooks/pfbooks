import React from "react";
import styles from "./NavBar.module.css";
import logo from "./LogoHome.png";
import login from "./login.png"

const NavBar = () => {
  return (
    <nav>
      <div>
        <img className={styles.logoImg} src={logo} alt="Logo" />
      </div>
      <div>
        <input type="text" placeholder="Search" />
        <button>Search</button>
      </div>
      <div>
        <img className={styles.loginImg} src={login} alt="Login" />
      </div>
    </nav>
  );
};

export default NavBar;