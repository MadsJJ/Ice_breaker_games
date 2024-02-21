import { useState } from 'react';
import './style/Searchbar.css'

const SearchBar = ({categories}) => {
    const [searchTerm, setSearchTerm]= useState('');
    const [filteredCategories, setFilteredCategories] = useState([]);

    const handleSearchChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

    if (term.trim()!== ''){
        const filtered = categories.filter(category => category.name.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredCategories(filtered);
    }
    else {setFilteredCategories([])
    }
 
    };
    return (
        <>
            <div className="search-bar-container">
                <h1 className="alle-leker">Alle leker</h1>
                <form className="search-form">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Finn lek..."
                        value = {searchTerm}
                        onChange={handleSearchChange}
                    />
                    <button type="submit" className="search-button">
                        🔍
                    </button>
                    <button type="button" className="sort-aå">A-Å</button>
                    <button type="button" className="filter-button">Filter</button>
                </form>
                <div className= "search-result">
                    {filteredCategories.map((category)=> (
                        <div key={category.id} className="category-card"> 
                        <span>{category.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default SearchBar;
