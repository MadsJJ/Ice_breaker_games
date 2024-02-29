import "./style/Navbar.css";
import kaldprat_logo from "../assets/kaldprat_logo.png";
//routing
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [username, setUsername] = useState("");

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
          {/* Empty link for now - will return you to homepage once routing logic is completed */}
          <img src={kaldprat_logo} alt="KaldPrat logo" width="80px" />
          {/* Image tag for logo */}
        </a>
        <div className="notLogo">
          <nav className="navigation">
            <a href="/">Mine ratings</a>
            <a href="/">Mine spillelister</a>
            <a href="/">Mine favoritter</a>
            <a href="/">Mine leker</a>
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
