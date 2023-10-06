// Generic function to fetch data from any URL
async function fetchAnyUrl(apiUrl)
{
    const response = await fetch(apiUrl);
    if (response.ok)
    {
        return await response.json();
    }
    else
    {
        console.error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        return null;
    }
}

// Function to populate movie details into HTML
async function populateMovieDetails(movieId)
{
    const movie = await fetchAnyUrl(`http://localhost:8080/movie/${movieId}`);
    const showtimes = await fetchAnyUrl(`http://localhost:8080/showtimes/${movieId}`);
    const genres = await fetchAnyUrl(`http://localhost:8080/genres/${movieId}`);

    if (movie)
    {
        document.getElementById('title').innerText = movie.title;
        document.getElementById('picture').innerHTML = `<img src="${movie.picture}" alt="${movie.title}">`;
        document.getElementById('description').innerText = movie.description;

        // Additional movie details
        document.getElementById('startDate').innerText = `Start Date: ${new Date(movie.startDate).toLocaleDateString()}`;
        document.getElementById('endDate').innerText = `End Date: ${new Date(movie.endDate).toLocaleDateString()}`;
        document.getElementById('length').innerText = `Length: ${movie.length} mins`;
        document.getElementById('ageLimit').innerText = `Age Limit: ${movie.ageLimit.age}`;


    }
    else
    {
        console.error("No movie data found.");
        document.getElementById('title').innerText = 'Movie not found';
    }

    if (showtimes)
    {
        let showtimeHTML = "";
        showtimes.forEach(function (showtime)
        {
            // Convert the showtime string to a Date object - because JSON converts dates to strings
            const date = new Date(showtime);

            // Extract components
            const day = date.getDate();  // Day of the month
            const month = date.getMonth() + 1;  // Months are zero-based
            const year = date.getFullYear();
            let minute = date.getMinutes();
            let hour = date.getHours();
            // assign an extra 0 if the minute or hour is less than 10 (so 19:00 instead of 19:0)
            minute = minute < 10 ? `0${minute}` : minute;
            hour = hour < 10 ? `0${hour}` : hour;

            // Construct formatted string
            const formattedShowtime = `${day}. ${month}. ${year} <br> <span style="font-size: larger; font-weight: bold;"> Time: ${hour}.${minute}</span>`;

            // Insert into HTML
            showtimeHTML += `<button class="showtime-button">${formattedShowtime}</button>`;
        });
        document.getElementById('showtimes').innerHTML = showtimeHTML;
    }

    else
    {
        console.error("No showtime data found.");
        document.getElementById('showtimes').innerText = 'No showtimes available';
    }

    if (genres)
    {
        let genreHTML = "Genres: ";
        genres.forEach(function (genre)
        {
            genreHTML += `<span class="genre">${genre}</span> `;
        });
        document.getElementById('genres').innerHTML = genreHTML;
    }

    else
    {
        console.error("No genre data found.");
        document.getElementById('genres').innerText = 'No genres available';
    }
}

const showtimes = document.getElementById('showtimes');

const handleShowtimeClick = (event) =>
{
    const target = event.target;
    // const movieId = target.getAttribute('data-movieId');

    if (target.tagName === 'BUTTON')
    {
        window.location.href = "https://cinemaxx.dk/koebenhavn/kommende-film";
        // `somepage.html?movie=${movieId}`;
    }
};

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
            showtimes.addEventListener('click', handleShowtimeClick);
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
