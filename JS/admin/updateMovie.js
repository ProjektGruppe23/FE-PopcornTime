console.log("I am in updateMovie");

// Get buttons and input fields from HTML document and store them in variables
const btnPostMovie = document.getElementById("btnPostMovie");
const btnPutMovie = document.getElementById("btnPutMovie");
const btnDeleteMovie = document.getElementById("btnDeleteMovie");

document.getElementById("btnSaveChanges").addEventListener('click', () =>
{
    const updatedMovie = {
        id: document.getElementById("editId").value,
        ageLimit: {
            id: document.getElementById("editAgeLimitId").value
        },
        title: document.getElementById("editTitle").value,
        // Get other fields here
    };

    putMovie(updatedMovie);

    // Hide the modal
    document.getElementById("editMovieModal").classList.add("hidden");
});

document.getElementById("btnCloseModal").addEventListener('click', () =>
{
    document.getElementById("editMovieModal").classList.add("hidden");
});

// Base URL for the movie API
const movieApiBaseUrl = "http://localhost:8080/movie";

async function fetchAnyUrl(url)
{
    try
    {
        const response = await fetch(url);
        if (response.ok)
        {
            return await response.json();
        }
        else
        {
            return `Failed to fetch data: ${response.status} ${response.statusText}`;
        }
    }
    catch (error)
    {
        console.error("Fetch Error:", error);
        throw error;
    }
}

async function fetchMovies()
{
    try
    {
        const movies = await fetchAnyUrl("http://localhost:8080/movies");
        return movies;
    }
    catch (error)
    {
        console.error('Error fetching movies:', error);
        return [];
    }
}

function populateTable(movies)
{
    const table = document.getElementById('movieTable');
    movies.forEach((movie) =>
    {
        const row = table.insertRow();
        Object.values(movie).forEach((value) =>
        {
            const cell = row.insertCell();
            cell.textContent = value;
        });

        // Add edit and delete buttons inside a cell
        const actionCell = row.insertCell();
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => editMovie(movie));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteMovie(movie));

        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);
    });
}

function getMovie()
{
    const id = document.getElementById("inpId").value;
    const ageLimitId = document.getElementById("inpAgeLimitId").value;
    const title = document.getElementById("inpTitle").value;
    const description = document.getElementById("inpDescription").value;
    const startDate = document.getElementById("inpStartDate").value;
    const endDate = document.getElementById("inpEndDate").value;
    const length = document.getElementById("inpLength").value;
    const picture = document.getElementById("inpPicture").value;

    // Construct the movie object
    const movie = {
        id: id,
        ageLimit: {
            id: ageLimitId // Nested as requested
        },
        endDate: endDate,
        length: length,
        startDate: startDate,
        title: title,
        description: description,
        picture: picture
    };

    console.log(movie);
    return movie;
}

async function sendObjectAsJson(url, object, httpMethod = 'POST')
{
    try
    {
        const response = await fetch(url, {
            method: httpMethod,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(object)
        });

        if (response.ok)
        {
            return await handleSuccess(response);
        }
        else
        {
            return await handleServerError(response);
        }
    }
    catch (error)
    {
        handleFetchError(error);
    }
}

async function putMovie(movie)
{
    const putEndpoint = `${movieApiBaseUrl}/${movie.id}`;
    await sendObjectAsJson(putEndpoint, movie, "PUT");
    alert("Movie updated");
}

async function deleteMovie(movie)
{
    const deleteEndpoint = `${movieApiBaseUrl}/${movie.id}`;
    await sendObjectAsJson(deleteEndpoint, null, "DELETE");
    alert("Movie deleted");
    location.reload();  // This will reload the page
}


function editMovie(movie)
{
    document.getElementById("editId").value = movie.id;
    document.getElementById("editAgeLimitId").value = movie.ageLimit.id;
    document.getElementById("editTitle").value = movie.title;
    document.getElementById("editDescription").value = movie.description;
    document.getElementById("editStartDate").value = movie.startDate;
    document.getElementById("editEndDate").value = movie.endDate;
    document.getElementById("editPicture").value = movie.picture;
    document.getElementById("editLength").value = movie.length;


    // Show the modal (assuming the modal has a class "hidden" that sets display: none)
    document.getElementById("editMovieModal").classList.remove("hidden");
}


document.addEventListener('DOMContentLoaded', async () =>
{
    const movies = await fetchMovies();
    populateTable(movies);
});

// Add event listeners to buttons
btnPostMovie.addEventListener('click', () =>
{
    window.location.href = 'http://localhost:63342/FE-PopcornTime/HTML/createMovie.html';
});

//---------------------------------------------------------------
// Helper function to handle HTTP 2xx success codes
async function handleSuccess(response)
{
    return await response.json();
}

// Helper function to handle HTTP 4xx and 5xx errors
async function handleServerError(response)
{
    const responseData = await response.json();
    const errorMsg = `Server Error! Status: ${response.status}, Message: ${JSON.stringify(responseData)}`;
    alert(errorMsg);
    throw new Error(errorMsg);
}

// Helper function to handle network errors and other issues
function handleFetchError(error)
{
    console.error('Fetch Error:', error);
    alert('An unexpected error occurred. See console for details.');
    throw error;
}

//---------------------------------------------------------------


