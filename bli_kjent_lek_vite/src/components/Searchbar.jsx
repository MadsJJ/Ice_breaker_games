import { useState } from 'react';
import PropTypes from 'prop-types';
import './style/Searchbar.css'

/*const SearchBar = () => {
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
 
    };*/

    export const SearchBar = ({setResults})=> {
        const [Input, setInput] = useState("");

        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, "games"));
            const gamesList = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setGames(gamesList);
          };
      
          fetchData();
        

        

        const handleChange = (value) => {
            setInput(value);
            fetchData(value);
        
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
                        value = {input}
                        onChange={(e) => handleChange(e.target.value)}
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


SearchBar.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
    })).isRequired,
};

export default SearchBar;

    }
