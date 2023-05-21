import { Route, Switch } from "react-router-dom";
import Home from './components/Home/Home';
import Detail from "./components/Detail/Detail";
import { ToastProvider } from 'react-toast-notifications';
import 'react-toastify/dist/ReactToastify.css';
import Register from "./components/Form/Register";
import LoginForm from "./components/Login/LoginForm";
import axios from "axios";
import { getUserData } from "./redux/actions/actions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import NavBar from "./components/NavBar/NavBar";
import Profile from "./components/Profile/Profile";
import Chart from "./components/Chart/Chart";
import NotFound from "./components/NotFound/NotFound";

function App() {
  const ENDPOINT_USER = "http://localhost:3001/user";
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      axios
        .get(`${ENDPOINT_USER}`, { headers: { Authorization: `Bearer ${user.token}` } }, { withCredentials: true })
        .then((response) => {
          dispatch(getUserData(response.data.user));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [dispatch]);

  return (
    <ToastProvider>
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          {/* <Route path="/login" component={Form} /> */}
          <Route path="/detail/:id" component={Detail} />
          <Route path="/chart" component={Chart} />
          <Route exact path="/login" component={LoginForm} />
          <Route path="/register" component={Register} />
          <Route path="/profile" component={Profile} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </ToastProvider>
  );
}

export default App;
