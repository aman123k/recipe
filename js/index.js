const User = JSON.parse(localStorage.getItem("user"));
// get comments and Likes from localstorage
const commentsDatabase = JSON.parse(localStorage.getItem("comments"));
const likeDatabase = JSON.parse(localStorage.getItem("likes"));
// if their is no user then go back to login Page
if (!User) {
  window.location.href = "login.html"
}
// get recipe from localStorage
const recipeRegister = JSON.parse(localStorage.getItem("recipes"))
// index.html file 
const listContainer = document.querySelector('.listContainer');
const btns = document.querySelectorAll('button');
const heroSection = document.querySelector(".hero-section");
const heroSerch = document.querySelector(".heroSerch");
// to focus on search
document.addEventListener("keydown", (e) => {
  e.preventDefault();
  if (e.key.toLowerCase() === "/" && e.ctrlKey) {
    heroSerch.click();
    console.log("hello")
  }
})
// Hero change recipe
const randomRecipe = recipeRegister[Math.floor(Math.random() * 9)];
heroSection.innerHTML = `<img src="${randomRecipe.imageURL}" />
        <div class="recipifyContainer">
          <span class="Recipify">Recipify for you</span>
          <h1>${randomRecipe.name}</h1>
          <ul>
            <li>${randomRecipe.steps[0]}</li>
            <li>${randomRecipe.steps[1]}</li>
            <li
              style="
                width:200px;
                margin-left:-18px;
                white-space: nowrap;
                overflow: hidden;
                height: 20px;
                text-overflow: ellipsis;
              "
            ><span>•</span> ${randomRecipe.steps[2]}
            </li>
            <a class="readMore" href="recipe-details.html?${randomRecipe.name}"><li class="information">Read More</li></a>
          </ul>
        </div> `;

// button Category function
btns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    let Ingredients = e.currentTarget.dataset.id;
    let category = recipeRegister.filter(item => item.ingredients.find(t => t.type === Ingredients));
    if (Ingredients === "All") {
      renderItem(recipeRegister)
      OpenrecipeInfo()
    } else {
      renderItem(category);
      OpenrecipeInfo()
    }
  })
})
// Insert data in home Page
function renderItem(menuData) {
  let recipe = menuData.map((item) => {
    return ` <article data-id="${item.ingredients[0].type} ">
      <img src="${item.imageURL}" alt="" />
      <div>
      <span class="likes">${item.likes + (!!likeDatabase?.[item.name]) ?? 1} Likes</span>
      <span class="comments">${item.iscomment.length + (commentsDatabase?.[item.name]?.length ?? 0)} Comments</span>
      </div>
      <h3>${item.name}</h3>
      <p>Steps : ${item.steps[0]}...</p>
      </article>`
  }).join("");
  listContainer.innerHTML = recipe;
}
renderItem(recipeRegister);
// seclet each artical to Open recipe-details.html
function OpenrecipeInfo() {
  const articles = document.querySelectorAll('article');
  articles.forEach(article => {
    article.addEventListener('click', (e) => {
      const current = e.currentTarget.children[2].innerText
      // open recipe-details with recipe Name
      window.location.href = `recipe-details.html?${current}`;
    })
  })
}
OpenrecipeInfo()

export { renderItem }


