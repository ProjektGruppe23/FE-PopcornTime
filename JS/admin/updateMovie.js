console.log("I am in updateMovie");

// Get buttons and input fields from HTML document and store them in variables
const btnPostMovie = document.getElementById("btnPostMovie");

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
    await sendObjectAsJson(putEndpoint, movie, "PUT");
    alert("Movie updated");
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


