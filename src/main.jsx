import "./index.css";
import React from "react";
import axios from "axios";
import App from "./App.jsx";
import ReactDOM from "react-dom/client";


axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com/';

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
