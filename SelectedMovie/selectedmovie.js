async function fetchAnyUrl(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error("Fetch Error:", error);
        throw error;
    }
}


// Function to fetch a single movie by ID




async function fetchMovieById(movieid) {
    const apiUrl = `http://localhost:8080/selectedmovie/${movieid}`;

        const movieById = await fetchAnyUrl(apiUrl);
        return movieById;
}

async function fetchGenreById(movieid) {
    const apiUrl = `http://localhost:8080/genres/${movieid}`;

    const genreById = await fetchAnyUrl(apiUrl);
    return genreById;
}

async function fetchShowtimeById(movieid) {
    const apiUrl = `http://localhost:8080/showtimes/${movieid}`;

    const showtimesById = await fetchAnyUrl(apiUrl);
    return showtimesById;
}


async function getMovieGenres(genre)
{
    const apiUrl = `http://localhost:8080/genres/4`;
    const genresElement = document.getElementById("genre");

    try
    {
        const genres = await fetchAnyUrl(apiUrl);

        genres.forEach(genre => {genresElement.appendChild()})

    }
    catch (error){}
}

// Function to populate movie details into HTML
function populateMovieDetails(movie) {
    document.getElementById('movie-title').innerText = movie.title;
    document.getElementById('movie-picture').innerHTML = `<img src="${movie.picture}" alt="${movie.title}">`;
    document.getElementById('description').innerText = movie.description;

    document.getElementById('startDate').innerText = movie.startDate;
    document.getElementById('endDate').innerText = movie.endDate;
    document.getElementById('length').innerText = movie.length;


        `
        Genre: ${movie.genre} 
        Age Limit: ${movie.ageLimit}
        Length: ${movie.length} 
        Start Date: ${movie.startDate}
        End Date: ${movie.endDate}
    `;
}

// Initialize
document.addEventListener("DOMContentLoaded", async function () {
    try {
        const movieid = 4;  // Replace with the actual movie ID
        const movie = await fetchMovieById(movieid);
        if (movie) {
            populateMovieDetails(movie);
        }
    } catch (error) {
        console.error("Error fetching movie:", error);
    }
});
