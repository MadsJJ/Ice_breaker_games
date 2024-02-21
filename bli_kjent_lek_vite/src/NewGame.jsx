import React, { useState } from 'react';

function NewGame() {

        const [gameData, setGameData] = useState({ //bruker useState til å opprette en tilstand gameData som inneholder info om leken
            title: '', //gameData er en objektstate med feltene til venstre
            description: '',
            rules: '',
            category: '',
        });


        const handleInputChange = (event) => {
            const { name, value } = event.target;
            setGameData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        };


        // Håndterer kategorivalg
        const handleCategorySelect = (selectedCategory) => {
            setGameData((prevData) => ({
                ...prevData,
                category: selectedCategory,
            }));
        };

        // Håndterer bekreftelsesknappen
        const handleConfirm = () => {
            // Implementer logikk for å bekrefte leken (for eksempel, send data til backend)
            // Her kan du også legge til brukernavnet
            const confirmedGameData = {
                ...gameData,
                createdBy: username,
            };

            // Implementer videre logikk etter behov (f.eks. lagring i database)
            console.log('Bekreft leken:', confirmedGameData);
        };

        return (

            <div className='newGameBox'>
                <h2>Create a New Game</h2>
                <form>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={gameData.title}
                        onChange={handleInputChange}
                    />

                    <label>Description:</label>
                    <textarea
                        name="Description:"
                        value={gameData.description}
                        onChange={handleInputChange}
                    ></textarea>

                    <label>Rules:</label>
                    <textarea
                        name="Rules:"
                        value={gameData.rules}
                        onChange={handleInputChange}
                    ></textarea>

                    <label>Category:</label>
                    <select
                        name="Category:"
                        value={gameData.category}
                        onChange={(e) => handleCategorySelect(e.target.value)}
                    >
                        <option value="">Select a category</option>
                        <option value="Category1">Category 1</option>
                        <option value="Category2">Category 2</option>
                        {/* Legg til de andre kategoriene her */}
                    </select>

                    <button type="button" onClick={handleConfirm}>
                        Confirm Game
                    </button>
                </form>
            </div>
        );
    };


export default NewGame;