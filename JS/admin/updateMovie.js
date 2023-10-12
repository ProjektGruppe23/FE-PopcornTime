console.log("I am in updateMovie");

// Get buttons and input fields from HTML document and store them in variables
const btnPostMovie = document.getElementById("btnPostMovie");
const btnPutMovie = document.getElementById("btnPutMovie");
const btnDeleteMovie = document.getElementById("btnDeleteMovie");

// Base URL for the movie API
const movieApiBaseUrl = "http://localhost:8080/movie";

async function fetchAnyUrl(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            return await response.json();
        } else {
            return `Failed to fetch data: ${response.status} ${response.statusText}`;
        }
    } catch (error) {
        console.error("Fetch Error:", error);
        throw error;
    }
}

async function fetchMovies() {
    const movies = await fetchAnyUrl("http://localhost:8080/movies");
    if (typeof movies === "string") {
        console.error(movies);
        return [];
    }
    return movies;
}

function populateTable(movies) {
    const table = document.getElementById('movieTable');
    movies.forEach((movie) => {
        const row = table.insertRow();
        Object.values(movie).forEach((value) => {
            const cell = row.insertCell();
            cell.textContent = value;
        });

        // Add edit and delete buttons
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => editMovie(movie));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteMovie(movie));

        row.appendChild(editButton);
        row.appendChild(deleteButton);
    });
}

function getMovie() {
    // Your existing getMovie function
    // ...
}

async function sendObjectAsJson(url, object, httpMethod = 'POST') {
    // Your existing sendObjectAsJson function
    // ...
}

async function postMovie() {
    // Your existing postMovie function
    // ...
}

async function putMovie() {
    // Your existing putMovie function
    // ...
}

async function deleteMovie(movie) {
    const deleteEndpoint = `${movieApiBaseUrl}/${movie.id}`;
    await sendObjectAsJson(deleteEndpoint, movie, "DELETE");
    alert("Movie deleted");
    // Refresh table or remove row from DOM
}

function editMovie(movie) {
    // Populate a form or modal with movie data
    // Show the form or modal
    // Save button on the modal calls putMovie() with updated values
}

document.addEventListener('DOMContentLoaded', async () => {
    const movies = await fetchMovies();
    populateTable(movies);
});

// Add event listeners to buttons
btnPostMovie.addEventListener('click', postMovie);
btnPutMovie.addEventListener('click', putMovie);
btnDeleteMovie.addEventListener('click', deleteMovie);
