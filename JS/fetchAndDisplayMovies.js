export async function fetchAndDisplayMovies(genre, apiUrl, movieContainer)
{
    const genreId = genre ? genreNameToId[genre] : null;
    const filterUrl = genreId ? `${apiUrl}/byGenre/${genreId}` : apiUrl;

    try
    {
        const response = await fetch(filterUrl, {mode: 'cors'});
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