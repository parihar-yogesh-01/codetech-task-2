import { showChef } from "./public/component/chef";

 
 const crossIcons = document.querySelector(".cross")
 const ulList = document.querySelector(".ul-list")
const menu = document.getElementById("menu")

menu.addEventListener("click",()=>{
    ulList.style.right = "0%"
})
 crossIcons.addEventListener("click",()=>{
  ulList.style.right = "-100%"
 })

const inputField = document.getElementById("input-field");
const searchBtn = document.querySelector(".searchbtn");
const mainContainer = document.querySelector(".main-container");
const popUpDiv = document.querySelector(".popUpFunction");
let allItems = []; // Array to hold all items fetched

// List of search terms to fetch a variety of items
const searchTerms = ["chicken", "beef", "pasta", "cake", "salad", "soup", "seafood", "pizza", "dessert", "rice","dal","roti","burger"];

// Function to fetch items by search term
const fetchApi = async (query) => {
  const foodFetch = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
  try {
    const data = await fetch(foodFetch);
    const res = await data.json();
    inputField.value = "";

    if (res.meals) {
      // Add meals to allItems array up to a maximum of 100
      res.meals.forEach((item) => {
        if (allItems.length < 500) {
          allItems.push(item);
        }
      });
    } 

  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Function to display items in the main container
const displayItems = () => {
  mainContainer.innerHTML = ""; // Clear existing items
  allItems.forEach((item) => {
    const DivElm = document.createElement("div");
    DivElm.classList.add("cards");
    DivElm.innerHTML = `
      <img src=${item.strMealThumb} alt="${item.strMeal}">
      <h1>Dish Name: ${item.strMeal}</h1> 
      <h2>Dish Area: ${item.strArea}</h2>
      <h3>Category: ${item.strCategory}</h3>
      <button class="viewBtn">View</button>
    `;
    mainContainer.append(DivElm);

    const viewBtn = DivElm.querySelector(".viewBtn");
    viewBtn.addEventListener("click", () => {
      popUpFunction(item);
    });
  });
};

// Pop-up function to show details of a selected item
const popUpFunction = (item) => {
  popUpDiv.style.transform = "translate(-50%,-50%) scale(1)";
  popUpDiv.innerHTML = `
    <i class="fa-regular fa-circle-xmark cross"></i>
    <h1 class="details-h1">Dish Name: ${item.strMeal}</h1>
    <ul>${lists(item)}</ul>
  `;
  document.body.style.overflow= "hidden"
  const cross = popUpDiv.querySelector(".cross");
  cross.addEventListener("click", () => {
    popUpDiv.style.transform = "translate(-50%,-50%) scale(0)";
     document.body.style.overflow= "visible"
  });
 
};

// Function to get ingredients list
const lists = (item) => {
  let ingredientList = "";
  for (let i = 1; i <= 50; i++) {
    const ingredient = item[`strIngredient${i}`];
    if (ingredient) {
      const measure = item[`strMeasure${i}`];
      ingredientList += `<li class="item-details">${measure} ${ingredient}</li>`;
    } else {
      break;
    }
  }
  return ingredientList;
};



window.addEventListener("load", async () => {
  const fetchPromises = searchTerms.map(fetchApi); // Fetch all in parallel
  await Promise.all(fetchPromises); // Wait for all fetches to complete
  displayItems(allItems);
  if(inputValue.value=""){
  displayItems(allItems);
  } // Display items after fetching
});


searchBtn.addEventListener("click", () => {
  let inputValue = inputField.value;
  mainContainer.innerHTML = ""; // Clear previous results
  allItems = []; // Reset items array
  fetchApi(inputValue).then(displayItems); // Fetch and display items for new search
});


