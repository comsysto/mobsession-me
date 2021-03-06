import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import Amplify from "aws-amplify";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import awsExports from "./aws-exports";
import { theme, Global } from "./globalStyles";

Amplify.configure(awsExports);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <>
        <Global />
        <App />
      </>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
