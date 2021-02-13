import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import authReducer from "./redux/authReducer";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";

// const initialState = {
//   id: 0,
//   username: "username",
//   password: "password",
//   displayName: "display-name",
//   image: "image",
//   isLoggedIn: true,
// };

let localStorageData = localStorage.getItem("hoax-auth");

let persistedState = {
  id: 0,
  username: "",
  password: "",
  displayName: "",
  image: "",
  isLoggedIn: false,
  loading: false,
};

if (localStorageData) {
  try {
    persistedState = JSON.parse(localStorageData);
  } catch (error) {}
}

const store = createStore(authReducer, applyMiddleware(thunk));

store.subscribe(() => {
  localStorage.setItem("hoax-auth", JSON.stringify(store.getState()));
});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
