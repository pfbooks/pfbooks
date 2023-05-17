import React from "react";
import styles from "./NavBar.module.css";
import logo from "./LogoHome.png";
import login from "./login.png";
import Search from "../Search/Search";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { logoutUser } from "../../redux/actions/actions";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { AiOutlineUserAdd, AiOutlineLogin } from "react-icons/ai";

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

  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user ? user.name : "";

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
            <div className={styles.userContainer}>
              <FaUser size={20} className={styles.userIcon} />
              <div className={styles.userNameContainer}>
                <span className={styles.userName}>{userName}</span>
              </div>
            </div>
          ) : (
            <img className={styles.loginImg} src={login} alt="Login" />
          )}
          {showMenu && (
            <div className={styles.dropdownContent}>
              <ul className={styles.dropdownList}>
                {user ? (
                  <li className={styles.dropdownItem} onClick={handleLogout}>
                    <FiLogOut size={20} />
                    <span className={styles.dropdownLink}>Logout</span>
                  </li>
                ) : (
                  <>
                    <Link to={"/register"} className={styles.dropdownLink}>
                      <li className={styles.dropdownItem}>
                        <AiOutlineUserAdd size={20} />
                        <span>Register</span>
                      </li>
                    </Link>
                    <Link to={"/login"} className={styles.dropdownLink}>
                      <li className={styles.dropdownItem}>
                        <AiOutlineLogin size={20} />
                        <span>Login</span>
                      </li>
                    </Link>
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
