let clickedSeatIds = new Set();

function getSeatId() {
    const seatId = this.id;
    console.log(seatId);
}

function changeSeatStatusToSelected() {
    this.classList.add('selected');
    this.addEventListener('click', changeSelectedSeatStatusToAvailable);
    const seatId = this.id;
    clickedSeatIds.add(seatId);
    console.log(Array.from(clickedSeatIds));
    countSelectedSeats();
}

function changeSelectedSeatStatusToAvailable() {
    this.classList.remove('selected');
    this.removeEventListener('click', changeSelectedSeatStatusToAvailable);
    this.addEventListener('click', changeSeatStatusToSelected);
    const seatId = this.id;
    clickedSeatIds.delete(seatId);
    console.log(Array.from(clickedSeatIds));
    countSelectedSeats();
}

function createSeats(rows, seatsPerRow) {
    const container = document.querySelector('.container');
    let seatCount = 0;

    for (let i = 1; i <= rows; i++) {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('row');

        for (let j = 1; j <= seatsPerRow; j++) {
            const seatDiv = document.createElement('div');
            seatDiv.classList.add('seat');
            seatCount++;
            seatDiv.id = seatCount.toString();
            seatDiv.addEventListener('click', getSeatId);
            seatDiv.addEventListener('click', changeSeatStatusToSelected);
            rowDiv.appendChild(seatDiv);
        }
        container.appendChild(rowDiv);
    }
}

function fetchBookedSeats(showtime_Id) {
    fetch(`http://localhost:8080/getBookedSeats/${showtime_Id}`)
        .then(response => response.json())
        .then(data => {
            data.forEach(bookedSeat => {
                const seatElement = document.getElementById(bookedSeat.id.toString());
                if (seatElement) {
                    seatElement.classList.add('booked');
                    seatElement.removeEventListener('click', changeSeatStatusToSelected);
                    const theatreId = fetchShowtime(showtime_Id);
                    getSeatsFromSelectedTheatre(theatreId);
                }
            });
        })
        .catch(error => {
            console.log(error);
        });
}


/*function fetchMovieDetails(movieId) {
    fetch(`/movie/${movieId}`)
        .then(response => response.json())
        .then(data => {
            data.forEach(movie => {
                const moviePicture = document.getElementById('picture');
                moviePicture.setAttribute("src", movie.picture);
                moviePicture.setAttribute("alt", "hej");
                moviePicture.setAttribute("width", 230);
                moviePicture.setAttribute("height", 330);
                const movieTitle = document.getElementById('title');
                const movieDate = document.getElementById('date');
                const movieTime = document.getElementById('time');
                const movieGenre = document.getElementById('genre');
                const movieAge = document.getElementById('age');
                movieTitle.innerHTML = movie.title;
                movieDate.innerHTML = movie.date;
                movieTime.innerHTML = movie.time;
                movieGenre.innerHTML = "Fantasy";
                movieAge.innerHTML = "17";
                movieLengthIntoHoursAndMinutes(movie.id);
            })
            })
            .catch(error => {
                console.log(error);
            });
}*/

function fetchMovieDetails(showtimeId) {
    fetch(`http://localhost:8080/oneshowtime/${showtimeId}`)
        .then(response => response.json())
        .then(showtimeData => {
            // Assuming showtimeData is an object with a 'movie' property
            const movieId = showtimeData.movie.id;

            // Now that you have the movieId, fetch movie details
            fetch(`http://localhost:8080/movie/${movieId}`)
                .then(response => response.json())
                .then(movie => {
                    // Handle movie data as you were doing before
                    const moviePicture = document.getElementById('picture');
                    moviePicture.setAttribute("src", movie.picture);
                    moviePicture.setAttribute("alt", "hej");
                    moviePicture.setAttribute("width", 230);
                    moviePicture.setAttribute("height", 330);
                    const movieTitle = document.getElementById('title');
                    const movieDate = document.getElementById('date');
                    const movieTime = document.getElementById('time');
                    const movieAge = document.getElementById('age');
                    movieTitle.innerHTML = movie.title;
                    movieDate.innerHTML = movie.date;
                    movieTime.innerHTML = movie.time;
                    movieAge.innerHTML = "17";
                    movieLengthIntoHoursAndMinutes(movie.id);
                })
                .catch(error => {
                    console.log(error);
                });

            // Fetch and display genres
            fetch(`http://localhost:8080/genres/${movieId}`)
                .then(response => response.json())
                .then(genres => {
                    const movieGenre = document.getElementById('genre');
                    movieGenre.innerHTML = genres.join(', '); // Join genres with a comma and space
                })
                .catch(error => {
                    console.log(error);
                });
        })
        .catch(error => {
            console.log(error);
        });
}

function countSelectedSeats() {
    const selectedSeats = clickedSeatIds.size;
    const selectedSeatsCount = document.getElementById('count');
    selectedSeatsCount.innerHTML = "";
    selectedSeatsCount.innerText = selectedSeats.toString();
    countTotalPrice();
}

function movieLengthIntoHoursAndMinutes(movieId) {
    fetch(`http://localhost:8080/movie/${movieId}`)
        .then(response => response.json())
        .then(movie => {
                const movieLength = document.getElementById('length');
                const movieMinuteLength = movie.length;
                const movieHourLength = Math.floor(movieMinuteLength / 60);
                const movieMinuteLengthLeft = movieMinuteLength % 60;
                movieLength.innerHTML = movieHourLength + " hours " +  movieMinuteLengthLeft + " minutes ";
            })
        .catch(error => {
            console.log(error);
        });
}


/*function getSeatsFromSelectedTheatre(theatreId) {
    if (theatreId === 1) {
        createSeats(25, 16);
    } else if (theatreId === 2) {
        createSeats(20, 12);
        // Adjust seat IDs for theatre 2 (starting from 401)
        const seats = document.querySelectorAll('.seat');
        seats.forEach((seat, index) => {
            seat.id = (index + 398).toString();
        });
    }
}

function fetchShowtime(showtimeId)
{
    let theatreId = "";
    fetch(`http://localhost:8080/oneshowtime/${showtimeId}`)
        .then(response => response.json())
        .then(showtime => {
                const theatre = document.getElementById('theatre');
                theatre.innerHTML = "";
                if(showtime.theatre.id === 1)
                {
                    theatre.innerHTML = "Jupiter";
                }
                else if(showtime.theatre.id  === 2)
                {
                    theatre.innerHTML = "Pluto";
                }
                theatreId = showtime.theatre.id;
            })
        .catch(error => {
            console.log(error);
        });
    return parseInt(theatreId,1000);
}*/

async function fetchShowtime(showtimeId) {
    try {
        const response = await fetch(`http://localhost:8080/oneshowtime/${showtimeId}`);
        const showtime = await response.json();

        const theatre = document.getElementById('theatre');
        theatre.innerHTML = "";

        if (showtime.theatre.id === 1) {
            theatre.innerHTML = "Jupiter";
            return 1; // Return the theaterId
        } else if (showtime.theatre.id === 2) {
            theatre.innerHTML = "Pluto";
            return 2; // Return the theaterId
        }

        return 0; // Default theaterId if not found
    } catch (error) {
        console.log(error);
        return 0; // Default theaterId in case of an error
    }
}

async function initializeSeats(showtimeId) {
    const theatreId = await fetchShowtime(showtimeId);

    if (theatreId === 1) {
        createSeats(25, 16);
    } else if (theatreId === 2) {
        createSeats(20, 12);

        // Adjust seat IDs for theatre 2 (starting from 401)
        const seats = document.querySelectorAll('.seat');
        seats.forEach((seat, index) => {
            seat.id = (index + 401).toString();
        });
    }
}

function countTotalPrice() {
    const selectedSeats = clickedSeatIds.size;
    const totalPrice = document.getElementById('total-price');
    totalPrice.innerHTML = "";
    totalPrice.innerText = selectedSeats * 120 + " kr";
}

function createTicket(seatId, theatreId)
{
    let row;
    let seatEachRow;
    const rowLetters = ['A', 'B','C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'W', 'V', 'X', 'Y'];

    if(theatreId === 1)
    {
        row = 25;
        seatEachRow = 16;
        for(let i=0; i<rowLetters.length; i++)
        {
        }

    }
    else if(theatreId === 2)
    {
        row = 20;
        seatEachRow = 12;
    }
   


}

document.addEventListener("DOMContentLoaded", () => {
    const loadingScreen = document.getElementById('loading-screen');
    setTimeout(() => {
        loadingScreen.style.display = 'none'; // Hide the loading screen after 3 seconds
    }, 1);
    const urlParams = new URLSearchParams(window.location.search);
    const showtime_Id = urlParams.get('showtime_Id');
    if (showtime_Id) {
        // Assuming showtimeId is an integer, you can pass it to your functions
        fetchMovieDetails(showtime_Id);
        fetchBookedSeats(showtime_Id);
        initializeSeats(showtime_Id);
    } else {
        console.error("No showtime_Id found in URL parameters.");
    }
});



