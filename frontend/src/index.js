import React from "react";
import ReactDOM from "react-dom";
import Dapp from "./Dapp";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import { store } from './store/store'
import { Provider } from 'react-redux'

const themes = {
  dark: `${process.env.PUBLIC_URL}/dark-theme.css`,
  light: `${process.env.PUBLIC_URL}/light-theme.css`,
};

const prevTheme = window.localStorage.getItem("theme");


// This is the entry point of your application, but it just renders the Dapp
// react component. All of the logic is contained in it.

ReactDOM.render(

  <Provider store={store}>
    <ThemeSwitcherProvider themeMap={themes} defaultTheme={prevTheme || "light"}>
      <Dapp/>
    </ThemeSwitcherProvider>
  </Provider>
  ,
  document.getElementById("root")
);
