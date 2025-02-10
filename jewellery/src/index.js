import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route } from "react-router-dom";
import { En } from "./features/locale/En";
import { Ru } from "./features/locale/Ru";
import { initReactI18next } from "react-i18next";
import i18next from "i18next";

const container = document.getElementById("root");
const root = createRoot(container);

i18next.use(initReactI18next).init({
  resources: {
    Ru,
    En,
  },
  lng: localStorage.getItem("language") || "ru",
  interpolation: {
    escapeValue: false,
  },
});

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);

reportWebVitals();
