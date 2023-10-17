import {sendObjectAsJson} from "../modules/admin/sendObjectAsJson.js"; // has error handling
import {getMovie} from "../modules/admin/getMovie.js";

console.log("I am in createMovie");

const btnPostMovie = document.getElementById("btnPostMovie");

const movieApiBaseUrl = "http://localhost:8080/movie";

// POST movie to server
async function postMovie()
{
    const movie = getMovie();
    const postEndpoint = `${movieApiBaseUrl}`;
    await sendObjectAsJson(postEndpoint, movie, "POST");
    alert("Movie saved");
}

// Add event listeners to buttons
btnPostMovie.addEventListener('click', postMovie);