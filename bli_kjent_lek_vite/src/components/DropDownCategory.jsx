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



// //routing
// import React from "react";
// import { useNavigate } from "react-router-dom";

// function DropDownCategory() {
//   //routing
//   let navigate = useNavigate();

//   const handleNavigate = (categories) => {
//     navigate("/CategoryFilter", { state: { categories } });
//   };

//   return (
// <select name="pets" id="pet-select">
//   <option value="">Kategorier</option>
//   <option value="Ute" onChange={() => handleNavigate("Ute")}>Ute</option>

//   <option value="cat">Cat</option>
//   <option value="hamster">Hamster</option>
//   <option value="parrot">Parrot</option>
//   <option value="spider">Spider</option>
//   <option value="goldfish">Goldfish</option>
// </select>

//     // <Dropdown>
//     //   <Dropdown.Toggle
//     //     variant="success"
//     //     id="dropdown-basic"
//     //     style={{
//     //       backgroundColor: "#064789",
//     //       borderColor: "#064789",
//     //       padding: "10px",
//     //     }}
//     //   >
//     //     Kategorier
//     //   </Dropdown.Toggle>

//     //   <Dropdown.Menu>
//     //     <Dropdown.Item onClick={() => handleNavigate("Ute")}>Ute</Dropdown.Item>
//     //     <Dropdown.Item onClick={() => handleNavigate("Inne")}>
//     //       Inne
//     //     </Dropdown.Item>
//     //     <Dropdown.Item onClick={() => handleNavigate("Barn")}>
//     //       Barn
//     //     </Dropdown.Item>
//     //     <Dropdown.Item onClick={() => handleNavigate("Fest")}>
//     //       Fest
//     //     </Dropdown.Item>
//     //   </Dropdown.Menu>
//     // </Dropdown>
//   );
// }

// export default DropDownCategory;
