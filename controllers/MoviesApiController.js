import axios from "axios";

export const getGenres = async (req, res) => {
    try {
        const response = await axios.get(
            "https://api.themoviedb.org/3/genre/movie/list",
            {
                headers: { "Authorization": `Bearer ${process.env.API_KEY}` }
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
