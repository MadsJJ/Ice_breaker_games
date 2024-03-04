import { useState } from "react";
import kaldprat_logo from "./assets/kaldprat_logo.png";
import Navbar from "./components/Navbar";
import "./style/Login.css";
import { db } from "./firebase";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
//routing
// import React from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  //routing
  let navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/");
  };

  const handleRegisterUser = () => {
    navigate("/RegisterUser");
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
    // console.log("Brukernavn:", username);
    // console.log("Passord:", password);
    const q = query(
      collection(db, "users"),
      where("username", "==", username),
      where("password", "==", password)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      console.log("User found");
      console.log("ID:", querySnapshot.docs[0].id);
      localStorage.setItem("userID", querySnapshot.docs[0].id);
      localStorage.setItem("username", username);
      navigate("/");
    } else {
      alert("Feil brukernavn eller passord");
    }
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

            <h2 className="overskrift">Logg inn</h2>
            <form onSubmit={handleSubmit}>
              <div className="inputboks">
                <label htmlFor="username">Brukernavn:</label>

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
                <label htmlFor="password">Passord:</label>

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
                onClick={handleSubmit}
                className="loginButton"
                type="submit"
              >
                Logg inn
              </button>

              <br></br>
              <br></br>
             

              <button
                onClick={handleRegisterUser}
                className="optionButton"
                type="submit"
              >
                Registrer ny bruker?
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

export default Login;
