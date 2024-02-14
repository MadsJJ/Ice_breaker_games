import './Navbar.css'

export default function Navbar(){
    return(
        <>
            <header className="navbar">
                <a href="/"> {/* Empty link for now - will return you to homepage once routing logic is completed */}
                    <img src="" alt="KaldPrat logo" /> {/* Image tag for logo */}
                </a>
                <nav className="navigation">
                    <a href="/">Mine ratings</a>
                    <a href="/">Mine spillelister</a>
                    <a href="/about">Mine favoritter</a>
                    <a href="/contact">Mine leker</a>
                    <button href="/">Logg ut</button>
                </nav>
            </header>
        </>
    )
} 