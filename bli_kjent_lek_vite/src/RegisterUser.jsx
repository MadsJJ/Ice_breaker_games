import { useState } from "react";
import kaldprat_logo from "./assets/kaldprat_logo.png";
import Navbar from "./components/Navbar";
import "./style/Login.css";
import { db } from "./firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
//routing
import React from "react";
import { useNavigate } from "react-router-dom";

function RegisterUser() {
  //routing
  let navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/Login");
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Her kan du legge til logikken for å håndtere innsendingen av brukernavn og passord
    // console.log("Brukernavn:", username);
    // console.log("Passord:", password);
    const q = query(
      collection(db, "users"),
      where("username", "==", username),
      where("password", "==", password)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      console.log("Oopsies, ingen brukere funnet");
      return;
    }
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
    // For eksempel kan du her kalle en funksjon for å validere og sende dataene til en server
  };

  return (
    <>
      <div className="loginbody">
        <div className="loginContainer">
          <div className="loginboks">
            <div id="logoContainer">
              <img id="logo" src={kaldprat_logo} alt="error image" onClick={handleNavigate} />
            </div>

            <h2 className="overskrift">Registrer ny bruker</h2>
            <form onSubmit={handleSubmit}>
              <div className="inputboks">
                <label htmlFor="username">Lag et brukernavn:</label>

                <input
                  className="loginInput"
                  type="text"
                  placeholder="Skriv ditt brukernavn her ..."
                  id="username"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </div>

              <br />
              <div className="inputboks">
                <label htmlFor="password">Lag et passord:</label>

                <input
                  className="loginInput"
                  type="password"
                  placeholder="Skriv ditt passord her ..."
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              <br />
              <button
                onClick={handleNavigate}
                className="loginButton"
                type="submit"
              >
                Logg inn
              </button>
              <br></br>
              <br></br>



              <button
                onClick={handleLogin}
                className="optionButton"
                type="submit"
              >
                Har allerede en bruker
              </button>

            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterUser;