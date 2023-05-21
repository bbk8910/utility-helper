import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./sw";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@mui/material";

// Create a new theme instance
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#897119", // Set the primary color
    },
    secondary: {
      main: "#646669", // Set the secondary color
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
serviceWorker.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
