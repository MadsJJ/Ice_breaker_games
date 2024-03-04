import React, { useState, useEffect } from 'react';
import "./style/WheelOfFortune.css";
import Navbar from "./components/Navbar";

const sectors = [
    { color: '#f82', label: '1000'},
    { color: '#0bf', label: '10'},
    { color: '#fb0', label: '200'},
    { color: '#0fb', label: '50' },
    { color: '#b0f', label: '100' },
    { color: '#f0b', label: '5'},
];

const rand = (m, M) => Math.random() * (M - m) + m;
const tot = sectors.length;
const friction = 0.991; // 0.995=soft, 0.99=mid, 0.98=hard

const WheelOfFortune = () => {
  const [angVel, setAngVel] = useState(0);
  const [ang, setAng] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [resultValue, setResultValue] = useState('');

  useEffect(() => {
    const ctx = document.querySelector('#wheel').getContext('2d');
    const dia = ctx.canvas.width;
    const rad = dia / 2;
    const PI = Math.PI;
    const TAU = 2 * PI;
    const arc = TAU / sectors.length;

    const getIndex = () => Math.floor(tot - (ang / TAU) * tot) % tot;

    const drawSector = (sector, i) => {
        const ang = arc * i;
        ctx.save();
        // COLOR
        ctx.beginPath();
        ctx.fillStyle = sector.color;
        ctx.moveTo(rad, rad);
        ctx.arc(rad, rad, rad, ang, ang + arc);
        ctx.lineTo(rad, rad);
        ctx.fill();
        // TEXT
        ctx.translate(rad, rad);
        ctx.rotate(ang + arc / 2);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#fff';
        // Endre fontstørrelsen her
        ctx.font = 'bold 20px sans-serif'; // Endre '20px' til ønsket størrelse
        ctx.fillText(sector.label + "  ", rad - 10, 10);
        //
        ctx.restore();
      };

    const rotate = () => {
      ctx.canvas.style.transform = `rotate(${ang - PI / 2}rad)`;
    };

    const frame = () => {
      if (!angVel) return;
      let newAngVel = angVel * friction; // Decrement velocity by friction
      if (newAngVel < 0.002) newAngVel = 0; // Bring to stop
      let newAng = ang + newAngVel; // Update angle
      newAng %= TAU; // Normalize angle
      setAng(newAng);
      setAngVel(newAngVel);
      rotate();
    };

    const engine = () => {
      frame();
      requestAnimationFrame(engine);
    };

    sectors.forEach(drawSector);
    rotate(); // Initial rotation
    engine(); // Start engine

    return () => {
      // Cleanup code here
    };
  }, []);

  const handleSpin = () => {
    if (!spinning) {
      setSpinning(true);
      const newAngVel = rand(0.25, 0.45);
      setAngVel(newAngVel);
      setAng(0);
      setTimeout(() => {
        setSpinning(false);
        const randomIndex = Math.floor(Math.random() * sectors.length);
        const randomLabel = sectors[randomIndex].label;
        setResultValue(randomLabel);
        const randomAngle = rand(0, 360);
        setAng(-(randomAngle + 180) * (Math.PI / 180));
      }, 3000);
    }
  };

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
        <div id="wheelOfFortune">
          <canvas id="wheel" width="400" height="400"></canvas>
          <div id="spin" className={spinning ? 'spin spinning' : 'spin'} onClick={handleSpin}>SPIN</div>
        </div>
        <h2>{resultValue}</h2> {/* This <p> element will display the random label */}
      </div>
    </>
  );
};

export default WheelOfFortune;
