import { useState, useEffect } from 'react'; //useeffect sørger for at man kan utføre søket når søkeordet endres 
import PropTypes from 'prop-types';
import './style/Searchbar.css'
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';


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

    useEffect(() => {
        const fetchSearchResults = async () => {
          const db = getFirestore();
          const gamesRef = collection(db, 'games');
    
          if (searchTerm.trim() !== '') {
            const q = query(gamesRef, where('name', '==', searchTerm));
            const querySnapshot = await getDocs(q);
    
            const results = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
    
            setSearchResults(results);
          } else {
            setSearchResults([]);
          }
        };
    
        fetchSearchResults();
      }, [searchTerm]);
    
      const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
      };

    // export const SearchBar = ({setResults})=> {
    //     const [Input, setInput] = useState("");

    //     const fetchData = async () => {
    //         const querySnapshot = await getDocs(collection(db, "games"));
    //         const gamesList = querySnapshot.docs.map((doc) => ({
    //           id: doc.id,
    //           ...doc.data(),
    //         }));
    //         setGames(gamesList);
    //       };
      
    //       fetchData();
        

        

    //     const handleChange = (value) => {
    //         setInput(value);
    //         fetchData(value);
        
    // };

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


                <ul>
                {searchResults.map((result) => (
                <li key={result.id}>
                    <a href={`/games/${result.id}`}>{result.name}</a>
                </li>
            ))}
        </ul>
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

    
