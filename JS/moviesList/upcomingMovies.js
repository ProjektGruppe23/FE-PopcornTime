import { fetchAndPopulateGenres } from './modules/populateGenres.js';
import { fetchAndDisplayMoviesByGenre } from './modules/fetchAndDisplayMoviesByGenre.js';
import { showLoadingScreen, hideLoadingScreen } from './modules/loadingScreen.js';

showLoadingScreen();

document.addEventListener("DOMContentLoaded", function ()
{
    // Replace this URL with your backend API URL
    const apiUrl = "http://localhost:8080/movies/upcoming";
    const movieContainer = document.getElementById('movie-container');

    fetchAndPopulateGenres();

    const dropdownElement = document.getElementById('movieFilter');
    dropdownElement.addEventListener('change', function() {
        const selectedGenreId = dropdownElement.value;
        showLoadingScreen(); // Show the loading screen
        fetchAndDisplayMoviesByGenre(selectedGenreId)
            .then(() => hideLoadingScreen());
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