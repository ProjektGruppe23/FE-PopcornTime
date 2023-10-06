document.addEventListener("DOMContentLoaded", async function () {
    const selectedMovieUrl = "localhost:8080/selectedmovie/${movieid}";
    const bodyContainer = document.getElementById("body");

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

    bodyContainer.innerHTML = '';

    try {
        const movie = await fetchAnyUrl(selectedMovieUrl);

        const movieObj =
            {
                title: movie.title,
                description: movie.description,
                picture: movie.picture,
                start_date: movie.start_date,
                length: movie.length,
                end_date: movie.end_date,
                age_limit: movie.age_limit
            };

        const movieCard = `
        <div class="movie-card">
                <img src="${movie.picture}" alt="${movie.title}">
                <div class="movie-title">${movie.title}</div>
                <div class="movie-period">playing dates: ${movie.start_date} -> ${movie.end_date}</div>
                <button id="selectMovie" class="button-style" >Select movie <span id="arrow">&#8702</span></button>
            </div>
        `;

        bodyContainer.innerHTML = movieCard;

        return movieObj;

    } catch (error)
    {
        console.error("Error fetching movie", error);
    }

});