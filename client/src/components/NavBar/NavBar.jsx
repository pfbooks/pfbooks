import React from "react";
import styles from "./NavBar.module.css";
import logo from "./LogoHome.png";
import login from "./login.png";
import Search from "../Search/Search";
import { Link, useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { allBooks, logoutUser } from "../../redux/actions/actions";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { AiOutlineUserAdd, AiOutlineLogin } from "react-icons/ai";
import { RiShoppingCartLine } from "react-icons/ri";
import { useCart } from "../../hooks/useCart";
import { CartContext } from "../../context/cart";
import About from "../AboutUs/About";

const NavBar = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const history = useHistory();
  const { cart } = useCart(CartContext);
  const [showMenu, setShowMenu] = useState(false);
  const handleMouseEnter = () => {
    setShowMenu(true);
  };

  const handleProfile = () => {
    history.push("/profile");
  };  
  const handleShop = () => {
    history.push(`/shop/${user.id}`);
  };
  const handleChart = () => {
    history.push("/chart");
  };

  const handleMouseLeave = () => {
    setShowMenu(false);
  };

  const dispatch = useDispatch();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user ? user.name : "";
  const isAdmin = user && user.adminRole && (
          location.pathname.includes("profile") ||
          location.pathname.includes("/users") ||
          location.pathname.includes("/books") ||
          location.pathname.includes("/orders"));
  const navClass = isAdmin ? styles.navAdmin : styles.nav;

  const handlePageChange = (number) => {
    setCurrentPage(number);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    history.push("/");
  };

  const refreshBooks = (event) => {
    dispatch(allBooks());
  };

  const showAbout = location.pathname === "/";

  return (
    <nav className={navClass}>
      <Link to="/" onClick={refreshBooks}>
        <img className={styles.logoImg} src={logo} alt="Logo" />
      </Link>

      {location.pathname === "/" && (
        <div className={styles.divSerchBar}>
          <Search handlePageChange={handlePageChange} />
        </div>
      )}

      {showAbout && (
        <Link to="/about" className={styles.aboutLink}>
          <button className={styles.aboutButton}>About</button>
        </Link>
      )}

      <div className={styles.cartButton} onClick={handleChart}>
        <RiShoppingCartLine size={30} />
        {cart.length > 0 && (
          <span className={styles.cartItemCount}>{cart.length}</span>
        )}
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
                  <br />
                  <li className={styles.dropdownItem} onClick={handleProfile}>
                    <FaUser size={20} />
                    <span className={styles.dropdownLink}>Profile</span>
                  </li>
                  <br />
                  <li className={styles.dropdownItem} onClick={handleShop}>
                    <FaUser size={20} />
                    <span className={styles.dropdownLink}>My shopping</span>
                  </li>
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
