import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from "./components/home/Home.jsx" 
import Register from './components/form/Register.jsx';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '@chakra-ui/theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path="/books" element={<Home />} />
          {/* <Route path="/books/:id" element={<Details />} /> */}
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
