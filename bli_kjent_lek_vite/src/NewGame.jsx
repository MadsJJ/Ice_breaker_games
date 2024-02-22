import React, { useState } from 'react';
import Navbar from './components/Navbar';
import "./style/newGame.css"


function NewGame() {

        const [gameData, setGameData] = useState({ //bruker useState til å opprette en tilstand gameData som inneholder info om leken
            Tittel: '', //gameData er en objektstate med feltene til venstre
            Beskrivelse: '',
            Regler: '',
            Kategori: '',
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
        <>
            <Navbar />

            <div className='newGameBox'>
                <h2>Opprett en ny lek</h2>
                <form>
                    <label>Tittel:</label>
                    <input
                        type="text"
                        name="Tittel:"
                        value={gameData.title}
                        onChange={handleInputChange}
                    />

                    <label>Beskrivelse:</label>
                    <textarea
                        name="Beskrivelse:"
                        value={gameData.description}
                        onChange={handleInputChange}
                    ></textarea>

                    <label>Regler:</label>
                    <textarea
                        name="Regler:"
                        value={gameData.rules}
                        onChange={handleInputChange}
                    ></textarea>

                    <label>Kategori:</label>
                    <select
                        name="Kategori:"
                        value={gameData.category}
                        onChange={(e) => handleCategorySelect(e.target.value)}
                    >
                        <option value="">Velg en kategori</option>
                        <option value="Ute">Ute</option>
                        <option value="Inne">Inne</option>
                        {/* Legg til de andre kategoriene her */}
                    </select>

                    <button type="button" onClick={handleConfirm}>
                        Opprett lek
                    </button>
                </form>
            </div>
        </>
        );
    };


export default NewGame;