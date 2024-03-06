import React from "react";
import { useNavigate } from "react-router-dom";

function DropDownCategory() {
  //routing
  let navigate = useNavigate();

  const handleNavigate = (selectedCategory) => {
    navigate("/CategoryFilter", { state: { category: selectedCategory } });
  };

  return (
    <select name="pets" id="pet-select" onChange={(e) => handleNavigate(e.target.value)}>
      <option value="">Kategorier</option>
      <option value="Ute">Ute</option>
      <option value="Inne">Inne</option>
      <option value="hamster">Hamster</option>
      <option value="parrot">Parrot</option>
      <option value="spider">Spider</option>
      <option value="goldfish">Goldfish</option>
    </select>
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
