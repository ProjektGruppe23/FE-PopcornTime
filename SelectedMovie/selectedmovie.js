// Function to fetch a single movie by ID
async function fetchMovieById(movieid) {
    const apiUrl = `http://localhost:8080/selectedmovie/${movieid}`;
    try {
        const response = await fetch(apiUrl);
        if (response.ok) {
            return await response.json();
        } else {
            console.error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error("Fetch Error:", error);
    }
}

// Function to populate movie details into HTML
function populateMovieDetails(movie) {
    document.getElementById('movie-title').innerText = movie.title;
    document.getElementById('movie-picture').innerHTML = `<img src="${movie.picture}" alt="${movie.title}">`;
    document.getElementById('description').innerText = movie.description;

    document.getElementById('movie-details').innerText = `
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
