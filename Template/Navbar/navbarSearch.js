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
    let foundMatch = false;

    if (userInput.length > 0)
    {
        document.getElementById('searchbar-input').style.borderBottomRightRadius = '0px';
        document.getElementById('searchbar-input').style.borderBottomLeftRadius = '0px';
        const regex = new RegExp(`\\b${userInput}`, 'i');

        movieArr.forEach(movie =>
        {
            if (regex.test(movie.title))
            {
                foundMatch = true;
                const optionBox = document.createElement('a');
                const imgElement = document.createElement('img');
                imgElement.src = movie.picture;
                console.log(imgElement.src);
                optionBox.appendChild(imgElement);
                const optionIndex = document.createElement('div');
                optionIndex.textContent = movie.title;
                optionIndex.addEventListener('click', () =>getToPage(movie));
                optionBox.appendChild(optionIndex);
                searchOptions.appendChild(optionBox);
            }
        });
        if (!foundMatch)
        {
            const optionBox = document.createElement('a');
            const imgElement = document.createElement('img');
            imgElement.src = '../Template/Navbar/noresultsfound.png';
            optionBox.appendChild(imgElement);
            const optionIndex = document.createElement('div');
            optionIndex.textContent = 'Sorry, there are no results.';
            optionBox.appendChild(optionIndex);
            searchOptions.appendChild(optionBox);
        }
    }
    else
    {
        document.getElementById('searchbar-input').style.borderBottomRightRadius = '10px';
        document.getElementById('searchbar-input').style.borderBottomLeftRadius = '10px';
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

