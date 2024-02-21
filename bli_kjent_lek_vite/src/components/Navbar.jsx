import './style/Navbar.css'
import kaldprat_logo from '../assets/kaldprat_logo.png'

export default function Navbar(){
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
                    <button href="/">Logg ut</button>
                </nav>
            </header>
        </>
    )
} 