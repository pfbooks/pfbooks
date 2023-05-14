import { Link } from "react-router-dom";
import Search from "../Search/Search";
import logo from "./LogoHome.png";
import cartImage from "./carrito.png";
import styles from "./NavBar.modules.css";

function NavBar({ handlePageChange }) {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <div className={styles.menu}>
        <ul>
          <li>
            <Link to="/cart" className={styles.menuItem}>
              <img src={cartImage} alt="cart" className={styles.icon} />
            </Link>
          </li>
          <li>
            <Link to="/login" className={styles.menuItem}>
              Log In
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.search}>
        <Search handlePageChange={handlePageChange} />
      </div>
    </nav>
  );
}

export default NavBar;
