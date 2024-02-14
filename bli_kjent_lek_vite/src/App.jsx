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
import Navbar from "./components/navbar";

function App() {
  const handleClick = () => {
    console.log("Clicked");
    location.href = "/src/";
  };
  const data = ["Lek 1", "Lek 2", "Lek 3", "Lek 4", "Lek 5", "Lek 6"];
  return (
    <>
      <Container maxWidth="lg">
        <Typography variant="h2" align="center">
          KaldPrat
        </Typography>
        <Grid
          container
          maxWidth="900px"
          justifyContent="center"
          alignItems="center"
          columns={18}
          spacing={4}
          style={{ marginTop: "50px" }}
        >
          {data.map((item, index) => (
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
                      {item}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
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
      <Navbar />
    </>
  );
}

export default App;
