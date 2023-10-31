export const clearMovieContainer = (container) => {
    container.innerHTML = '';
};

const movieContainer = document.getElementById('movie-container');

export const populateMovieCard = (movie) =>
{
    const movieCard = `
        <div class="movie-card">
            <img data-movieId="${movie.id}" src="${movie.picture}" alt="${movie.title}">
            <div class="movie-title">${movie.title}</div>
            <div class="movie-period">Runtime: ${movie.length} minutes</div>
            <button data-movieId="${movie.id}" data-ageLimit="${movie.ageLimitForDisplay}" class="button-style">Select movie</button>
        </div>
    `;
    movieContainer.innerHTML += movieCard;
};
