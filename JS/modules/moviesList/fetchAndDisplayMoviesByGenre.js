import {fetchAnyUrl} from "../fetchAnyUrl.js";

export async function fetchAndDisplayMoviesByGenre(genreId, populateMovieCard)
{
    const apiUrl = `http://localhost:8080/movies/${genreId}`;

    try
    {
        const movies = await fetchAnyUrl(apiUrl);
        movies.forEach(populateMovieCard);
    }
    catch (error)
    {
        console.error("Error fetching movies:", error);
        throw error;
    }
}