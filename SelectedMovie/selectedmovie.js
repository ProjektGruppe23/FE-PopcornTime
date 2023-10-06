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
async function populateMovieDetails(movieid)
{
    const movie = await fetchAnyUrl(`http://localhost:8080/selectedmovie/${movieid}`);
    const showtimes = await fetchAnyUrl(`http://localhost:8080/showtimes/${movieid}`);
    const genres = await fetchAnyUrl(`http://localhost:8080/genres/${movieid}`);

    if (movie)
    {
        document.getElementById('title').innerText = movie.title;
        document.getElementById('picture').innerHTML = `<img src="${movie.picture}" alt="${movie.title}">`;
        document.getElementById('description').innerText = movie.description;

        // Additional movie details
        document.getElementById('startDate').innerText = `Start Date: ${new Date(movie.startDate).toLocaleDateString()}`;
        document.getElementById('endDate').innerText = `End Date: ${new Date(movie.endDate).toLocaleDateString()}`;
        document.getElementById('length').innerText = `Length: ${movie.length} mins`;
        document.getElementById('ageLimit').innerText = `Age Limit: ${movie.ageLimit}`;
    }
    else
    {
        console.error("No movie data found.");
        document.getElementById('title').innerText = 'Movie not found';
    }

    if (showtimes) {
        let showtimeHTML = "";
        showtimes.forEach(function(showtime) {
            showtimeHTML += `<div class="showtime">${showtime}</div>`;
        });
        document.getElementById('showtimes').innerHTML = showtimeHTML;
    }

    else
    {
        console.error("No showtime data found.");
        document.getElementById('showtimes').innerText = 'No showtimes available';
    }

    if (genres) {
        let genreHTML = "Genres: ";
        genres.forEach(function(genre) {
            genreHTML += `<span class="genre">${genre}</span>`;
        });
        document.getElementById('genres').innerHTML = genreHTML;
    }

    else
    {
        console.error("No genre data found.");
        document.getElementById('genres').innerText = 'No genres available';
    }
}

// Initialize
document.addEventListener("DOMContentLoaded", async function ()
{
    try
    {
        const movieid = 5;  // Replace with the actual movie ID
        await populateMovieDetails(movieid);
    }
    catch (error)
    {
        console.error("Error fetching movie:", error);
    }
});