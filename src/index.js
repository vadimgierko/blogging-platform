import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import "bootswatch/dist/lux/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter } from "react-router-dom";
import { DatabaseProvider } from "./hooks/use-database";

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <DatabaseProvider>
        <App />
      </DatabaseProvider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
