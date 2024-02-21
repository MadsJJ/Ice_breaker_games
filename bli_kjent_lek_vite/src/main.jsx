import React from 'react'
import ReactDOM from 'react-dom'
import NewGame from './NewGame.jsx'
import Login from './Login.jsx'
// import UserData from "./readUserdata.jsx";
import App from "./App.jsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
//error page
import ErrorPage from "./components/error-page.jsx";
//routing
// import { BrowserRouter as 
//   Router, 
//   Route, 
//   Routes } from 'react-router-dom';
  import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
//tror man må kjøre "npm install react-router-dom"


const router = createBrowserRouter([
  //root route
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />, 
  },
  //route NewGame
  {
    path: "/Login",
    element: <Login />,
  },

  //-->
  //legg til flere routes her
]);



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
      <RouterProvider router={router} />
    </React.StrictMode>
  </ThemeProvider>
);
