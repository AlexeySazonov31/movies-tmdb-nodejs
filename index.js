import express from "express";
import cors from "cors";
import 'dotenv/config'

import { filtersValidation, movieValidation } from "./validations.js";

import { MoviesApiController } from "./controllers/index.js";
import { handleValidationsErrors } from "./utils/index.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("This is a server for the TMDB api and it works fine, have a good movie)");
});

app.get("/genres", MoviesApiController.getGenres);
app.get("/image/:path", MoviesApiController.getImage);
app.get("/movies", filtersValidation, handleValidationsErrors, MoviesApiController.getMovies);
app.get("/movies/:id", movieValidation, handleValidationsErrors, MoviesApiController.getMovie);

app.get("/*", (req, res) => {
    res.status(400).send("There is no such way, walk my friend");
});

app.listen(process.env.PORT, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log("Server - OK, port: " + process.env.PORT);
})