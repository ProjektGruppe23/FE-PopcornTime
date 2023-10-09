const searchInput = document.getElementById('searchbar-input');
const movieSuggestions = document.getElementById('movie-suggestions');
const searchOptions = document.getElementById('search-options');
const fillSugg = document.getElementById('fillSuggestions')

let movieArr;

function fetchAllMovies()
{
    console.log("Start fetchAllMovies");
    return fetch('http://localhost:8080/allmovies').then((response) => response.json());
}

async function fetchMovies()
{
    console.log("Start fetchMovies");
    movieSuggestions.innerHTML = '';
    movieArr = await fetchAllMovies();
    console.log(movieArr);
    movieArr.forEach(populateDatalist);
    populateDatalist();
    console.log("End fetchMovies")
}

function populateDatalist()
{
    console.log("Start populateDatalist")
    movieSuggestions.innerHTML = '';
    movieArr.forEach((movie) => {
        const option = document.createElement('option');
        option.value = movie.title;
        option.dataset.movieId = movie.id;
        movieSuggestions.appendChild(option);
    });
    console.log("end populateDatalist");
}

function getUserInput() {
    console.log("Start getUserInput");
    const userInput = searchInput.value;
    searchOptions.innerHTML = '';
    if (userInput.length > 0) {
        movieArr.forEach(option => {
            if (option.title.toLowerCase().includes(userInput.toLowerCase())) {
                const optionIndex = document.createElement('div');
                optionIndex.textContent = option.title;
                optionIndex.addEventListener('click', () => createATag(option));
                searchOptions.appendChild(optionIndex);
            }
        })
    }
    console.log("End getUserInput");
}

function createATag(option)
{
    console.log("Start createATag");
    searchInput.value = option.title;
    searchOptions.innerHTML = '';
    const aTag = document.createElement('a');
    aTag.textContent = option.title;
    aTag.href = option.href;
    document.body.appendChild(aTag);
    console.log("End createATag");
}

if (fillSugg)
{
    fillSugg.addEventListener('click', fetchMovies);
}
