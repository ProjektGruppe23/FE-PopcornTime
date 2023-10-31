const movieTitle = document.getElementById('movie-title');
const bookingId = document.getElementById('booking-id');

function fetchMovieTitle()
{
}

function paramFromUrl()
{
    const urlParams = new URLSearchParams(window.location.search);
    const showtime_Id = parseInt(urlParams.get('intParam'));
    const email = urlParams.get('email');
    fetchBookingId(email, showtime_Id);
}

function fetchBookingId(email, showtime_Id)
{
    return new Promise((resolve, reject) =>
    {
        fetch(`http://localhost:8080/bookingConfirmed?email=${email}&intParam=${showtime_Id}`)
            .then(response => response.json())
            .then(foundBookingId =>
            {
                const bookingId = document.getElementById('booking-id');
                const stringFound = JSON.stringify(foundBookingId)
                bookingId.innerHTML = `Booking ID: ${stringFound}`;

                resolve(foundBookingId);
            })
            .catch(error =>
            {
                console.log(error);
                reject(error);
            });
    });
}

document.addEventListener("DOMContentLoaded", () =>
{
    paramFromUrl();
});
