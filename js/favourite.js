if (!JSON.parse(localStorage.getItem('user'))) {
    window.location.href = 'login.html'
}
// get recipes,comments and Likes from localstorage
const recipes = JSON.parse(localStorage.getItem("recipes"))
const favouriteRecipeList = JSON.parse(localStorage.getItem("favourite"));
const likeDatabase = JSON.parse(localStorage.getItem("likes"));

const recipesRegister = Object.entries(favouriteRecipeList).map((recipeKey) => {
    const recipeName = recipeKey[0]
    const recipefavourite = recipeKey[1]
    return recipefavourite ? recipeName : null
}).filter(recipeName => recipeName);

const favouriteRecipe = recipes.filter((favourite) => {
    return recipesRegister.includes(favourite.name)
});
//  Insert favourite data in favourite.html Page
const listContainer = document.querySelector('.listContainer');
const commentsDatabase = JSON.parse(localStorage.getItem("comments"));
const recipe = favouriteRecipe.map(item => {
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
// seclet each artical to Open recipe-details.html
const articles = document.querySelectorAll('article');
articles.forEach(article => {
    article.addEventListener('click', (e) => {
        const current = e.currentTarget.children[2].innerText
        // open recipe-details with recipe Name
        window.location.href = `recipe-details.html?${current}`;
    })
})