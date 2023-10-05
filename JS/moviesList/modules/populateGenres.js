function createOption(text, value)
{
    console.log("Opretter dropdown element med tekst: " + text + " og værdi: " + value);
    // Opretter et tomt option HTML-element med tekst og værdi.
    const option = document.createElement('option');
    option.text = text;
    option.value = value;
    return option;
}

// Event listener for when the document content is fully loaded
// --> document.addEventListener('DOMContentLoaded', fetchAndPopulateGenres); No necessary as I call the dom in the movies class.

// Function to fetch any URL and return JSON data
async function fetchAnyUrl(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error("Fetch Error:", error);
        throw error;
    }
}

// Asynchronous function to fetch genres and populate the dropdown
export async function fetchAndPopulateGenres() {
    // ID matches with your HTML element's ID for the dropdown
    const dropdownElement = document.getElementById('movieFilter');

    // Your genres API endpoint
    const url = 'http://localhost:8080/genres';

    try {
        // Fetch genres using the existing fetch function
        const genres = await fetchAnyUrl(url);

        // Populate dropdown assuming each genre object has 'genre' and 'id'
        genres.forEach(genre => {
            dropdownElement.appendChild(createOption(genre.type, genre.id));
        });

    } catch (error) {
        console.error("Error populating genres:", error);
    }


}