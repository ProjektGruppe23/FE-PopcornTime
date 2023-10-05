export async function populateGenres()
{
    const genreDropdown = document.getElementById('movieFilter');
    const response = await fetch('http://localhost:8080/genres');
    const genres = await response.json();
    genres.forEach(genre =>
    {
        const option = document.createElement('option');
        option.value = genre.id;
        option.text = genre.name;
        genreDropdown.add(option);
    });
}
