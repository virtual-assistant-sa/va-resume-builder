import React from "react";
import ReactDOM from "react-dom/client";
import rootReducer from "./features/reducers";
import { Provider } from "react-redux";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import demo from "./utils/fake";

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  preloadedState: demo,
  middleware: [thunk],
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
