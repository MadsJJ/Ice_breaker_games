import Dropdown from 'react-bootstrap/Dropdown';
//routing
import React from 'react';
import { useNavigate } from 'react-router-dom';

function DropDownCategory() {
    //routing
    let navigate = useNavigate();

    const handleNavigate = (category) => {
        navigate("/CategoryFilter", { state: { category } });
    };

    return (
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ backgroundColor: '#064789', borderColor: '#064789', padding: "10px" }}>
                Kategorier
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleNavigate('Ute')}>Ute</Dropdown.Item>
                <Dropdown.Item onClick={() => handleNavigate('Inne')}>Inne</Dropdown.Item>
                <Dropdown.Item onClick={() => handleNavigate('Barn')}>Barn</Dropdown.Item>
                <Dropdown.Item onClick={() => handleNavigate('Fest')}>Fest</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default DropDownCategory;
