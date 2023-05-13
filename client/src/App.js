// import { Route, Routes } from "react-router-dom";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import Home from './components/Home/Home.jsx';
import Detail from "./components/Detail/Detail";
// import landing from './components/landing/landing';



function App() {
  return (
    <div>
      
        <Route exact path = '/' render = {() =><Home /> } />
        {/* <Route path = '/login' render = {() => <Form /> } /> */}
        <Route path = '/detail/:id' render = {() =>  <Detail/>} />
      
    </div>
  );
}

export default App;