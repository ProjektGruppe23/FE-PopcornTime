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

async function fetchBookedSeats(showtime_Id) {
    console.log("fetchBookedSeats begin");

    return new Promise((resolve, reject) => {
        fetch(`http://localhost:8080/getBookedSeats/${showtime_Id}`)
            .then(response => response.json())
            .then(data => {
                data.forEach(bookedSeat => {
                    const seatElement = document.getElementById(bookedSeat.seat.id.toString());
                    if (seatElement) {
                        seatElement.classList.add('booked');
                        seatElement.removeEventListener('click', changeSeatStatusToSelected);
                    }
                });
                resolve(); // Resolve the Promise when the fetch and updates are complete
            })
            .catch(error => {
                console.log(error);
                reject(error); // Reject the Promise if there is an error
            });
    });
}

function fetchMovieDetails(showtimeId) {
    console.log("Fetchmoviedetails begin")
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
                    const movieAge = document.getElementById('age');
                    movieTitle.innerHTML = movie.title;
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




async function fetchShowtime(showtimeId) {
    try {
        console.log("Halløj");
        const response = await fetch(`http://localhost:8080/oneshowtime/${showtimeId}`);
        const showtime = await response.json();
        console.log("Hej ulrik du er i fethshowtime");

        const datetime = document.getElementById('date-time');

        const date = new Date(showtime.time_start);

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
        const formattedShowtime = `${day}. ${month}. ${year} <br> <span> Time: ${hour}.${minute}</span>`;

        datetime.innerHTML = formattedShowtime;
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
    console.log("InitializeSeats begin")
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



document.getElementById('submit-button').addEventListener('click', function (e) {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const showtime_Id = parseInt(urlParams.get('showtime_Id')); // Parse as an integer
    console.log(showtime_Id);
    const email = document.getElementById('email')

    const seatIdsArray = Array.from(clickedSeatIds); // Convert the Set to an array
    const url = `http://localhost:8080/getBookedSeats?email=${email.value}&arrayParam=${seatIdsArray.join(',')}&intParam=${showtime_Id}`;

    fetch(url,{
        method: 'POST',
    })
        .then((response) => {
            if (response.ok) {
                console.log('Request successful');
                // Handle the response if needed
            } else {
                console.error('Request failed');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});

async function callThreeFunctions() {
    const urlParams = new URLSearchParams(window.location.search);
    const showtime_Id = urlParams.get('showtime_Id');

    if (showtime_Id) {
        try {
            await fetchMovieDetails(showtime_Id);
            await initializeSeats(showtime_Id);
            await fetchBookedSeats(showtime_Id);
        } catch (error) {
            console.error("An error occurred:", error);
        }
    } else {
        console.error("No showtime_Id found in URL parameters.");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const loadingScreen = document.getElementById('loading-screen');
    setTimeout(() => {
        loadingScreen.style.display = 'none'; // Hide the loading screen after 3 seconds
    }, 1);
    callThreeFunctions();
});



