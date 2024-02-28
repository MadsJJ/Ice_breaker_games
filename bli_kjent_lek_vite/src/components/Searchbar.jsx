import React, { useState, useEffect } from 'react';
import './style/Searchbar.css'
import { db } from "../firebase";
import { collection, doc, getDocs, query, where } from "firebase/firestore";


function SearchBar(props){

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    //const [searchResults, setSearchResults] = useState([]); // Lagre søkeresultater

    const handleSearch = async (event) => {
        event.preventDefault();
        const querySnapshot = await getDocs(collection(db, "games"));
        const results = [];

        querySnapshot.forEach((doc) => {
            const data = doc.data();

            if (data && data.Tittel){
                const titleFromDatabase = data.Tittel.toLowerCase();
            
                if (titleFromDatabase.includes(searchTerm.toLowerCase())) {
                    results.push(doc.data());
            
            
            }
        }


        
            //console.log(doc.Tittel);

            // if (doc.Tittel.includes(searchTerm)){
            //     {games.map((game) => (
          

            // }
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", doc.data());
    });
    setSearchResults(results);

 
    };


    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);

    };


    return (
            <div className="search-bar-container">
                <h1 className="alle-leker">Alle leker</h1>



                <form className="search-form" >

                    <input
                        type="text"
                        className="search-input"
                        placeholder="Finn lek..."
                        value={searchTerm}
                        onChange= {handleSearchChange}
                        
                    />
                    <button onClick={handleSearch} type="submit" className="search-button">
                        🔍
                    </button>
                    <button type="button" className="sort-aå">A-Å</button>
                    <button type="button" className="filter-button">Filter</button>
                
                </form>

                {/* Display search results */}
            <div className="search-results">
                {searchResults.map((game, index) => (
                    <div key={index}>{game.Tittel}</div>
                ))}
            </div>


            


            </div>
        
    );
};



export default SearchBar;
