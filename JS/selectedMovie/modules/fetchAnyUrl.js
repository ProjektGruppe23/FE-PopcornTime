// Generic function to fetch data from any URL
export async function fetchAnyUrl(apiUrl)
{
    const response = await fetch(apiUrl);
    if (response.ok)
    {
        return await response.json();
    }
    else
    {
        console.error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        return null;
    }
}