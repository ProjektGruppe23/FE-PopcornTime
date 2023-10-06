export async function fetchAndDisplayMoviesByGenre(genreId, populateMovieCard) {
    const apiUrl = `http://localhost:8080/movies/${genreId}`;

    async function fetchAnyUrl(url) {
        try {
            const response = await fetch(url);
            if (response.ok) {
                return await response.json();
            } else {
                return `Failed to fetch data: ${response.status} ${response.statusText}`;
            }
        } catch (error) {
            console.error("Fetch Error:", error);
            throw error;
        }
    }

    try {
        const movies = await fetchAnyUrl(apiUrl);
        movies.forEach(populateMovieCard);
    } catch (error) {
        console.error("Error fetching movies:", error);
        throw error;
    }
}

// CODE BELOW HAS BEEN REFACTORED TO CODE ABOVE

// export async function fetchAndDisplayMoviesByGenre(genreId) {
//     const apiUrl = `http://localhost:8080/movies/${genreId}`;
//     const movieContainer = document.getElementById('movie-container');
//
//     async function fetchAnyUrl(url) {
//         try {
//             const response = await fetch(url);
//             if (response.ok) {
//                 return await response.json();
//             } else {
//                 throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
//             }
//         } catch (error) {
//             console.error("Fetch Error:", error);
//             throw error;
//         }
//     }
//
//     // Clear existing movies
//     movieContainer.innerHTML = '';
//
//     try {
//         const movies = await fetchAnyUrl(apiUrl);  // Assuming fetchAnyUrl is your existing fetch function
//
//         // Populate movies
//         movies.forEach(movie =>
//         {
//             const movieCard = `
//                     <div class="movie-card">
//                         <img src="${movie.picture}" alt="${movie.title}">
//                         <div class="movie-title">${movie.title}</div>
//                         <div class="movie-period">playing dates: Date -> Date</div>
//                         <button id="selectMovie" class="button-style" >Select movie <span id="arrow">&#8702</span></button>
//                     </div>
//                 `;
//             movieContainer.innerHTML += movieCard;
//
//             movieContainer.addEventListener('click', function (event)
//             {
//                 const target = event.target;
//                 //const movieId = target.getAttribute('data-movieid');
//
//                 if (target.tagName === 'BUTTON' || target.tagName === 'IMG')
//                 {
//                     window.location.href = "https://cinemaxx.dk/koebenhavn/kommende-film";
//                     //`somepage.html?movie=${movieId}`;
//                 }
//             });
//         });
//     } catch(error) {
//         console.error("Error fetching movies:", error);
//     }
// }