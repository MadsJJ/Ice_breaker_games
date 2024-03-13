import React, { useState, useEffect } from "react";
import "./style/WheelOfFortune.css";
import Navbar from "./components/Navbar";
import Timer from "./components/Timer";
import CustomWheel from "./components/CustomWheel";

const WheelOfFortune = () => {
    return (
        <>
            <Navbar />
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    margin: "auto",
                    width: "90vw",
                }}
            >
                <Timer />
                <CustomWheel />
            </div>
        </>
    );
};

export default WheelOfFortune;
