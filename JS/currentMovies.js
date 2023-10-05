// This function now handles both fetching and DOM manipulation
async function fetchAndDisplayMovies(genre, apiUrl, movieContainer)
{
    let filterUrl = genre ? `${apiUrl}/genre?genre=${genre}` : apiUrl;

    try
    {
        const response = await fetch(filterUrl);
        const movies = await response.json();

        movieContainer.innerHTML = '';

        movies.forEach(movie =>
        {
            const movieCard = `
                <div class="movie-card" data-movieid="${movie.id}">
                    <img src="${movie.picture}" alt="${movie.title}">
                    <div class="movie-title">${movie.title}</div>
                    <div class="movie-period">playing dates: Date -> Date</div>
                    <button class="button-style">Select movie <span id="arrow">&#8702</span></button>
                </div>`;
            movieContainer.innerHTML += movieCard;
        });

    }
    catch (error)
    {
        console.error("An error occurred:", error);
        movieContainer.innerHTML = '<div class="error">An error occurred while fetching data.</div>';
    }
}

document.addEventListener("DOMContentLoaded", function ()
{
    const apiUrl = "http://localhost:8080/movies/current";
    const movieContainer = document.getElementById('movie-container');
    const movieFilter = document.getElementById('movieFilter');

    fetchAndDisplayMovies(null, apiUrl, movieContainer);

    movieFilter.addEventListener('change', function ()
    {
        const genre = this.value !== "Filter" ? this.value : null;
        fetchAndDisplayMovies(genre, apiUrl, movieContainer);
    });

    movieContainer.addEventListener('click', function (event)
    {
        const target = event.target.closest('.movie-card');
        if (target)
        {
            window.location.href = `https://cinemaxx.dk/koebenhavn/kommende-film`;
        }
    });
});
