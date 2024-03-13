import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./style/DropDownCategory.css";

function DropDownCategory() {
    let navigate = useNavigate();

    const handleSelectChange = (event) => {
        const selectedCategory = event.target.value;
        console.log(selectedCategory);
        // Navigate to CategoryFilter with selected category
        navigate("/CategoryFilter", { state: { category: selectedCategory } });
    };

    const [categories, setCategories] = useState([]);

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

    return (
        <div className="ddDiv">
            <select className="dropDown" onChange={handleSelectChange}>
                <option className="dropOptions" value="">
                    Kategorier
                </option>
                {categories.map((category, index) => (
                    <option className="dropOptions" key={index} value={category}>
                        {category}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default DropDownCategory;
