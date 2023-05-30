import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import AdminBar from "./components/AdminBar/AdminBar";
import Home from "./components/Home/Home";
import Detail from "./components/Detail/Detail";
import Register from "./components/Form/Register";
import LoginForm from "./components/Login/LoginForm";
import Profile from "./components/Profile/Profile";
import Chart from "./components/Chart/Chart";
import NotFound from "./components/NotFound/NotFound";
import Success from "./components/Payment/Success";
import BooksTable from "./components/BooksTable/BooksTable";
import About from "./components/AboutUs/About";
import UsersTable from "./components/UsersTable/UsersTable";
import OrdersTable from "./components/OrdersTable/OrdersTable";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

function App() {
  const user = useSelector((state) => state.user);
  const location = useLocation();

  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    if (user) {
      if (user && user.adminRole) {
        setAdmin(true);
      } else {
        setAdmin(false);
      }
    } else {
      setAdmin(false);
    }
  }, [user]);

  // const isProfileView = location.pathname === "/profile";

  return (
      <div>
        <NavBar />
        {admin && (
          location.pathname.includes("profile") ||
          location.pathname.includes("/users") ||
          location.pathname.includes("/books") ||
          location.pathname.includes("/orders")) &&
        <AdminBar />}
        <Switch>
          <Route path="/users" component={UsersTable} />
          <Route path="/books" component={BooksTable} />
          <Route path="/orders" component={OrdersTable} />
          <Route exact path="/" component={Home} />
          <Route path="/detail/:id" component={Detail} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={LoginForm} />
          <Route path="/profile" component={Profile} />
          <Route path="/chart" component={Chart} />
          <Route path="/success" component={Success} />
          <Route path="/about" component={About} />
          <Route component={NotFound} />
        </Switch>
      </div>
  );
}

export default App;
