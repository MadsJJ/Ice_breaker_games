import { useState } from 'react'
import kaldprat_logo from './assets/kaldprat_logo.png'
import './style/Login.css'

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Her kan du legge til logikken for å håndtere innsendingen av brukernavn og passord
        console.log('Brukernavn:', username);
        console.log('Passord:', password);
        // For eksempel kan du her kalle en funksjon for å validere og sende dataene til en server
    };

    return (
        <body>
            <div className='loginContainer'>
                <div className='loginboks'>

                    <div id="logoContainer">
                        <img id="logo" src={kaldprat_logo} alt="error image" />
                    </div>

                    <h2 class='overskrift'>Logg inn</h2>
                    <form onSubmit={handleSubmit}>
                        <div className='input-boks'>
                            <label htmlFor="username">Brukernavn:</label>
                            <br></br>

                            <input
                                type="text"
                                placeholder='Skriv ditt brukernavn her ...'
                                id="username"
                                value={username}
                                onChange={handleUsernameChange}
                            />
                        </div>
                        <br></br>

                        <div className='input-boks'>
                            <label htmlFor="password">Passord:</label>
                            <br></br>

                            <input
                                type="password"
                                placeholder='Skriv ditt brukernavn her ...'
                                id="password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <button type="submit">Logg inn</button>
                    </form>
                </div>
            </div>
        </body>
    );
}

export default Login;
