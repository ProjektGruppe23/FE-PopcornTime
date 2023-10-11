// Lav click funktion
export const handleClickEvent = (event) =>
{
    const target = event.target;
    // const movieId = target.getAttribute('data-movieId');

    if (target.closest('button'))
    {
        window.location.href = "https://cinemaxx.dk/koebenhavn/kommende-film";
    }
};