import { useState } from "react";
import kaldprat_logo from "./assets/kaldprat_logo.png";
import styles from "./style/Login.module.css";
import { db } from "./firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
//routing
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    //routing
    let navigate = useNavigate();

    const handleNavigate = () => {
      navigate('/'); 
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
        <body
        className={styles.loginbody}>
            <div className='loginContainer'>
                <div className={styles.loginboks}>

                    <div id={styles.logoContainer}>
                        <img id={styles.logo} src={kaldprat_logo} alt="error image" />
                    </div>

                    <h2 className={styles.overskrift}>Logg inn</h2>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.inputboks}>
                            <label htmlFor="username">Brukernavn:</label>
                            <br></br>

                            <input
                                className={styles.loginInput}
                                type="text"
                                placeholder='Skriv ditt brukernavn her ...'
                                id="username"
                                value={username}
                                onChange={handleUsernameChange}
                            />
                        </div>
                        <br></br>

                        <div className={styles.inputboks}>
                            <label htmlFor="password">Passord:</label>
                            <br></br>

                            <input
                                className={styles.loginInput}
                                type="password"
                                placeholder='Skriv ditt brukernavn her ...'
                                id="password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <button 
                        onClick={handleNavigate}
                        className={styles.loginButton}
                        type="submit">Logg inn</button>
                    </form>
                </div>
            </div>
        </body>
    );
}

export default Login;
