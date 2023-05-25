import React from "react";
import { Route, Switch } from "react-router-dom";
import { ToastProvider } from 'react-toast-notifications';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from "./components/NavBar/NavBar";
import AdminBar from "./components/AdminBar/AdminBar";
import Home from './components/Home/Home';
import Detail from "./components/Detail/Detail";
import Register from "./components/Form/Register";
import LoginForm from "./components/Login/LoginForm";
import Profile from "./components/Profile/Profile";
import Chart from "./components/Chart/Chart";
import NotFound from "./components/NotFound/NotFound";
import Success from "./components/Payment/Success";
import BooksTable from "./components/BooksTable/BooksTable";
import UsersTable from "./components/UsersTable/UsersTable";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user && user.adminRole;

  return (
    <ToastProvider>
      <div>
        <NavBar />
        {isAdmin && <AdminBar />}
        <Switch>
          <Route path='/users' component={UsersTable} />
          <Route path='/books' component={BooksTable} />
          <Route exact path="/" component={Home} />
          {/* <Route path="/login" component={Form} /> */}
          <Route path="/detail/:id" component={Detail} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={LoginForm} />
          <Route path="/profile" component={Profile} />
          <Route path="/chart" component={Chart} />
          <Route path="/success" component={Success} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </ToastProvider>
  );
}

export default App;