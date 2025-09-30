let searchBtn = document.getElementById('searchBtn');
let clearBtn = document.getElementById('clearBtn');
let result = document.getElementById('resultContainer');
let mylist = document.getElementById('dropdown');
let closeBtn = document.getElementById('closeBtn');
let searchInput =  document.getElementById('searchInput');

const clearsearch = () => {
    searchInput.value = "";
    mylist.style.display = "none";
    console.log("Clearing");
};

clearBtn.addEventListener("click", clearsearch);

const showResult = (name, img, info) => {
    if (mylist.style.display === "none" || mylist.style.display === "") {
        mylist.style.display = "block";
    } else {
        mylist.style.display = "none";
    }
    result.innerHTML = `
        <h2 class="title">${name}</h2>
        <img class="search-img" src=${img} alt="sofia">
        <p class="description">${info}</p>
        `;
};

const closeDropdown = () => {
    mylist.style.display = "none";
    searchInput.value = "";
};

closeBtn.addEventListener("click", closeDropdown);

const searchError = () => {
    if (mylist.style.display === "none" || mylist.style.display === "") {
        mylist.style.display = "block";
    } else {
        mylist.style.display = "none";
    }

    result.innerHTML = `<p class="notfound">Sorry we can't find your search</p>`;
};

fetch("travel_recommendation_api.json")
    .then((res) => res.json())
    .then((data) => {
        const search = () => {
            let searchQuery = searchInput.value.toLowerCase();
            let notfound = true;

            data.countries.map((country) => {
                country.cities.map((city) => {
                    if (city.name.toLowerCase() === searchQuery) {
                        showResult(city.name, city.imageUrl, city.description);
                        notfound = false;
                    }
                }); 
            });

            data.temples.map((temple) => {
                if (temple.name.toLowerCase() === searchQuery) {
                    showResult(temple.name, temple.imageUrl, temple.description);
                    notfound = false;
                }
            });

            data.beaches.map((beach) => {
                if (beach.name.toLowerCase().includes(searchQuery)) {
                    showResult(beach.name, beach.imageUrl, beach.description);
                    notfound = false;
                }
            });

            if (notfound) {
                searchError();
            }
        };
        searchBtn.addEventListener("click", search);
    });
