import axios from "axios";
import 'dotenv/config';

export const getGenres = async (req, res) => {
    try {
        const response = await axios.get(
            "https://api.themoviedb.org/3/genre/movie/list?language=en",
            {
                headers: { "Authorization": `Bearer ${process.env.API_KEY}`, "Accept": "application/json" }
            }
        );
        res.json(response.data);
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Couldn't get the genres from TMDB",
        })
    }
}

export const getMovies = async (req, res) => {
    try {
        const { page, sort_by, genres, release_year, rating_min, rating_max } = req.query;
        let url = `https://api.themoviedb.org/3/discover/movie?language=en-US&page=${page}&sort_by=${sort_by}`;
        if (genres && genres.length) {
            const strGenres = genres.join("%7C");
            url += "&with_genres=" + strGenres;
        }
        if (release_year) {
            url += "&primary_release_year=" + release_year;
        }
        if (rating_min) {
            url += "&vote_average.gte=" + rating_min;
        }
        if (rating_max) {
            url += "&vote_average.lte=" + rating_max;
        }


        const response = await axios.get(
            url,
            {
                headers: { "Authorization": `Bearer ${process.env.API_KEY}`, "Accept": "application/json" }
            }
        );
        res.json(response.data);
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Couldn't get the movies from TMDB",
        })
    }
}

export const getMovie = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${id}?append_to_response=videos&language=en-US`,
            {
                headers: { "Authorization": `Bearer ${process.env.API_KEY}`, "Accept": "application/json" }
            }
        );
        res.json(response.data);
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Couldn't get the movie from TMDB",
        })
    }
}

export const getImage = async (req, res) => {
    try {
        const path = req.params.path;
        const mode = req.params.mode;
        const url = `https://image.tmdb.org/t/p/${mode === "full" ? "original" : "w500"}/${path}`;
        const arrayBuffer = await axios.get(url, {
            responseType: 'arraybuffer',
            headers: { "Authorization": `Bearer ${process.env.API_KEY}` }
        })
        res.set({
            'Content-Type': 'image/*',
            'Content-Length': arrayBuffer.data.length
        })
        res.send(arrayBuffer.data)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Couldn't get the movie from TMDB",
        })
    }
}
