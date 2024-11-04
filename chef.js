import chefs from "../api/cards.json";

const mainChefContainer = document.querySelector(".main-chef-container");

const showChef = () => {
   chefs.forEach(({ name, department, img, experience }) => {
       const chefDiv = document.createElement("div");
       chefDiv.classList.add("chef");
       chefDiv.innerHTML = `
           <img src="${img}">
           <div class="chef-details">
               <h3>Name: ${name}</h3>
               <p>Department: ${department}</p>
               <p>Experience: ${experience} years</p>
           </div>
       `;
       mainChefContainer.append(chefDiv);
   });
};

document.addEventListener("DOMContentLoaded", showChef);

// Export the function
export { showChef };


