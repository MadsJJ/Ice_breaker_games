import './style/Navbar.css'
import kaldprat_logo from '../assets/kaldprat_logo.png'
//routing
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar(){
    //routing
  let navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/Login'); 
  };

    return(
        <>
            <header className="navbar">
                <a href="/"> {/* Empty link for now - will return you to homepage once routing logic is completed */}
                    <img src={kaldprat_logo} alt="KaldPrat logo" width="80px" /> {/* Image tag for logo */}
                </a>
                <nav className="navigation">
                    <a href="/">Mine ratings</a>
                    <a href="/">Mine spillelister</a>
                    <a href="/">Mine favoritter</a>
                    <a href="/">Mine leker</a>
                    <button onClick={handleNavigate}>Logg In</button>
                </nav>
            </header>
        </>
    )
} 