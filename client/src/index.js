import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import reportWebVitals from './reportWebVitals';
import store from "./redux/store/store";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { CartProvider } from './context/cart';


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <Provider store={store}>
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
//   </Provider>
  
// );
ReactDOM.render(
    <GoogleOAuthProvider clientId="731677644134-tqclurd408lthelar85vugcohl4s850v.apps.googleusercontent.com">
      <Provider store={store}>
        <BrowserRouter>
        <CartProvider>
          <App />
        </CartProvider>
        </BrowserRouter>
      </Provider>
    </GoogleOAuthProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
