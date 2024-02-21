import "./style/App.css";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActionArea,
  CardActions,
  Button,
  CardMedia,
} from "@mui/material";
import Container from "@mui/material/Container";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Searchbar from "./components/Searchbar";
import { useEffect } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

function App() {
  const handleClick = () => {
    console.log("Clicked");
    location.href = "/src/";
  };
  const [games, setGames] = useState([]);

  useEffect(() => {
    // A secret chamber for our fetching ritual
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "games"));
      const gamesList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setGames(gamesList);
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <Searchbar />
      <Container maxWidth="lg">
        <Grid
          container
          maxWidth="900px"
          justifyContent="center"
          alignItems="center"
          columns={18}
          spacing={4}
          style={{ marginTop: "50px" }}
        >
          {games.map((item, index) => (
            <Grid item xs={3} sm={6} ms={3} key={index}>
              <Card
                sx={{
                  maxWidth: 345,
                  minWidth: 250,
                  borderRadius: "15px",
                }}
              >
                <CardActionArea>
                  <CardMedia
                    sx={{ height: "140px" }}
                    image="https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg"
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.Tittel}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    onClick={handleClick}
                    color="secondary"
                    variant="contained"
                    size="small"
                  >
                    Button
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Button
        id="newGameButton"
        color="primary"
        variant="contained"
        size="large"
      >
        New Game
      </Button>
    </>
  );
}

export default App;
