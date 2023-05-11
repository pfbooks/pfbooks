import { Route, Routes } from "react-router-dom";
import details from "./components/details/details";
import landing from './components/landing/landing';
import home from "./components/home/home";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<landing/>} />
        <Route path="/books" element={<home/>} />
        <Route path="/books/:id" element={<details/>} />
      </Routes>
    </div>
  );
}

export default App;