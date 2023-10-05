document.addEventListener("DOMContentLoaded", function ()
{
    // Replace this URL with your backend API URL
    const apiUrl = "http://localhost:8080/movies/current";
    const movieContainer = document.getElementById('movie-container');

    fetch(apiUrl)
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
        .catch(error => console.error("Error fetching movies:", error));
});