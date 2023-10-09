function loadNavbar()
{
    fetch('../Template/Navbar/navbar.html') //load the template
        .then(response => response.text())
        .then(data =>
        {
            const navbarContainer = document.getElementById('navbar');
            navbarContainer.innerHTML = data
        })
        .catch(error => console.error('Error loading navbar:', error))
}

const searchInput = document.getElementById('searchbar-input');
const select = document.getElementById('movie-suggestions');
const searchOptions = document.getElementById('search-options');

let movieArr;

function fetchAllMovies()
{
    return fetch('/allmovies').then((response) => response.json());
}

function fillSuggestions(item)
{
    const el = document.createElement("option");
    el.textContent = item.title;
    el.value = item.title;
    select.appendChild(el);
}

async function fetchMovies(any)
{
    select.innerHTML = '';
    movieArr = await fetchAllMovies();
    console.log(movieArr);
    movieArr.forEach(fillSuggestions);
}

function selectedMovie()
{
    const selectedOption = select.options[select.selectedIndex];
    select.value = selectedOption.value;
}

function getUserInput()
{
    const userInput = searchInput.value;
    searchOptions.innerHTML = "";
    if (userInput.length > 0)
    {
        movieArr.forEach(option =>
        {
            if (option.title.toLowerCase().includes(userInput.toLowerCase()))
            {
                const optionIndex = document.createElement('div');
                optionIndex.textContent = option.title;
                optionIndex.addEventListener('click', () => createATag(option));
                searchOptions.appendChild(optionIndex);
            }
        })
    }
}

function createATag(option)
{
    searchInput.value = option.title;
    searchOptions.innerHTML = "";
    const aTag = document.createElement('a');
    aTag.textContent = option.title;
    aTag.href = option.href;
    document.body.appendChild(atag);

    removeMovieFromArr(option);

}

function removeMovieFromArr(option)
{
    for (let i = 0; i < movieArr.length; i++)
    {
        if (movieArr[i].title === option.title)
        {
            movieArr.splice(i, 1);
            break;
        }
    }
}

select.addEventListener('change', selectedMovie);
searchInput.addEventListener('click', fetchMovies);
searchInput.addEventListener('input', getUserInput);