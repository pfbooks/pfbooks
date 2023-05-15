import React from "react";
import styles from "./NavBar.module.css";
import logo from "./LogoHome.png";
import login from "./login.png"
import Search from "../Search/Search";
import {Link} from "react-router-dom";
import { useLocation} from 'react-router-dom';


const NavBar = ({handlePageChange}) => {
    const location= useLocation()
    return (
        <nav className={styles.nav}>
            <div>
                <img className={styles.logoImg} src={logo} alt="Logo"/>
            </div>
            {location.pathname === '/' && <Search handlePageChange={handlePageChange}/>}

            <div className={styles.divSerchBar}>
                <div className={styles.dropdown}>
                    <img className={styles.loginImg} src={login} alt="Login"/>
                    <div className={styles.dropdownContent}>
                        <Link to={"/register"}>Register</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;