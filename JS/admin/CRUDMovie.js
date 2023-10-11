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
    const ageLimit = document.getElementById("inpAgeLimit").value;
    const title = document.getElementById("inpTitle").value;
    const description = document.getElementById("inpDescription").value;
    const startDate = document.getElementById("inpStartDate").value;
    const endDate = document.getElementById("inpEndDate").value;
    const length = document.getElementById("inpLength").value;

    // Construct the movie object
    const movie = {
        ageLimit: {
            ageLimit: ageLimit // Nested as requested
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
async function sendObjectAsJson(url, object, httpMethod = 'POST')
{
    const response = await fetch(url, {
        method: httpMethod,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(object)
    });

    if (!response.ok)
    {
        throw new Error('Something went wrong!');
    }

    return await response.json();
}

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