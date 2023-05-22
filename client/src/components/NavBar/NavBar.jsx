import React from "react";
import styles from "./NavBar.module.css";
import logo from "./LogoHome.png";
import login from "./login.png";
import Search from "../Search/Search";
import { Link, useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { logoutUser } from "../../redux/actions/actions";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { FaUser,  } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { AiOutlineUserAdd, AiOutlineLogin } from "react-icons/ai";
import { RiShoppingCartLine } from "react-icons/ri";


const NavBar = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const history = useHistory()
  const [showMenu, setShowMenu] = useState(false);
  const handleMouseEnter = () => {
    setShowMenu(true);
  };

  const handleProfile = () => {
    history.push('/profile')
  };
  const handleChart = () => {
    history.push('/chart')
  }

  const handleMouseLeave = () => {
    setShowMenu(false);
  };

  const dispatch = useDispatch();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user ? user.name : "";

  const handlePageChange = (number)=> {
    setCurrentPage(number)
}

  const handleLogout = () => {
    dispatch(logoutUser());
    history.push('/')
  };

  return (
    <nav className={styles.nav}>
      <Link to= "/">
        <img className={styles.logoImg} src={logo} alt="Logo" />
      </Link>
      {location.pathname === "/" && (
      <div className={styles.divSerchBar}>
        <Search handlePageChange={handlePageChange} />
      </div>
      )}

     
      <div className={styles.cartButton} onClick={handleChart}>
          <RiShoppingCartLine size={20} onClick={handleChart}/>
      </div>
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
                  <div>
                  <li className={styles.dropdownItem} onClick={handleLogout}>
                    <FiLogOut size={20} />
                    <span className={styles.dropdownLink}>Logout</span>
                  </li>
                  <br/>
                  <li className={styles.dropdownItem} onClick={handleProfile}>
                    <FaUser size={20} />
                    <span className={styles.dropdownLink}>Profile</span>
                  </li>
                  <br />
                  </div>
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
      
    </nav>
  );
};

export default NavBar;
