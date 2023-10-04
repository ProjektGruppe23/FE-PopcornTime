
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

// Call the function to create 400 seats in 25 rows of 16 seats each
document.addEventListener("DOMContentLoaded", ev => createSeats(25, 16));

