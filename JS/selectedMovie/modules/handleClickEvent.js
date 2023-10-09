// Lav click funktion
export const handleClickEvent= (event) =>
{
    const target = event.target;
    // const movieId = target.getAttribute('data-movieId');

    if (target.tagName === 'BUTTON')
    {
        window.location.href = "http://localhost:8080/getBookedSeats/{showtime_Id}";
        // `somepage.html?movie=${movieId}`;
    }
};