import {fetchAnyUrl} from "./fetchAnyUrl.js";

// Function to populate movie details into HTML
export async function populateMovieDetails(movieId)
{
    const movie = await fetchAnyUrl(`http://localhost:8080/movie/${movieId}`);
    const showtimes = await fetchAnyUrl(`http://localhost:8080/showtimes/${movieId}`);
    const genres = await fetchAnyUrl(`http://localhost:8080/genres/${movieId}`);

    if (movie)
    {
        document.getElementById('title').innerText = movie.title;
        document.getElementById('picture').innerHTML = `<img src="${movie.picture}" alt="${movie.title}">`;
        document.getElementById('description').innerText = movie.description;

        // Additional movie details
        document.getElementById('startDate').innerText = `Start Date: ${new Date(movie.startDate).toLocaleDateString()}`;
        document.getElementById('endDate').innerText = `End Date: ${new Date(movie.endDate).toLocaleDateString()}`;
        document.getElementById('length').innerText = `Length: ${movie.length} mins`;
        document.getElementById('ageLimit').innerText = `Age Limit: ${movie.ageLimit.age}`;


    }
    else
    {
        console.error("No movie data found.");
        document.getElementById('title').innerText = 'Movie not found';
    }

    if (showtimes)
    {
        let showtimeHTML = "";
        showtimes.forEach(function (showtime)
        {
            // Convert the showtime string to a Date object - because JSON converts dates to strings
            const date = new Date(showtime);

            // Extract components
            const day = date.getDate();  // Day of the month
            const month = date.getMonth() + 1;  // Months are zero-based
            const year = date.getFullYear();
            let minute = date.getMinutes();
            let hour = date.getHours();
            // assign an extra 0 if the minute or hour is less than 10 (so 19:00 instead of 19:0)
            minute = minute < 10 ? `0${minute}` : minute;
            hour = hour < 10 ? `0${hour}` : hour;

            // Construct formatted string
            const formattedShowtime = `${day}. ${month}. ${year} <br> <span style="font-size: larger; font-weight: bold;"> Time: ${hour}.${minute}</span>`;

            // Insert into HTML
            showtimeHTML += `<button class="showtime-button">${formattedShowtime}</button>`;
        });
        document.getElementById('showtimes').innerHTML = showtimeHTML;
    }

    else
    {
        console.error("No showtime data found.");
        document.getElementById('showtimes').innerText = 'No showtimes available';
    }

    if (genres)
    {
        let genreHTML = "Genres: ";
        genres.forEach(function (genre)
        {
            genreHTML += `<span class="genre">${genre}</span> `;
        });
        document.getElementById('genres').innerHTML = genreHTML;
    }

    else
    {
        console.error("No genre data found.");
        document.getElementById('genres').innerText = 'No genres available';
    }
}