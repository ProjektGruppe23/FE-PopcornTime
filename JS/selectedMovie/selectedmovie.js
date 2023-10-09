import {populateMovieDetails} from "./modules/populateMovieDetail.js";
import {handleClickEvent} from "./modules/handleClickEvent.js";

const showtimes = document.getElementById('showtimes');

// Initialize
document.addEventListener("DOMContentLoaded", async function ()
{
    try
    {
        const urlParams = new URLSearchParams(window.location.search);
        const movieId = urlParams.get('movieId');
        console.log(`Fetched movie ID from URL: ${movieId}`);  // Debugging line
        if (movieId)
        {
            await populateMovieDetails(movieId);
            showtimes.addEventListener('click', handleClickEvent);
        }
        else
        {
            console.error("No movieId found in URL");
        }
    }
    catch (error)
    {
        console.error("Error fetching movie:", error);
    }
});
