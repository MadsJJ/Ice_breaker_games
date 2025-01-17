import "./style/Navbar.css";
import kaldprat_logo from "../assets/kaldprat_logo.png";
//routing
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
    const [username, setUsername] = useState("");

    const handleMyGames = () => {
        if (localStorage.getItem("username")) {
            navigate("/MyGames");
        } else {
            alert("Du må være logget inn for å besøke dine leker!");
        }
    };

    const handleMyFavorites = () => {
        if (localStorage.getItem("username")) {
            navigate("/MyFavorites");
        } else {
            alert("Du må være logget inn for å se dine favoritter!");
        }
    };

    const handleMyRatings = () => {
        if (localStorage.getItem("username")) {
            navigate("/MyRatings");
        } else {
            alert("Du må være logget inn for å se dine ratings!");
        }
    };

    useEffect(() => {
        //ChatGPT
        // Check if username exists in local storage
        const storedUsername = localStorage.getItem("username");
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);
    //routing
    let navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate("/Login");
    };

    const handleNavigate = () => {
        navigate("/Login");
    };

    return (
        <>
            <header className="navbar">
                <a href="/">
                    <img src={kaldprat_logo} alt="KaldPrat logo" width="80px" />
                    {/* Image tag for logo */}
                </a>
                <div className="notLogo">
                    <nav className="navigation">
                        <a href="/MyPlaylists">Mine spillelister</a>
                        <a onClick={handleMyRatings} style={{ cursor: "pointer" }}>
                            Mine ratings
                        </a>
                        <a onClick={handleMyFavorites} style={{ cursor: "pointer" }}>
                            Mine favoritter
                        </a>
                        <a onClick={handleMyGames} style={{ cursor: "pointer" }}>
                            Mine leker
                        </a>
                    </nav>
                    <div className="user">
                        <p>Hei {username || "Gjest"}, godt å se deg!</p>
                        {username ? (
                            <button onClick={handleLogout}>Logg ut</button>
                        ) : (
                            <button onClick={handleNavigate}>Logg inn</button>
                        )}
                    </div>
                </div>
            </header>
        </>
    );
}
