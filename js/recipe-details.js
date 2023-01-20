if (!JSON.parse(localStorage.getItem("user"))) {
  window.location.href = "login.html";
}
// get recipe Name from Url Bar
const url = window.location.href;
const namewithoutspace = url.split("?")[1];
let name = namewithoutspace.replace(/%(20)/g, " ");
if (name.includes("%27")) {
  name = name.replace(/%27/g, "'");
}

// get recipe from localStorage
const recipesRegister = JSON.parse(localStorage.getItem("recipes"));
// select all element form Html file
const recipeimage = document.querySelector(".recipeimage");
const recipename = document.querySelector(".recipename");
const Steps = document.querySelector(".steps");
const ingredientsList = document.querySelector(".ingredientsList");
const title = document.querySelector("title");
const favouriteIcon = document.querySelector(".favourite");
const likeIcon = document.querySelector(".likes");
const likeNumber = document.querySelector(".likeNumber");
const notifiction = document.querySelector(".notifiction");
const form = document.querySelector("form");
const addComment = document.querySelector(".addComment");
const commentSection = document.querySelector(".commentSection");
const commentNumber = document.querySelector(".commentNumber");

// seclect special recipe from recipesRegister
const recipe = recipesRegister.find((detail) => {
  return detail.name === name;
});
// insert recipe into are HTML Page
recipeimage.src = recipe.imageURL;
recipename.textContent = recipe.name;
title.textContent = "Recipify | " + recipe.name;
// insert Steps in recipe
for (let x = 0; x < recipe.steps.length; x++) {
  const createLi = document.createElement("li");
  createLi.textContent = recipe.steps[x];
  Steps.append(createLi);
}
// insert ingredients in recipe
for (let y = 0; y < recipe.ingredients.length; y++) {
  const createList = document.createElement("li");
  const cretespan1 = document.createElement("span");
  const cretespan2 = document.createElement("span");
  cretespan2.classList = "quantity";
  cretespan1.textContent = recipe.ingredients[y].name;
  cretespan2.textContent = recipe.ingredients[y].quantity;
  createList.append(cretespan1, cretespan2);
  ingredientsList.append(createList);
}
// click to add a recipe in favoureite List
const favouriteIconSvg = favouriteIcon.children[0];
favouriteIcon.addEventListener("click", () => {
  notifiction.classList.add("notifictionShow");
  const favouriteDatabase = JSON.parse(localStorage.getItem("favourite"));
  if (!favouriteDatabase?.[recipe.name]) {
    localStorage.setItem(
      "favourite",
      JSON.stringify({
        ...favouriteDatabase,
        [recipe.name]: true,
      })
    );
    notifiction.textContent = "Recipe has been added to the favourite list";
    notifiction.style.backgroundColor = "#10B981";
    favouriteIconSvg.classList.add("favourite");
  } else {
    localStorage.setItem(
      "favourite",
      JSON.stringify({
        ...favouriteDatabase,
        [recipe.name]: false,
      })
    );
    notifiction.textContent = "Recipe has been remove to the favourite list";
    notifiction.style.backgroundColor = "#EF4444";
    favouriteIconSvg.classList.remove("favourite");
  }
  setTimeout(() => {
    notifiction.classList.remove("notifictionShow");
  }, 2000);
});
const favouriteDatabase = JSON.parse(localStorage.getItem("favourite"));
if (!!favouriteDatabase?.[recipe.name]) {
  favouriteIconSvg.classList.add("favourite");
}
// insert Previous comment
for (let comment = 0; comment < recipe.iscomment.length; comment++) {
  const newComment = document.createElement("li");
  newComment.textContent = recipe.iscomment[comment];
  commentSection.append(newComment);
}
commentNumber.textContent = recipe.iscomment.length;
// add comments which user want to add in recipe
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const comment = addComment.value;
  addComment.value = "";
  const newcomment = document.createElement("li");
  newcomment.innerText = comment;
  commentSection.append(newcomment);
  const commentsDatabase = JSON.parse(localStorage.getItem("comments"));
  if (commentsDatabase) {
    localStorage.setItem(
      "comments",
      JSON.stringify({
        ...commentsDatabase,
        [recipe.name]: [...(commentsDatabase[recipe.name] ?? []), comment],
      })
    );
  } else {
    localStorage.setItem(
      "comments",
      JSON.stringify({
        [recipe.name]: [comment],
      })
    );
  }
  commentNumber.textContent =
    recipe.iscomment.length +
    1 +
    (commentsDatabase?.[recipe.name]?.length ?? 0);
});
const commentsDatabase = JSON.parse(localStorage.getItem("comments"));
if (commentsDatabase) {
  commentsDatabase[recipe.name]?.forEach((element) => {
    const comment = document.createElement("li");
    comment.textContent = element;
    commentSection.append(comment);
  });
  commentNumber.innerText =
    recipe.iscomment.length + (commentsDatabase?.[recipe.name]?.length ?? 0);
}
// cilck to add like in recipe
const likeIconSvg = likeIcon.children[0];
likeIcon.addEventListener("click", () => {
  const likeDatabase = JSON.parse(localStorage.getItem("likes"));
  console.log(likeDatabase);
  if (!likeDatabase?.[recipe.name]) {
    localStorage.setItem(
      "likes",
      JSON.stringify({
        ...likeDatabase,
        [recipe.name]: true,
      })
    );
    likeIconSvg.classList.add("like");
    likeNumber.textContent = 1 + recipe.likes;
  } else {
    localStorage.setItem(
      "likes",
      JSON.stringify({
        ...likeDatabase,
        [recipe.name]: false,
      })
    );
    likeIconSvg.classList.remove("like");
    likeNumber.textContent = recipe.likes;
  }
});
likeNumber.textContent = recipe.likes;
const likeDatabase = JSON.parse(localStorage.getItem("likes"));
if (!!likeDatabase?.[recipe.name]) {
  likeIconSvg.classList.add("like");
  likeNumber.textContent = recipe.likes + 1;
}
