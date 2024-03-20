import React, { useState, useEffect } from "react";
import "./style/Timer.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Timer = () => {
    const [inputMinutes, setInputMinutes] = useState(0);
    const [inputSeconds, setInputSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [timeUp, setTimeUp] = useState(false);

    useEffect(() => {
        let timer;
        if (isRunning) {
            timer = setInterval(() => {
                if (seconds === 0) {
                    if (minutes === 0) {
                        clearInterval(timer);
                        setIsRunning(false);
                        setTimeUp(true);
                        notify();
                        setTimeout(() => {
                            setTimeUp(false);
                        }, 3000);
                    } else {
                        setMinutes(minutes - 1);
                        setSeconds(59);
                    }
                } else {
                    setSeconds(seconds - 1);
                }
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [isRunning, minutes, seconds]);

    const handleStartPause = () => {
        setIsRunning(!isRunning);
    };

    const handleReset = () => {
        setMinutes(0);
        setSeconds(0);
        setIsRunning(false);
        setTimeUp(false);
    };

    const handleSetTime = () => {
        if (inputMinutes >= 0 && inputSeconds >= 0) {
            setMinutes(inputMinutes);
            setSeconds(inputSeconds);
            setIsRunning(false);
            setTimeUp(false);
        }
    };

    useEffect(() => {
        if (timeUp) {
            toast.error("Tiden er ute!", {
                autoClose: 5000,
                onClose: () => setTimeUp(false),
            });
        }
    }, [timeUp]);

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
            <div className="timer-container">
                <p>Her er timeren du trenger!</p>
                <div className="timeStartReset">
                    <div className="timer">
                        <button className="timerButton" id="startknapp" onClick={handleStartPause}>
                            {isRunning ? "Pause" : "Start"}
                        </button>
                        {minutes < 10 ? "0" + minutes : minutes}:
                        {seconds < 10 ? "0" + seconds : seconds}
                        <button className="timerButton" id="startknapp" onClick={handleReset}>
                            Reset
                        </button>
                    </div>
                </div>
                <div className="input-container">
                    <div className="input-group">
                        <h4>Minutter</h4>
                        <button
                            className="timerButton"
                            onClick={() => setInputMinutes(Math.max(inputMinutes - 1, 0))}
                        >
                            −
                        </button>

                        <input
                            className="timeInput"
                            type="number"
                            value={inputMinutes}
                            onChange={(e) => setInputMinutes(parseInt(e.target.value))}
                        />

                        <button
                            className="timerButton"
                            onClick={() => setInputMinutes(inputMinutes + 1)}
                        >
                            +
                        </button>
                    </div>
                    <div className="input-group">
                        <h4>Sekunder</h4>
                        <button
                            className="timerButton"
                            onClick={() => setInputSeconds(Math.max(inputSeconds - 1, 0))}
                        >
                            −
                        </button>
                        <input
                            className="timeInput"
                            type="number"
                            value={inputSeconds}
                            onChange={(e) => setInputSeconds(parseInt(e.target.value))}
                            placeholder="Sek"
                        />

                        <button
                            className="timerButton"
                            onClick={() => setInputSeconds(inputSeconds + 1)}
                        >
                            +
                        </button>
                    </div>
                </div>
                <div>
                    <button id="bnSetTime" className="timerButton" onClick={handleSetTime}>
                        Sett tid
                    </button>
                </div>
            </div>
        </>
    );
};

export default Timer;
