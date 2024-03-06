import React from "react";
import ReactDOM from "react-dom/client";
import NewGame from "./NewGame.jsx";
import MyGames from "./MyGames.jsx";
import MyPlaylists from "./MyPlaylists.jsx";
import NewPlaylist from "./NewPlaylist.jsx";
import Login from "./Login.jsx";
import App from "./App.jsx";
import RegisterUser from "./RegisterUser.jsx";
import VisitGame from "./VisitGame.jsx";
import CategoryFilter from "./CategoryFilter.jsx";
import WheelOfFortune from "./WheelOfFortune.jsx";

import "./style/App.css";
import "./style/index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
//error page
import ErrorPage from "./components/error-page.jsx";
//routing
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//tror man må kjøre "npm install react-router-dom"

const router = createBrowserRouter([
  //root home
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  //route Login
  {
    path: "/Login",
    element: <Login />,
  },
  //route NewGame
  {
    path: "/NewGame",
    element: <NewGame />,
  },
  //route RegisterUser
  {
    path: "/RegisterUser",
    element: <RegisterUser />,
  },

  //route VisitGame
  {
    path: "/VisitGame/:gameId",
    element: <VisitGame />,
  },

  //route categoryFilter
  {
    path: "/CategoryFilter",
    element: <CategoryFilter />,
  },

  //route categoryFilter
  {
    path: "/CategoryFilter",
    element: <CategoryFilter />,
  },

   //route WheelOfFortune
   {
    path: "/WheelOfFortune",
    element: <WheelOfFortune />,
  },

  //route Mygames

  {

    path: "/MyGames",
    element: <MyGames />,
  },

  {

    path: "/MyPlaylists",
    element: <MyPlaylists/>,
  },

  {

    path: "/NewPlaylist",
    element: <NewPlaylist/>,
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
