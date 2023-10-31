// Lav click funktion
export const handleClickEvent = (event) =>
{
    const target = event.target;
    const showtime_Id = target.getAttribute('data-showtimeId');

    if (showtime_Id && (target.tagName === 'BUTTON'))
    {
        console.log(showtime_Id)
        window.location.href = `http://localhost:63342/FE-PopcornTime/HTML/bookedSeat.html?showtime_Id=${showtime_Id}`;
    }
};