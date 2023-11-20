// Favourite List API
const displayFavContApi = async(api) => {
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


// Remove From Favourite
const removeFavourite = (id) => {
    for(let index = 0; index < localStorage.length; index++) {
        let currentId = localStorage.key(index);

        console.log(id,  localStorage.getItem(currentId));

        if (id == localStorage.getItem(currentId)) {
            localStorage.removeItem(currentId);
            alert("Removed.");
            window.location.replace("./favourite.html")
        }
    }
}


// List the favourite list
const displayingFavouriteList = async () => {
    const displayFavContainer = document.querySelector(".random-dish");

    for (let index = 0; index < localStorage.length; index++) {
        let currentId = localStorage.key(index);
        const api = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${localStorage.getItem(currentId)}`;

        try {
            const result = await displayFavContApi(api);
            const searchedItem = document.createElement("div");
            searchedItem.classList.add("card-div");
            searchedItem.style.width = "20rem";
            searchedItem.innerHTML = `
                <div class="card" style="width: 20rem; margin: auto">
                    <img src="${result[0].strMealThumb}" class="card-img-top" alt="card-img-${index}">
                    <div class="card-body">
                        <h5 class="card-title">${result[0].strMeal}</h5>
                        <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum adipisci iure nulla debitis eaque, ea quaerat tenetur voluptatem. Aperiam deleniti, id eius blanditiis deserunt culpa.</p>
                    </div>

                    <div class="card-body-btn">
                        <a href="${result[0].strSource}" class="card-link"><button class="btn btn-primary">More Details</button></a>


                        <button onclick="removeFavourite(${result[0].idMeal})" id="favourite-button-${result[0].idMeal}" class="btn btn-danger">Remove  </button>
                    </div>  
                </div>
            `;
            displayFavContainer.appendChild(searchedItem);
        } catch (error) {
            console.log("Error in displaying favourite list, ", error);
        }
    }
}

// Display the favourite list.
window.onload = () => {
    displayingFavouriteList()
}