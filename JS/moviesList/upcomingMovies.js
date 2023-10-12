import {fetchAndPopulateGenres} from './modules/populateGenres.js';
import {fetchAndDisplayMoviesByGenre} from './modules/fetchAndDisplayMoviesByGenre.js';
import {hideLoadingScreen, showLoadingScreen} from './modules/loadingScreen.js';

const apiUrl = "http://localhost:8080/movies/upcoming";
const movieContainer = document.getElementById('movie-container');
const dropdownElement = document.getElementById('movieFilter');

const clearMovieContainer = () =>
{
    movieContainer.innerHTML = '';
};

const populateMovieCard = (movie) =>
{
    const movieCard = `
        <div class="movie-card">
            <img data-movieId="${movie.id}" data-ageLimit="${movie.ageLimit.age}" src="${movie.picture}" alt="${movie.title}">
            <div class="movie-title">${movie.title}</div>
            <div class="movie-period">Age Limit: ${movie.ageLimit.age}</div>
            <button data-movieId="${movie.id}" data-ageLimit="${movie.ageLimit.age}" id="selectMovie" class="button-style">Select movie</button>
        </div>
    `;
    movieContainer.innerHTML += movieCard;
};

const handleMovieCardClick = (event) =>
{
    const target = event.target;
    const movieId = target.getAttribute('data-movieId'); // from the movieCards
    const ageLimit = target.getAttribute('data-ageLimit');
    console.log(`movieId from clicked element: ${movieId}`);  // Debugging line

    if (movieId && (target.tagName === 'BUTTON' || target.tagName === 'IMG'))
    {
        const popup = document.getElementById('movie-popup');
        popup.style.display = 'block';
        const ageLimitPlaceholder = document.getElementById('age-limit-placeholder');
        ageLimitPlaceholder.textContent = ageLimit;

        const confirmSelectionButton = document.getElementById('confirm-selection');
        confirmSelectionButton.addEventListener('click', () =>
        {
            const url = `http://localhost:63342/FE-PopcornTime/HTML/selectedmovie.html?movieId=${movieId}`;
            console.log(`Redirecting to URL: ${url}`);  // Debugging line
            window.location.href = url;

            closePopup();
        });
    }
    else
    {
        console.log(`Element clicked does not have a movieId or is not a button or image`);
    }
};

// Popup functions
const closePopup = () =>
{
    const popup = document.getElementById('movie-popup');
    popup.style.display = 'none';
};

const closePopupButton = document.getElementById('close-popup');
if (closePopupButton)
{
    closePopupButton.addEventListener('click', closePopup);
}

showLoadingScreen();

document.addEventListener("DOMContentLoaded", async function ()
{
    fetchAndPopulateGenres();

    dropdownElement.addEventListener('change', async () =>
    {
        const selectedGenreId = dropdownElement.value;
        showLoadingScreen();
        clearMovieContainer();

        try
        {
            await fetchAndDisplayMoviesByGenre(selectedGenreId, populateMovieCard);
        }
        catch (error)
        {
            console.error("Error fetching movies:", error);
        }
        finally
        {
            hideLoadingScreen();
        }
    });

    try
    {
        const movies = await fetch(apiUrl).then((response) => response.json());
        clearMovieContainer();
        movies.forEach(populateMovieCard);
        movieContainer.addEventListener('click', handleMovieCardClick);
    }
    catch (error)
    {
        console.error("Error fetching movies:", error);
    }
    finally
    {
        hideLoadingScreen();
    }
});

// import { fetchAndPopulateGenres } from './modules/populateGenres.js';
// import { fetchAndDisplayMoviesByGenre } from './modules/fetchAndDisplayMoviesByGenre.js';
// import { showLoadingScreen, hideLoadingScreen } from './modules/loadingScreen.js';
//
// showLoadingScreen();
//
// document.addEventListener("DOMContentLoaded", function ()
// {
//     // Replace this URL with your backend API URL
//     const apiUrl = "http://localhost:8080/movies/upcoming";
//     const movieContainer = document.getElementById('movie-container');
//
//     fetchAndPopulateGenres();
//
//     const dropdownElement = document.getElementById('movieFilter');
//     dropdownElement.addEventListener('change', function() {
//         const selectedGenreId = dropdownElement.value;
//         showLoadingScreen(); // Show the loading screen
//         fetchAndDisplayMoviesByGenre(selectedGenreId)
//             .then(() => hideLoadingScreen());
//     });
//
//     fetch(apiUrl)
//         .then(response => response.json())
//         .then(movies =>
//         {
//             hideLoadingScreen();
//             movies.forEach(movie =>
//             {
//                 const movieCard = `
//                     <div class="movie-card">
//                         <img src="${movie.picture}" alt="${movie.title}">
//                         <div class="movie-title">${movie.title}</div>
//                         <div class="movie-period">playing dates: Date -> Date</div>
//                         <button id="selectMovie" class="button-style" >Select movie <span id="arrow">&#8702</span></button>
//                     </div>
//                 `;
//                 movieContainer.innerHTML += movieCard;
//
//                 movieContainer.addEventListener('click', function (event)
//                 {
//                     const target = event.target;
//                     //const movieId = target.getAttribute('data-movieid');
//
//                     if (target.tagName === 'BUTTON' || target.tagName === 'IMG')
//                     {
//                         window.location.href = "https://cinemaxx.dk/koebenhavn/kommende-film";
//                         //`somepage.html?movie=${movieId}`;
//                     }
//                 });
//             });
//         })
//         .catch(error => console.error("Error fetching movies:", error));
// });