import "./style/App.css";
import "./style/index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Filter from "./Filter.jsx";
import Login from "./Login.jsx";
import MyGames from "./MyGames.jsx";
import NewGame from "./NewGame.jsx";
import RegisterUser from "./RegisterUser.jsx";
import MyFavorites from "./MyFavorites.jsx";
import MyPlaylists from "./MyPlaylists.jsx";
import NewPlaylist from "./NewPlaylist.jsx";
import VisitPlaylist from "./VisitPlaylist";
import MyRatings from "./MyRatings.jsx";
import "./style/App.css";
import "./style/index.css";
import VisitGame from "./VisitGame.jsx";
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

    //route Filter
    {
        path: "/Filter",
        element: <Filter />,
    },

    //route Mygames
    {
        path: "/MyGames",
        element: <MyGames />,
    },

    // route MyPlaylists
    {
        path: "/MyPlaylists",
        element: <MyPlaylists />,
    },

    //route MyFavorites
    {
        path: "/MyFavorites",
        element: <MyFavorites />,
    },
    {
        path: "/NewPlaylist",
        element: <NewPlaylist />,
    },

    {
        path: "/VisitPlaylist/:playlistId",
        element: <VisitPlaylist />,
    },

    //route MyRatings
    {
        path: "/MyRatings",
        element: <MyRatings />,
    },

    //-->
    //legg til flere routes her
]);

export const theme = createTheme({
    palette: {
        background: {
            paper: "#ebf2fa",
        },
        primary: {
            main: "#064789",
        },
        secondary: {
            main: "#427aa1",
        },
        tertiary: {
            main: "#ebf2fa",
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
