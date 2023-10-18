export function showLoadingScreen()
{
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.style.display = 'flex'; // Show the loading screen
}

export function hideLoadingScreen()
{
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.style.display = 'none'; // Hide the loading screen
}