import {fetchAndPopulateDropdown} from "../modules/populateDropdown.js";
import {sendObjectAsJson} from "../modules/admin/sendObjectAsJson.js";
import {fetchAnyUrl} from "../modules/fetchAnyUrl.js";

console.log("I am in updateMovie");

// Get buttons and input fields from HTML document and store them in variables
const btnPostMovie = document.getElementById("btnPostMovie");

// Base URL for the movie API
const movieApiBaseUrl = "http://localhost:8080/putMovie";

document.getElementById("btnSaveChanges").addEventListener('click', () =>
{
    const updatedMovie = {
        id: document.getElementById("editId").value,
        ageLimit: {
            id: document.getElementById("editAgeLimitId").value
        },
        title: document.getElementById("editTitle").value,
        description: document.getElementById("editDescription").value,
        startDate: document.getElementById("editStartDate").value,
        endDate: document.getElementById("editEndDate").value,
        picture: document.getElementById("editPicture").value,
        length: document.getElementById("editLength").value

    };

    putMovie(updatedMovie);

    // Hide the modal
    document.getElementById("editMovieModal").classList.add("hidden");
});

document.getElementById("btnCloseModal").addEventListener('click', () =>
{
    document.getElementById("editMovieModal").classList.add("hidden");
});

async function editMovie(movie)
{
    console.log(movie)
    document.getElementById("editId").value = movie.id;
    document.getElementById("editAgeLimitId").value = movie.ageLimit.id;
    document.getElementById("editTitle").value = movie.title;
    document.getElementById("editDescription").value = movie.description;
    document.getElementById("editStartDate").value = movie.startDate;
    document.getElementById("editEndDate").value = movie.endDate;
    document.getElementById("editPicture").value = movie.picture;
    document.getElementById("editLength").value = movie.length;

    document.getElementById("editMovieModal").classList.remove("hidden");
}

async function putMovie(movie)
{
    const putEndpoint = `${movieApiBaseUrl}/${movie.id}`;
    console.log("Updating Movie Data: ", movie); // Debugging line
    await sendObjectAsJson(putEndpoint, movie, "PUT");
    alert("Movie updated");
}

async function fetchMovies()
{
    try
    {
        return await fetchAnyUrl("http://localhost:8080/movies");
    }
    catch (error)
    {
        console.error('Error fetching movies:', error);
        return [];
    }
}

function populateTable(movies) {
    const table = document.getElementById('movieTable');
    movies.forEach((movie) => {
        const row = table.insertRow();

        const titleCell = row.insertCell();
        titleCell.textContent = movie.title;

        const idCell = row.insertCell();
        idCell.textContent = movie.id;

        const startDateCell = row.insertCell();
        startDateCell.textContent = movie.startDate;

        const endDateCell = row.insertCell();
        endDateCell.textContent = movie.endDate;

        const actionCell = row.insertCell();
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => editMovie(movie));

        actionCell.appendChild(editButton);
    });
}


document.addEventListener('DOMContentLoaded', async () =>
{
    await fetchAndPopulateDropdown('editAgeLimitId', 'http://localhost:8080/ageLimits', 'age', 'id');

    const movies = await fetchMovies();
    populateTable(movies);
});

// Add event listeners to buttons
btnPostMovie.addEventListener('click', () =>
{
    window.location.href = 'http://localhost:63342/FE-PopcornTime/HTML/createMovie.html';
});

