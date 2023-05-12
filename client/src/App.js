// import { Route, Routes } from "react-router-dom";
import Detail from "./components/Detail/Detail";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
// import landing from './components/landing/landing';
import {Home} from "./components/Home/Home";


function App() {
  return (
    <div>
      
        <Route path = '/' render = {() => <Home /> } />
        {/* <Route path = '/login' render = {() => <Form /> } /> */}
        <Route path = '/detail/:id' render = {() => <Detail /> } />
      
    </div>
  );
}

export default App;