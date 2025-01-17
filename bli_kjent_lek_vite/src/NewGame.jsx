import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { db } from "./firebase";
import "./style/NewGame.css";
import { collection, addDoc, getDocs } from "firebase/firestore";

function NewGame() {
    const [gameData, setGameData] = useState({
        title: "",
        description: "",
        minNumberOfPeople: "",
        maxNumberOfPeople: "",
        creatorID: localStorage.getItem("username"),
        categories: [], // Change categories to an array
        image: null,
        likes: 0,
    });

    const navigate = useNavigate();

    const storage = getStorage();

    const handleNavigate = () => {
        navigate("/");
    };

    const [categories, setCategories] = useState([]);
    // fetch categories from db - reused from DropDownCategory
    useEffect(() => {
        const fetchCategories = async () => {
            const categoriesData = new Set(); // Using Set to ensure unique categories
            const q = collection(db, "games");
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                const gameCategories = doc.data().categories;
                gameCategories.forEach((category) => {
                    categoriesData.add(category);
                });
            });
            setCategories(Array.from(categoriesData));
        };

        fetchCategories();
    }, []);

    const handleChange = (event) => {
        const { name, checked } = event.target;
        if (checked) {
            // If checkbox is checked, add category to the array
            setGameData((prevGameData) => ({
                ...prevGameData,
                categories: [...prevGameData.categories, name],
            }));
        } else {
            // If checkbox is unchecked, remove category from the array
            setGameData((prevGameData) => ({
                ...prevGameData,
                categories: prevGameData.categories.filter((cat) => cat !== name),
            }));
        }
    };

    const handleCreateGame = async (event) => {
        event.preventDefault();
        try {
            if (
                !gameData.title ||
                !gameData.description ||
                !gameData.minNumberOfPeople ||
                !gameData.maxNumberOfPeople ||
                gameData.categories.length === 0 // Ensure at least one category is selected
            ) {
                alert("Fyll inn alle felter!");
                return;
            }

            // Upload image to Firebase Storage
            const storageRef = ref(storage, `gameImages/${gameData.image.name}`);
            await uploadBytes(storageRef, gameData.image);

            // Get the download URL of the uploaded image
            const downloadURL = await getDownloadURL(storageRef);

            // // Add the game to "games" collection with the image URL
            // await createNewGame({ ...gameData, image: downloadURL });

            // Add the game to "games" collection
            await createNewGame(gameData);

            // Reset the form after the game is added to the database
            setGameData({
                title: "",
                description: "",
                minNumberOfPeople: "",
                maxNumberOfPeople: "",
                categories: [],
                image: null, // Reset the form after the game is added to the database
            });

            // Alert that the game was created
            alert("Leken er opprettet!");

            // Navigate back to the homepage
            navigate("/");
        } catch (error) {
            console.error("Error adding document: ", error);
            alert("Et problem oppstod når vi forsøkte å opprette leken.");
        }
    };

    const createNewGame = async (gameData) => {
        //await addDoc(collection(db, "games"), gameData);

        // Upload image to Firebase Storage
        const storageRef = ref(storage, `gameImages/${gameData.image.name}`);
        await uploadBytes(storageRef, gameData.image);

        // Get the download URL of the uploaded image
        const downloadURL = await getDownloadURL(storageRef);

        // Add the game to "games" collection with the image URL
        const gameRef = await addDoc(collection(db, "games"), {
            ...gameData,
            image: downloadURL, // Store the image URL in Firestore
        });

        return gameRef.id; // Return the ID of the newly created game
    };

    return (
        <>
            <Navbar />
            <div className="newGameBox">
                <h2 className="NGH2">Lag en ny lek</h2>
                <form className="newGameForm">
                    <label className="gameTitle">Tittel:</label>
                    <input
                        className="inputfeltGame"
                        maxLength={50}
                        id="titleInput"
                        type="text"
                        name="title"
                        value={gameData.title}
                        onChange={(e) =>
                            setGameData((prevGameData) => ({
                                ...prevGameData,
                                title: e.target.value,
                            }))
                        }
                    />

                    <label className="gameTitle">Beskrivelse:</label>
                    <textarea
                        className="inputfeltGame"
                        id="descInput"
                        name="description"
                        value={gameData.description}
                        onChange={(e) =>
                            setGameData((prevGameData) => ({
                                ...prevGameData,
                                description: e.target.value,
                            }))
                        }
                    ></textarea>

                    <div>
                        <label className="gameTitle">Minimum antall deltakere:</label>
                        <input
                            className="inputfeltGame"
                            id="minPlayer"
                            type="number"
                            inputMode="numeric"
                            name="minNumberOfPeople"
                            value={gameData.minNumberOfPeople}
                            onChange={(e) =>
                                setGameData((prevGameData) => ({
                                    ...prevGameData,
                                    minNumberOfPeople: e.target.value,
                                }))
                            }
                        />
                    </div>

                    <div>
                        <label className="gameTitle">Maks antall deltakere:</label>
                        <input
                            className="inputfeltGame"
                            id="maxPlayer"
                            maxLength={3}
                            type="number"
                            inputMode="numeric"
                            name="maxNumberOfPeople"
                            value={gameData.maxNumberOfPeople}
                            onChange={(e) =>
                                setGameData((prevGameData) => ({
                                    ...prevGameData,
                                    maxNumberOfPeople: e.target.value,
                                }))
                            }
                        />
                    </div>

                    <label className="gameTitle">Kategorier:</label>
                    <div>
                        {categories.map((category, index) => (
                            <label key={index} className="categoryTitle">
                                <input
                                    className="inputfeltGame"
                                    type="checkbox"
                                    name={category}
                                    checked={gameData.categories.includes(category)}
                                    onChange={handleChange}
                                />
                                {category}
                            </label>
                        ))}
                    </div>
                    <label className="gameTitle" htmlFor="fileInput">
                        Bilde:
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            setGameData((prevGameData) => ({
                                ...prevGameData,
                                image: e.target.files[0],
                            }))
                        }
                        id="fileInput"
                        style={{ display: "none" }}
                    />

                    <div
                        className="uploadButton"
                        onClick={() => document.getElementById("fileInput").click()}
                    >
                        Last opp bilde
                    </div>

                    <br></br>

                    <button className="bnConfirm" type="button" onClick={handleCreateGame}>
                        Opprett lek
                    </button>
                </form>
            </div>
        </>
    );
}

export default NewGame;
