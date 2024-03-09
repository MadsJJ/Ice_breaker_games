import React, { useState, useEffect } from "react";
import "./style/Timer.css";

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

  return (
    <div className="timer-container">
      <div className="timer">
        {minutes < 10 ? "0" + minutes : minutes}:
        {seconds < 10 ? "0" + seconds : seconds}
      </div>

      <div className="buttons">
        <button
          className="timerButton"
          id="startknapp"
          onClick={handleStartPause}
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        <button className="timerButton" id="startknapp" onClick={handleReset}>
          Reset
        </button>
      </div>
      <br></br>
      <div className="input-container">
        <span>Minutter</span>
        <br></br>
        <div className="input-group">
          <button
            className="timerButton"
            onClick={() => setInputMinutes(Math.max(inputMinutes - 1, 0))}
          >
            -
          </button>

          <input
            className="timeInput"
            type="number"
            value={inputMinutes}
            onChange={(e) => setInputMinutes(parseInt(e.target.value))}
            placeholder="Minutter"
          />

          <button
            className="timerButton"
            onClick={() => setInputMinutes(inputMinutes + 1)}
          >
            +
          </button>
        </div>
        <div className="input-group">
          <span>Sekunder</span>
          <br></br>
          <button
            className="timerButton"
            onClick={() => setInputSeconds(Math.max(inputSeconds - 1, 0))}
          >
            -
          </button>
          <input
            className="timeInput"
            type="number"
            value={inputSeconds}
            onChange={(e) => setInputSeconds(parseInt(e.target.value))}
            placeholder="Sekunder"
          />

          <button
            className="timerButton"
            onClick={() => setInputSeconds(inputSeconds + 1)}
          >
            +
          </button>
        </div>
        <button className="timerButton" onClick={handleSetTime}>
          Sett tid
        </button>
      </div>

      {timeUp && <p className="time-up-message">Tiden er ute!</p>}
    </div>
  );
};

export default Timer;
