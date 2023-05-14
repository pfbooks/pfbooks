// import { Route, Routes } from "react-router-dom";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import Home  from './components/Home/Home';
import Detail from "./components/Detail/Detail";
import Register from "./components/form/Register"
// import landing from './components/landing/landing';



function App() {
  return (
    <div>
      
        <Route exact path = '/' render = {() =><Home /> } />
        {/* <Route path = '/login' render = {() => <Form /> } /> */}
        <Route path = '/detail/:id' render = {() =>  <Detail/>} />
        <Route path = '/register' render = {() => <Register />} />
      
    </div>
  );
}

export default App;