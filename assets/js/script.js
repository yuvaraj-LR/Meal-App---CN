const baseURL = "https://www.themealdb.com/";


// Random API
const randomFoodItems = async () => {
    const api = baseURL + "api/json/v1/1/random.php";

    try {
        const result = await fetch(api);
        const response = await result.json();
        const { meals } = response;
        // console.log(meals, "mealss");
        return meals;
    } catch (error) {
        console.log("Error in Fetching Data Random: ", error);
        return null;
    }
}

// Generate random meals
const createDishCard = async () => {
    const searchedItemContainer = document.querySelector(".random-dish");

    for (let index = 0; index < 10; index++) {
        try {
            const meals = await randomFoodItems();
            const searchedItem = document.createElement("div");
            searchedItem.classList.add("card-div");
            searchedItem.style.width = "20rem";
            searchedItem.innerHTML = `
                <div class="card" style="width: 20rem; margin: auto">
                    <img src="${meals[0].strMealThumb}" class="card-img-top" alt="card-img-${index}">
                    <div class="card-body">
                        <h5 class="card-title">${meals[0].strMeal}</h5>
                        <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum adipisci iure nulla debitis eaque, ea quaerat tenetur voluptatem. Aperiam deleniti, id eius blanditiis deserunt culpa.</p>
                    </div>

                    <div class="card-body-btn">
                        <a href="${meals[0].strSource}" class="card-link"><button class="btn btn-primary">More Details</button></a>


                        <button onclick="addFavourite(${meals[0].idMeal})" id="favourite-button-${meals[0].idMeal}" class="btn btn-danger">Add to Favourite</button>
                    </div>  
                </div>
            `;
            searchedItemContainer.appendChild(searchedItem);
        } catch (error) {
            console.log("Error in Fetching Data Random Promise: ", error);
        }
    }
}

const button = document.getElementById("search-btn");
const searchItem = document.getElementById("search-food");

// Search API
const searchItems = async () => {

    const api = baseURL + "api/json/v1/1/search.php?s=" + searchItem.value;

    try {
        const result = await fetch(api);
        const response = await result.json();

        const { meals } = response;
        return meals;

    } catch (e) {
        console.log("Error in searching element");
        return null;
    }
}

// Dispay the relevant meals after search.
const displayContainer = async() => {
    const displayCont = document.getElementById("search-items");
    document.querySelector(".search-list").style.display = "block";

    const carouselContainer = document.querySelector(".carousel");
    const randomList = document.querySelector(".random-container");


    const searchElementHead = document.getElementById("search-element-head");

    searchElementHead.textContent = `"` + searchItem.value + `"`;

    carouselContainer.style.display = "none";
    randomList.style.display = "none";

    const searchList = await searchItems();

    if (searchList === null) {
        alert("Sorry! we don't have the item now. Please Check Later!");
        return;
    }

    for (let index = 0; index < searchList.length; index++) {
        try {
            const searchedItem = document.createElement("div");
            searchedItem.classList.add("card-div");
            searchedItem.style.width = "20rem";
            searchedItem.innerHTML = `
                <div class="card" style="width: 20rem; margin: auto">
                    <img src="${searchList[index].strMealThumb}" class="card-img-top" alt="card-img-${index}">
                    <div class="card-body">
                        <h5 class="card-title">${searchList[index].strMeal}</h5>
                        <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum adipisci iure nulla debitis eaque, ea quaerat tenetur voluptatem. Aperiam deleniti, id eius blanditiis deserunt culpa.</p>
                    </div>

                    <div class="card-body-btn">
                        <a href="${searchList[index].strSource}" class="card-link"><button class="btn btn-primary">More Details</button></a>

                        <button onclick="addFavourite(${searchList[index].idMeal})" id="favourite-button-${searchList[index].idMeal}" class="btn btn-danger">Add to Favourite</button>
                    </div>  
                </div>
            `;
            displayCont.appendChild(searchedItem);

        } catch (error) {
            console.log("Error in Display Searched Data: ", error);
            return;
        }
    }
}

let favouriteList = [];

// Check already exits
const checkIfIdExists = (mealId) => {
    let idExists = true;
    favouriteList.forEach(element => {
        (element !== mealId) ? true : idExists = false;
    });

    alert("Item added")

    return idExists;
}

// Add favourite Functionality
const addFavourite = (mealId) => {
    let favButton = document.getElementById(`favourite-button-${mealId}`);
    favButton.style.backgroundColor = "limegreen";

    checkIfIdExists(mealId) ? localStorage.setItem(`mealId${mealId}`, mealId) : "";
}

window.onload = () => {
    createDishCard();
    button.addEventListener('click', displayContainer);
}




