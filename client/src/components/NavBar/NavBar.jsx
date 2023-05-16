import React from "react";
import styles from "./NavBar.module.css";
import logo from "./LogoHome.png";
import login from "./login.png";
import Search from "../Search/Search";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { logoutUser } from "../../redux/actions/actions";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiUserFill } from "react-icons/ri";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const NavBar = ({ handlePageChange }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMouseEnter = () => {
    setShowMenu(true);
  };

  const handleMouseLeave = () => {
    setShowMenu(false);
  };
  const dispatch = useDispatch();
  const location = useLocation();

  const user = useSelector((state) => state.user);
  const userName = user ? user.name.charAt(0).toUpperCase() : "";

  const handleLogout = () => {
    dispatch(logoutUser());
  };
  return (
    <nav className={styles.nav}>
      <div>
        <img className={styles.logoImg} src={logo} alt="Logo" />
      </div>
      {location.pathname === "/" && (
        <Search handlePageChange={handlePageChange} />
      )}

      <div className={styles.divSerchBar}>
        <div
          className={styles.dropdown}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {user ? (
            <div className={styles.userName}>
              <RiUserFill size={20} />
              <span>{userName}</span>
            </div>
          ) : (
            <img className={styles.loginImg} src={login} alt="Login" />
          )}
          {showMenu && (
            <div className={styles.dropdownContent}>
              <ul className={styles.dropdownList}>
                {user ? (
                  <li className={styles.dropdownItem} onClick={handleLogout}>
                    Logout
                  </li>
                ) : (
                  <>
                    <li className={styles.dropdownItem}>
                      <Link to={"/register"} className={styles.dropdownLink}>
                        Register
                      </Link>
                    </li>
                    <li className={styles.dropdownItem}>
                      <Link to={"/login"} className={styles.dropdownLink}>
                        Login
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;


