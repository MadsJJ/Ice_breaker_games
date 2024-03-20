import "./style/Searchbar.css";
import DropDownCategory from "./DropDownCategory";
// npm install react-bootstrap bootstrap
//routing
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ heading = "Alle leker" }) => {
    //routing
    let navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate("/Filter", { state: { searchTerm } });
    };

    return (
        <>
            <div className="search-bar-container">
                <h1 className="alle-leker">{heading}</h1>
                <form className="search-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Finn lek..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button type="submit" className="search-button">
                        🔍
                    </button>
                    <DropDownCategory />
                </form>
            </div>
        </>
    );
};

export default SearchBar;
