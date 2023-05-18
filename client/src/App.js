// import { Route, Routes } from "react-router-dom";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import Home  from './components/Home/Home';
import Detail from "./components/Detail/Detail";
import Payment from "./components/Payment/Payment";
// import landing from './components/landing/landing';
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
import { CartProvider } from "./Context/cart.jsx";


function App() {
  const ENDPOINT_USER= "http://localhost:3001/user";
  const dispatch = useDispatch()
  useEffect(() =>{
    const user = JSON.parse(localStorage.getItem('user'));
    if(user && user.token) {
      axios
        .get(`${ENDPOINT_USER}`, { headers: {Authorization: `Bearer ${user.token}`}},{withCredentials: true})
        .then((response) =>{
          dispatch(getUserData(response.data.user));
        })
        .catch((error) =>{
          console.log(error);
        })
    }
  }, [])

  return (
    <ToastProvider>
      <div>
        {/* <CartProvider> */}
          <NavBar />
          <Route exact path = '/' render = {() =><Home /> } />
          <Route path = '/detail/:id' render = {() =>  <Detail/>} />
          <Route path = '/pay' render = {() =>  <Payment/>} />

        {/* </CartProvider> */}
        
          {/* <Route path = '/login' render = {() => <Form /> } /> */}

          <Route exact path="/login" render = {() =>  <LoginForm />} />
          <Route path = '/register' render = {() => <Register />} />
          <Route path = '/profile' render = {() => <Profile />} />
      </div>
    </ToastProvider>
  );
}

export default App;