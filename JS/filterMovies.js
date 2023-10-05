// movieFilter.js
export function filterMovies(genre, apiUrl, movieContainer)
{
    let filterUrl;

    if (genre)
    {
        filterUrl = `${apiUrl}/genre?genre=${genre}`;
    }
    else
    {
        filterUrl = apiUrl;
    }

    console.log(`Fetching from: ${filterUrl}`);  // For debugging

    // Clear the movie container
    movieContainer.innerHTML = '';

    fetch(filterUrl)
        .then(response => response.json())
        .then(movies =>
        {
            movies.forEach(movie =>
            {
                const movieCard = `
                    <div class="movie-card">
                        <img src="${movie.picture}" alt="${movie.title}">
                        <div class="movie-title">${movie.title}</div>
                        <div class="movie-period">playing dates: Date -> Date</div>
                        <button id="selectMovie" class="button-style" >Select movie <span id="arrow">&#8702</span></button>
                    </div>
                `;
                movieContainer.innerHTML += movieCard;

                movieContainer.addEventListener('click', function (event)
                {
                    const target = event.target;
                    //const movieId = target.getAttribute('data-movieid');

                    if (target.tagName === 'BUTTON' || target.tagName === 'IMG')
                    {
                        window.location.href = "https://cinemaxx.dk/koebenhavn/kommende-film";
                        //`somepage.html?movie=${movieId}`;
                    }
                });
            });
        })
        .catch(error => console.error("An error occurred:", error));
}
