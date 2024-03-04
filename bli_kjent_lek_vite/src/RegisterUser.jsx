import { useState } from "react";
import kaldprat_logo from "./assets/kaldprat_logo.png";
import Navbar from "./components/Navbar";
import "./style/Login.css";
import { db } from "./firebase";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  setDoc,
} from "firebase/firestore";
//routing
import React from "react";
import { useNavigate } from "react-router-dom";

function RegisterUser() {
  //routing
  let navigate = useNavigate();

  const handleNavigate = () => {
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
    const q = query(collection(db, "users"), where("username", "==", username));
    const querySnapshot = await getDocs(q);
    console.log("knapp trykket");
    if (username == "" || password == "") {
      alert("Fyll ut alle feltene");
      return;
    } else if (!querySnapshot.empty) {
      alert("Brukernavn eksisterer allerede");
    } else {
      //add user to database
      await createNewUser(username, password);
      navigate("/Login");
      alert(
        "Created user with username: " +
          username +
          "\n and password: " +
          password
      );
    }
  };

  const createNewUser = async (username, password) => {
    setDoc(doc(db, "users", username), {
      username: username,
      password: password,
    });
  };

  return (
    <>
      <div className="loginbody">
        <div className="loginContainer">
          <div className="loginboks">
            <div id="logoContainer">
              <img
                id="logo"
                src={kaldprat_logo}
                alt="error image"
                onClick={handleNavigate}
              />
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
                // onClick={handleSubmit}
                className="loginButton"
                type="submit"
              >
                Registrer bruker
              </button>
              <br></br>
              <br></br>

              <button
                onClick={handleNavigate}
                className="optionButton"
                type="submit"
              >
                Har allerede en bruker
              </button>

              <br></br>
              <br></br>


              <button
                onClick={handleNavigate}
                className="optionButton"
                type="submit"
              >
                Besøk siden som gjest
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterUser;
