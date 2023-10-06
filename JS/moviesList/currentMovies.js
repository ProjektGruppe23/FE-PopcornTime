import { fetchAndPopulateGenres } from './modules/populateGenres.js';
import { fetchAndDisplayMoviesByGenre } from './modules/fetchAndDisplayMoviesByGenre.js';

// Loading screen functions

function showLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.style.display = 'flex'; // Show the loading screen
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.style.display = 'none'; // Hide the loading screen
}

showLoadingScreen();

document.addEventListener("DOMContentLoaded", function ()
{
    // Replace this URL with your backend API URL
    const apiUrl = "http://localhost:8080/movies/current";
    const movieContainer = document.getElementById('movie-container');

    fetchAndPopulateGenres();

    const dropdownElement = document.getElementById('movieFilter');
    dropdownElement.addEventListener('change', function() {
        const selectedGenreId = dropdownElement.value;
        showLoadingScreen(); // Show the loading screen
        fetchAndDisplayMoviesByGenre(selectedGenreId)
            .then(() => hideLoadingScreen()); // Hide the loading screen
    });

    fetch(apiUrl)
        .then(response => response.json())
        .then(movies =>
        {
            hideLoadingScreen();
            movies.forEach(movie =>
            {
                const movieCard = `
                    <div class="movie-card">
                        <img src="${movie.picture}" alt="${movie.title}">
                        <div class="movie-title">${movie.title}</div>
                        <div class="movie-period">playing dates: Date -> Date</div>
                        <button id="selectMovie" class="button-style" >Select movie <span id="arrow">&#8702</span></button>
                    </div>
                `;
                movieContainer.innerHTML += movieCard;

                movieContainer.addEventListener('click', function (event)
                {
                    const target = event.target;
                    //const movieId = target.getAttribute('data-movieid');

                    if (target.tagName === 'BUTTON' || target.tagName === 'IMG')
                    {
                        window.location.href = "https://cinemaxx.dk/koebenhavn/kommende-film";
                        //`somepage.html?movie=${movieId}`;
                    }
                });
            });
        })
        .catch(error => console.error("Error fetching movies:", error));
});