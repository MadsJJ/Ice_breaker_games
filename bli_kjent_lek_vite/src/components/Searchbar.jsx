import './style/Searchbar.css'

const SearchBar = () => {
    return (
        <>
            <div className="search-bar-container">
                <h1 className="alle-leker">Alle leker</h1>
                <form className="search-form">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Finn lek..."
                    />
                    <button type="submit" className="search-button">
                        🔍
                    </button>
                    <button type="button" className="sort-aå">A-Å</button>
                    <button type="button" className="filter-button">Filter</button>
                </form>
            </div>
        </>
    );
};

export default SearchBar;
