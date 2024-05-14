import express from "express";
import cors from "cors";
import 'dotenv/config'

import { filtersValidation } from "./validations.js";

import { MoviesApiController } from "./controllers/index.js";
import { handleValidationsErrors } from "./utils/index.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/api/genres", MoviesApiController.getGenres);
app.get("/api/movies", MoviesApiController.getMovies);

// app.post("/auth/login", loginValidation, handleValidationsErrors, UserController.login);
// app.post("/auth/register", registerValidation, handleValidationsErrors, UserController.register);
// app.get("/auth/me", checkAuth, UserController.getMe);

app.listen(process.env.PORT, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log("Server - OK, port: " + process.env.PORT);
})