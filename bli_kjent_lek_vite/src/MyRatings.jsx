import "./style/App.css";
import Navbar from "./components/Navbar";
//routing

function MyRatings() {
  return (
    <>
      <Navbar />
      <h1
        style={{
          display: "flex",
          flexWrap: "wrap",
          margin: "auto",
          marginTop: "20px",
          width: "90vw",
          color: "#064789",
          borderBottom: "1px solid gray",
        }}
      >
        Mine Ratings
      </h1>
      {/* <GameCarousel /> */}
      <br />
    </>
  );
}

export default MyRatings;
