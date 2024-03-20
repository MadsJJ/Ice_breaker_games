import React, { useEffect } from "react";
import { Wheel } from "react-custom-roulette";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import "./style/CustomWheel.css";

// Toastify alert
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CustomWheel = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const playlistId = location.state.playlistId;

    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState("");
    const [data, setPlaylistData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const playlistDocRef = doc(db, "playlists", playlistId);
                const playlistSnapshot = await getDoc(playlistDocRef);
                const data = (
                    await Promise.all(
                        playlistSnapshot.data().games.map((gameRef) => getDoc(gameRef))
                    )
                ).map((doc) => ({ id: doc.id, ...doc.data() }));

                setPlaylistData(data);
            } catch (error) {
                console.error("Feil ved henting av playlist-data:", error);
            }
        };
        fetchData();
    }, []);

    const handleSpinClick = () => {
        if (!mustSpin) {
            const newPrizeNumber = Math.floor(Math.random() * data.length);
            setPrizeNumber(newPrizeNumber);
            setMustSpin(true);
        }
    };

    const notify = () => toast("Tar deg videre til leken!");

    // https://bobbyhadz.com/blog/react-delay-function
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={false}
                theme="light"
                transition:Bounce
            />
            <div className="wheelComp">
                {data.length > 0 && (
                    <Wheel
                        id="wheel"
                        radiusLineWidth={3}
                        mustStartSpinning={mustSpin}
                        prizeNumber={prizeNumber}
                        data={data.map((game, index) => ({
                            id: index,
                            option: game.title,
                        }))}
                        backgroundColors={["#064789", "#427aa1"]}
                        textColors={["#ebf2fa"]}
                        fontSize={16}
                        onStopSpinning={async () => {
                            setMustSpin(false);
                            // Toastify alert
                            notify();
                            // wait 1.9s before routing to game page
                            await delay(1900);
                            navigate(`/VisitGame/${data[prizeNumber].id}`, {
                                state: {
                                    title: data[prizeNumber].title,
                                    gameId: data[prizeNumber].id,
                                },
                            });
                        }}
                    />
                )}
                <div>
                    <p>
                        Klarer du ikke velge?
                        <br />
                        La hjulet velge for deg!
                    </p>
                    <button onClick={handleSpinClick} className="bnSpin">
                        SPIN
                    </button>
                </div>
            </div>
        </>
    );
};

export default CustomWheel;
