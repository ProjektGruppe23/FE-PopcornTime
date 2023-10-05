import {fetchAndDisplayMovies} from "./fetchAndDisplayMovies.js";
import {filterMovies} from "./filterMovies.js";
import {populateGenres} from "./populateGenres.js";

document.addEventListener("DOMContentLoaded", function ()
{
    const apiUrl = "http://localhost:8080/movies/current";
    const movieContainer = document.getElementById('movie-container');
    const movieFilter = document.getElementById('movieFilter');

    // Populate genres when DOM is fully loaded
    populateGenres();

    // Initially fetch all movies
    fetchAndDisplayMovies(null, apiUrl, movieContainer);

    // Event listener for filtering movies by genre
    movieFilter.addEventListener('change', function ()
    {
        const genre = this.value !== "Filter" ? this.value : null;

        // Filter movies based on selected genre
        filterMovies(genre, apiUrl, movieContainer);
    });

    // Event listener for clicking on a movie card
    movieContainer.addEventListener('click', function (event)
    {
        const target = event.target.closest('.movie-card');
        if (target)
        {
            window.location.href = `https://cinemaxx.dk/koebenhavn/kommende-film`;
        }
    });
});