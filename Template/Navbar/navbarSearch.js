document.addEventListener('DOMContentLoaded', function () {
const searchInput = document.getElementById('searchbar-input');
const movieSuggestions = document.getElementById('movie-suggestions');
const searchOptions = document.getElementById('search-options');

let movieArr;

function fetchAllMovies() {
    console.log("Start fetchAllMovies");
    return fetch(`http://localhost:8080/allmovies`).then((response) => response.json());
}

async function fetchMovies() {
    console.log("Start fetchMovies");
    movieArr = await fetchAllMovies();
    console.log(movieArr);
    movieArr.forEach(populateDatalist);
    console.log("End fetchMovies");
}

function populateDatalist() {
    console.log("Start populateDatalist");
    movieSuggestions.innerHTML = '';
    movieArr.forEach((movie) =>
    {
    const option = document.createElement('option');
    option.textContent = movie.title;
    option.value = movie.id;
    movieSuggestions.appendChild(option);
    });
    console.log("end populateDatalist");
}

function getUserInput() {
    console.log("Start getUserInput");
    searchOptions.innerHTML = '';
    const userInput = searchInput.value;
    if (userInput.length > 0)
    {
        const regex = new RegExp(`\\b${userInput}`, 'i');
        movieArr.forEach(movie =>
        {
            if (regex.test(movie.title))
            {
                const optionIndex = document.createElement('a');
                const imgElement = document.createElement('img');
                imgElement.src = movie.picture;
                imgElement.alt = movie.title
                console.log(imgElement.src);
                optionIndex.appendChild(imgElement);
                optionIndex.appendChild(document.createTextNode(movie.title));
                optionIndex.textContent = movie.title;
                optionIndex.addEventListener('click', () =>getToPage(movie));
                searchOptions.appendChild(optionIndex);
            }
        })
    }
    console.log("End getUserInput");
}

function getToPage(movie)
{
    window.location.href = `http://localhost:63342/FE-PopcornTime/HTML/selectedmovie.html?movieId=${movie.id}`;
}

    searchInput.addEventListener('click', fetchMovies);
    searchInput.addEventListener('input', getUserInput);
});

