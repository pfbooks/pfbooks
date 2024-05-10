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
import { FaUser, FaMoneyBill } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { AiOutlineUserAdd, AiOutlineLogin } from "react-icons/ai";
import { RiShoppingCartLine } from "react-icons/ri";
import { useCart } from "../../hooks/useCart";
import { CartContext } from "../../context/cart";
import About from "../AboutUs/About";
import calculateTotal from "../../utils/calculateTotal";
import { CiLogout } from "react-icons/ci";
import { CiShop } from "react-icons/ci";

const NavBar = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const history = useHistory();
  const { cart, clearCart} = useCart();
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
    clearCart();
    history.push("/");
  };

  const refreshBooks = (event) => {
    dispatch(allBooks());
  };

  const showAbout = location.pathname === "/";

  return (
<div className="navbar bg-base-100">
  <div className="flex-1">
    <Link to="/home">
    <img className={styles.logoImg} src={logo} alt="Logo" />
    </Link>
  </div>
    <Search handlePageChange={handlePageChange}/>
  <div className="flex-none">
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <div className="indicator">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          <span className="badge badge-sm indicator-item">{cart.length}</span>
        </div>
      </div>
      <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
        <div className="card-body">
          <span className="font-bold text-lg">{cart.length} items</span>
          <span className="text-info">Subtotal: ${calculateTotal(cart)} </span>
          <div className="card-actions">
            <button className="btn btn-primary btn-block" onClick={handleChart}>View cart</button>
          </div>
        </div>
      </div>
    </div>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        {
          user ? (
            <div>
              <li className=" text-slate-950">
              <a className="justify-between" onClick={handleProfile}>
                Profile
              <div>

              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
              </div>
              </a>
            </li>
            <li onClick={handleShop} className=" text-slate-950 relative">
              <a>My shop 
                <div className=" absolute right-2">
                  <CiShop className=" text-slate-950 font-bold w-[18px] h-[18px]" />
                </div>
              </a>
            </li>
            <li onClick={handleLogout} className=" text-slate-950 relative">
              <a>Logout
                 <div className=" absolute right-2">
                  <CiLogout className=" text-slate-950 font-bold w-[18px] h-[18px]"/>
                  </div> 
              </a>
            </li>
            </div>
      ) : (<div>
        <Link to='/register'>
        <li><a>Register</a></li>
        </Link>
        <Link to='/login'>
            <li><a>Login</a></li>
        </Link>
      </div>)
        }
        
      </ul>
    </div>
  </div>
</div>
  //   <nav className={navClass}>
  //     <Link to="/" onClick={refreshBooks}>
  //       <img className={styles.logoImg} src={logo} alt="Logo" />
  //     </Link>

  //     {location.pathname === "/home" && (
  //       <div className={styles.divSerchBar}>
  //         <Search handlePageChange={handlePageChange} />
  //       </div>
  //     )}

  //     {showAbout && (
  //       <Link to="/about" className={styles.aboutLink}>
  //         <p className={styles.aboutButton}>About Us</p>
  //       </Link>
  //     )}

  //     <div className={styles.cartButton} onClick={handleChart}>
  //       <RiShoppingCartLine size={30} />
  //       {cart.length > 0 && (
  //         <span className={styles.cartItemCount}>{cart.length}</span>
  //       )}
  //     </div>
  //     <div
  //       className={styles.dropdown}
  //       onMouseEnter={handleMouseEnter}
  //       onMouseLeave={handleMouseLeave}
  //     >
  //       {user ? (
  //         <div className={styles.userContainer}>
  //           <FaUser size={20} className={styles.userIcon} />
  //           <div className={styles.userNameContainer}>
  //             <span className={styles.userName}>{userName}</span>
  //           </div>
  //         </div>
  //       ) : (
  //         <img className={styles.loginImg} src={login} alt="Login" />
  //       )}
  //       {showMenu && (
  //         <div className={styles.dropdownContent}>
  //           <ul className={styles.dropdownList}>
  //             {user ? (
  //               <div>
  //                 <li className={styles.dropdownItem2} onClick={handleLogout}>
  //                   <FiLogOut size={20} />
  //                   <span className={styles.dropdownLink}>Logout</span>
  //                 </li>
  //                 <li className={styles.dropdownItem2} onClick={handleProfile}>
  //                   <FaUser size={20} />
  //                   <span className={styles.dropdownLink}>Profile</span>
  //                 </li>
  //                 <li className={styles.dropdownItem2} onClick={handleShop}>
  //                   <FaMoneyBill size={19} />
  //                   <span className={styles.dropdownLink}>My shop</span>
  //                 </li>
  //               </div>
  //             ) : (
  //               <>
  //                 <Link to={"/register"} className={styles.dropdownLink}>
  //                   <li className={styles.dropdownItem2}>
  //                     <AiOutlineUserAdd size={20} />
  //                     <span>Register</span>
  //                   </li>
  //                 </Link>
  //                 <Link to={"/login"} className={styles.dropdownLink}>
  //                   <li className={styles.dropdownItem2}>
  //                     <AiOutlineLogin size={20} />
  //                     <span>Login</span>
  //                   </li>
  //                 </Link>
  //               </>
  //             )}
  //           </ul>
  //         </div>
  //       )}
  //     </div>
  //   </nav>
  );
};

export default NavBar;
