console.log("I am in movieCrud");

// Get buttons and input fields from HTML document and store them in variables
const btnPostMovie = document.getElementById("btnPostMovie");
const btnPutMovie = document.getElementById("btnPutMovie");
const btnDeleteMovie = document.getElementById("btnDeleteMovie");

// Base URL for the movie API
const movieApiBaseUrl = "http://localhost:8080/movie";

// Create movie object based on the form input values
function getMovie()
{
    const id = document.getElementById("inpId").value;
    const ageLimitId = document.getElementById("inpAgeLimitId").value;
    const title = document.getElementById("inpTitle").value;
    const description = document.getElementById("inpDescription").value;
    const startDate = document.getElementById("inpStartDate").value;
    const endDate = document.getElementById("inpEndDate").value;
    const length = document.getElementById("inpLength").value;

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
        description: description
    };

    console.log(movie);
    return movie;
}

// Generic function to send object as JSON
async function sendObjectAsJson(url, object, httpMethod = 'POST') {
    try {
        const response = await fetch(url, {
            method: httpMethod,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(object)
        });

        if (response.ok) {
            return await handleSuccess(response);
        } else {
            return await handleServerError(response);
        }
    } catch (error) {
        handleFetchError(error);
    }
}

//---------------------------------------------------------------
// Helper function to handle HTTP 2xx success codes
async function handleSuccess(response) {
    return await response.json();
}

// Helper function to handle HTTP 4xx and 5xx errors
async function handleServerError(response) {
    const responseData = await response.json();
    const errorMsg = `Server Error! Status: ${response.status}, Message: ${JSON.stringify(responseData)}`;
    alert(errorMsg);
    throw new Error(errorMsg);
}

// Helper function to handle network errors and other issues
function handleFetchError(error) {
    console.error('Fetch Error:', error);
    alert('An unexpected error occurred. See console for details.');
    throw error;
}
//---------------------------------------------------------------

// POST movie to server
async function postMovie()
{
    const movie = getMovie();
    const postEndpoint = `${movieApiBaseUrl}`;
    await sendObjectAsJson(postEndpoint, movie, "POST");
    alert("Movie saved");
}

// PUT movie to server
async function putMovie()
{
    const movie = getMovie();
    const putEndpoint = `${movieApiBaseUrl}/${movie.id}`;
    await sendObjectAsJson(putEndpoint, movie, "PUT");
    alert("Movie updated");
}

// DELETE movie from server
async function deleteMovie()
{
    const movie = getMovie();
    const deleteEndpoint = `${movieApiBaseUrl}/${movie.id}`;
    await sendObjectAsJson(deleteEndpoint, movie, "DELETE");
    alert("Movie deleted");
}

// Add event listeners to buttons
btnPostMovie.addEventListener('click', postMovie);
btnPutMovie.addEventListener('click', putMovie);
btnDeleteMovie.addEventListener('click', deleteMovie);