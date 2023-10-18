import {createOption} from "../createOption.js";
import {fetchAnyUrl} from "../fetchAnyUrl.js";

// Asynchronous function to fetch genres and populate the dropdown
export async function fetchAndPopulateGenreDropdown()
{
    // ID matches with your HTML element's ID for the dropdown
    const dropdownElement = document.getElementById('movieFilter');

    // Your genres API endpoint
    const url = 'http://localhost:8080/genres';

    try
    {
        // Fetch genres using the existing fetch function
        const genres = await fetchAnyUrl(url);

        // Populate dropdown assuming each genre object has 'genre' and 'id'
        genres.forEach(genre =>
        {
            dropdownElement.appendChild(createOption(genre.type, genre.id));
        });
    }
    catch (error)
    {
        console.error("Error populating genres:", error);
    }
}