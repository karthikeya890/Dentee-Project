import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { ApiProvider } from "@reduxjs/toolkit/query/react";

import api from "./api/api.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApiProvider api={api}>
      <App />
    </ApiProvider>
  </React.StrictMode>
);
