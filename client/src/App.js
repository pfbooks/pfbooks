// import { Route, Routes } from "react-router-dom";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import Home  from './components/Home/Home';
import Detail from "./components/Detail/Detail";
// import landing from './components/landing/landing';
import { ToastProvider } from 'react-toast-notifications';
import 'react-toastify/dist/ReactToastify.css';
import Register from "./components/Form/Register";


function App() {
  return (
    <ToastProvider>
      <div>
          <Route exact path = '/' render = {() =><Home /> } />
          {/* <Route path = '/login' render = {() => <Form /> } /> */}
          <Route path = '/detail/:id' render = {() =>  <Detail/>} />
          <Route path = '/register' render = {() => <Register />} />
      </div>
    </ToastProvider>
  );
}

export default App;