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

function fetchBookedSeats() {
    fetch('http://localhost:8080/getBookedSeats')
        .then(response => response.json())
        .then(data => {
            data.forEach(bookedSeat => {
                const seatElement = document.getElementById(bookedSeat.id.toString());
                if (seatElement) {
                    seatElement.classList.add('booked');
                    seatElement.removeEventListener('click', changeSeatStatusToSelected);
                }
            });
        })
        .catch(error => {
            console.log(error);
        });
}

function fetchMovieDetails() {
    fetch('http://localhost:8080/getMovieDetails')
        .then(response => response.json())
        .then(data => {
            const movieTitle = document.getElementById('title');
            const movieLength = document.getElementById('length');
            const movieDate = document.getElementById('date');
            const movieTime = document.getElementById('time');
            const movieGenre = document.getElementById('genre');
            const movieAge = document.getElementById('age');
            movieTitle.innerText = data.title;
            movieDate.innerText = data.date;
            movieTime.innerText = data.time;
            movieLength.innerText = data.length;
            movieGenre.innerText = data.genre;
            movieAge.innerText = data.age;
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

}

document.addEventListener("DOMContentLoaded", () => {
    const loadingScreen = document.getElementById('loading-screen');
    setTimeout(() => {
        loadingScreen.style.display = 'none'; // Hide the loading screen after 3 seconds
    }, 1);
    fetchMovieDetails();
    fetchBookedSeats();
    createSeats(25, 16);
});


