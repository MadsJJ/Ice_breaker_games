import React, { useState, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./style/Timer.css";

function CountdownTimer() {
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [timerActive, setTimerActive] = useState(false);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval;
        if (timerActive && isRunning) {
            interval = setInterval(() => {
                if (minutes === 0 && seconds === 0) {
                    clearInterval(interval);
                    setTimerActive(false);
                    setIsRunning(false);
                    notify();
                } else {
                    if (seconds === 0) {
                        setMinutes(minutes - 1);
                        setSeconds(59);
                    } else {
                        setSeconds(seconds - 1);
                    }
                }
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [timerActive, minutes, seconds, isRunning]);

    const handleStartPause = () => {
        setIsRunning(!isRunning);
        setTimerActive(true);
    };

    const handleReset = () => {
        setMinutes(0);
        setSeconds(0);
        setTimerActive(false);
        setIsRunning(false);
    };

    const handleMinutesChange = (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value >= 0 && value <= 120) {
            setMinutes(value);
        } else if (e.target.value === "") {
            setMinutes("");
        }
    };

    const handleSecondsChange = (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value >= 0 && value <= 60) {
            setSeconds(value);
        } else if (e.target.value === "") {
            setSeconds("");
        }
    };

    const notify = () => {
        toast.error("Tiden er ute!");
    };

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable={false}
                pauseOnHover={false}
                theme="colored"
                transition:Bounce
            />
            <div className="ttttt">
                <p>Her er timeren du trenger!</p>
            </div>
            <div className="tttt">
                <div className="ttt">
                    <div>
                        <h4>Min</h4>
                    </div>
                    <div>
                        <h4>:</h4>
                    </div>
                    <div>
                        <h4>Sek</h4>
                    </div>
                </div>
                <div className="tt">
                    <div>
                        <button className="timerButton" id="startknapp" onClick={handleStartPause}>
                            {isRunning ? "Pause" : "Start"}
                        </button>
                    </div>
                    <div className="mi">
                        <input
                            type="number"
                            className="ti"
                            value={minutes}
                            onChange={handleMinutesChange}
                            placeholder="Minutes"
                        />
                    </div>
                    <div className="t">
                        <p className="tp">:</p>
                    </div>
                    <div className="mi">
                        <input
                            type="number"
                            className="ti"
                            value={seconds}
                            onChange={handleSecondsChange}
                            placeholder="Seconds"
                        />
                    </div>
                    <div>
                        <button className="timerButton" onClick={handleReset}>
                            Nullstill
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CountdownTimer;
