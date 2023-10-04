document.addEventListener("DOMContentLoaded", function() {
    // Replace this URL with your backend API URL
    const apiUrl = "http://localhost:8080/movies/current";

    fetch(apiUrl)
        .then(response => response.json())
        .then(movies => {
            const movieContainer = document.getElementById('movie-container');

            movies.forEach(movie => {
                const movieCard = `
                    <div class="movie-card">
                        <img src="${movie.picture}" alt="${movie.title}">
                        <div class="movie-title">${movie.title}</div>
                        <button id="selectMovie" class="button-style" >select movie</button>
                    </div>
                `;
                movieContainer.innerHTML += movieCard;
            });
        })
        .catch(error => console.error("Error fetching movies:", error));
});