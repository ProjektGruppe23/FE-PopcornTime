console.log("I am in selectedmovie")

function fetchMovieDetails()
{
    const movieId = document.getElementById("movieId").value;
    const  movieDetailsDiv = document.getElementById("movieDetailsdiv");

    fetch('/selectedmovie/${movieId}')
        .then(response => response.json())
        .then(data =>
        {
            if (data)
            {
                const movieDetailsdivHTML = `
                <h2>${data.title}</h2>
                <p>Start Date: ${data.startDate}</p>
                <p>End Date: ${data.endDate}</p>
                <p>Length: ${data.length}</p>
                <p>Age Limit: ${data.ageLimit.name}</p>
                <h3>Genres:</h3>
                <ul>
                    ${data.movieGenres.map(movieGenre => `<li>${movieGenre.genre.name}</li>`).join('')}
                </ul>
                <h3>Showtimes:</h3>
                <ul>
                    ${data.showtimes.map(showtime => `<li>${showtime.startTime}</li>`).join('')}
                </ul>`;
                movieDetailsdiv.innerHTML = movieDetailsdivHTML;
            }
            else
            {
                movieDetailsDiv.innerHTML ="<p>Movie not found</p>";
            }
        })
        .catch(error =>
        {
            console.error("Error:", error);
        });
}