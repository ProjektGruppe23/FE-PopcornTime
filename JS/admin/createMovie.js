import {sendObjectAsJson} from "../modules/admin/sendObjectAsJson.js";
import {fetchAndPopulateDropdown} from '../modules/populateDropdown.js';

const movieApiBaseUrl = "http://localhost:8080/createMovie";

// Function to gather movie data from the form
function getMovie() {
    return {
        ageLimit: {
            id: document.getElementById("inpAgeLimitId").value
        },
        title: document.getElementById("inpTitle").value,
        description: document.getElementById("inpDescription").value,
        startDate: document.getElementById("inpStartDate").value,
        endDate: document.getElementById("inpEndDate").value,
        picture: document.getElementById("inpPicture").value,
        length: document.getElementById("inpLength").value
    };
}

// Function to post a new movie
async function postMovie(movie) {
    const postEndpoint = `${movieApiBaseUrl}`;
    console.log("Sending Movie Data: ", movie); // Debugging line
    await sendObjectAsJson(postEndpoint, movie, "POST");
    alert("Movie saved");
}

// Event listener for the "Create New Movie" button
document.getElementById("btnPostMovie").addEventListener('click', async () => {
    const movie = getMovie();
    try {
        await postMovie(movie);
    } catch (error) {
        alert("Error posting movie: " + error);
    }
});

document.addEventListener('DOMContentLoaded', async () => {
    await fetchAndPopulateDropdown('inpAgeLimitId', 'http://localhost:8080/ageLimits', 'age', 'id');
});
