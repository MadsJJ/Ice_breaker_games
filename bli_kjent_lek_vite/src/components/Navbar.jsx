import './Navbar.css'

export default function Navbar(){
    return(
        <>
            <header>
                <a href="/"> {/* Empty link for now - will return you to homepage once routing logic is completed */}
                    <img src="" alt="KaldPrat logo" /> {/* Image tag for logo */}
                </a>
                <a href="/">Kategorier</a>
                <button> Log in </button>
            </header>
        </>
    )
}