import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import UserData from "./readUserdata.jsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import './style/App.css'

export const theme = createTheme({
  palette: {
    background: {
      paper: "#ebf2fa", // Your tertiary color
    },
    primary: {
      main: "#064789", // Your primary color
    },
    secondary: {
      main: "#427aa1", // Your secondary color
    },
    tertiary: {
      main: "#ebf2fa", // Your tertiary color
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <App />
      {/* <UserData /> */}
    </React.StrictMode>
  </ThemeProvider>
);
