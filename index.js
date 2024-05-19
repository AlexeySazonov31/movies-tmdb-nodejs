import express from "express";
import cors from "cors";
import 'dotenv/config';

import { filtersValidation, movieValidation, imageValidation } from "./validations.js";

import { getGenres, getImage, getMovie, getMovies } from "./controllers/index.js";
import { handleValidationsErrors } from "./utils/index.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("This is a server for the TMDB api and it works fine, have a good movie)");
});

app.get("/genres", getGenres);
app.get("/image/:mode/:path", imageValidation, handleValidationsErrors, getImage);
app.get("/movies", filtersValidation, handleValidationsErrors, getMovies);
app.get("/movies/:id", movieValidation, handleValidationsErrors, getMovie);

app.get("/*", (req, res) => {
    res.status(400).send("There is no such way, walk my friend");
});

app.listen(process.env.PORT, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log("Server - OK, port: " + process.env.PORT);
})

export default app;
