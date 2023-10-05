
let clickedSeatIds = new Set();

function getSeatId()
{
    const seatId = this.id;
    console.log(seatId)
}

function changeSeatStatusToSelected()
{
    this.classList.add('selected');
    this.addEventListener('click', changeSelectedSeatStatusToAvailable)
    const seatId = this.id;
    clickedSeatIds.add(seatId);
    console.log(Array.from(clickedSeatIds));
}

function changeSelectedSeatStatusToAvailable() {
    this.classList.remove('selected');
    this.removeEventListener('click', changeSelectedSeatStatusToAvailable); // Remove the event listener
    this.addEventListener('click', changeSeatStatusToSelected);
    const seatId = this.id;
    clickedSeatIds.delete(seatId);
    console.log(Array.from(clickedSeatIds));
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
            seatDiv.id = seatCount.toString(); // Assign unique seat IDs
            seatDiv.addEventListener('click', getSeatId); // Add a click event listener
            seatDiv.addEventListener('click', changeSeatStatusToSelected)
            rowDiv.appendChild(seatDiv);
        }
        container.appendChild(rowDiv);
    }
}

function fetchBookedSeats() {
    fetch('http://localhost:8080/getBookedSeats') // Use the correct endpoint
        .then(response => response.json())
        .then(data => {
            // data contains the list of booked seats from the server
            console.log(data);

            // Now you can work with the data in JavaScript
            // For example, you can loop through the booked seats and mark them as booked
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

document.addEventListener("DOMContentLoaded", () => {
    fetchBookedSeats();
    createSeats(25, 16);

});
