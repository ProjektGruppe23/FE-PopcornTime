export async function fetchAndDisplayMoviesByGenre(genreId, populateMovieCard)
{
    const apiUrl = `http://localhost:8080/movies/${genreId}`;

    async function fetchAnyUrl(url)
    {
        try
        {
            const response = await fetch(url);
            if (response.ok)
            {
                return await response.json();
            }
            else
            {
                return `Failed to fetch data: ${response.status} ${response.statusText}`;
            }
        }
        catch (error)
        {
            console.error("Fetch Error:", error);
            throw error;
        }
    }

    try
    {
        const movies = await fetchAnyUrl(apiUrl);
        movies.forEach(populateMovieCard);
    }
    catch (error)
    {
        console.error("Error fetching movies:", error);
        throw error;
    }
}