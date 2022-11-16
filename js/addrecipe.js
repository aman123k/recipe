if (!JSON.parse(localStorage.getItem('user'))) {
    window.location.href = "login.html"
}
import { readeFile } from "./helper.js";
// seclet all required element from html File 
const dropImage = document.querySelectorAll('.drop_inputImage');
const pompet = document.querySelector('.prompt');
const allSetpContainer = document.querySelector('.allSetpContainer');
const finalSubmit = document.querySelector('.finalSubmit');
const recipesStep = document.querySelector('.recipesStep');
const form2 = document.querySelector('.form2');
const recipeName = document.querySelector('.recipeName');
const ingredientsContainer = document.querySelector('.ingredientsContainer');
const ingredientName = document.querySelector('.ingredientName');
const ingredientQuantity = document.querySelector('.ingredientQuantity');
const catogrySelector = document.querySelector('.catogrySelector');
const from1 = document.querySelector('.from1');
const notifiction = document.querySelector('.notifiction');
const imagecontainer = document.querySelector('.imagecontainer');
let thumbElement = document.querySelector('.droped_Image');

// get recipe from localStorage
const recipe = JSON.parse(localStorage.getItem('recipes'));
const recipeList = {}
// arr for step and ingredients
let allStape = [];
let ingredients = [];
// seclect recipe Image 
dropImage.forEach(inputElement => {
    imagecontainer.addEventListener('click', () => {
        inputElement.click();
    })
    imagecontainer.addEventListener('change', async () => {
        if (inputElement.files[0].type.startsWith("image/")) {
            const image = await readeFile(inputElement.files[0]);
            recipeList.imageURL = image
            updateThumbNail(imagecontainer, image)
        }
    })

});
function updateThumbNail(imagecontainer, file) {
    // remove the prompt
    pompet.style.display = "none";
    // if thumbElement will not found
    if (!thumbElement) {
        thumbElement = document.createElement('div')
        thumbElement.classList.add('droped_Image')
        imagecontainer.append(thumbElement)
    }
    thumbElement.style.display = 'block';
    thumbElement.style.backgroundImage = `url(${file})`
}
//get recipe Ingredients from user or Ingredients enter by user
from1.addEventListener('submit', (e) => {
    e.preventDefault();
    const ingEnterByUser = ingredientName.value;
    const qunEnterByUser = ingredientQuantity.value;
    const catogry = catogrySelector.value;
    const object = {
        name: ingEnterByUser,
        quantity: qunEnterByUser,
        type: catogry
    }
    const li = document.createElement('li');
    const ingredientElement = document.createElement('span');
    ingredientElement.textContent = ingEnterByUser;
    li.append(ingredientElement);
    const quantityElement = document.createElement('span');
    quantityElement.textContent = qunEnterByUser;
    quantityElement.className = 'quantity';
    li.append(quantityElement)
    ingredientsContainer.append(li)
    ingredients.push(object)
    console.log(ingredients)
    ingredientName.value = '';
    ingredientQuantity.value = '';
})
// get recipe Steps from user or step enter by user
form2.addEventListener('submit', (e) => {
    e.preventDefault()
    const stepEnterByUser = recipesStep.value;
    allStape.push(stepEnterByUser)
    recipesStep.value = '';
    renderRecipe()
})
function createElement(recipeStep) {
    const stepContainer = document.createElement('li');
    stepContainer.textContent = recipeStep;
    stepContainer.classList = 'stepContainer'
    stepContainer.addEventListener('click', () => {
        Delete(recipeStep)
        renderRecipe()
    })
    return stepContainer
}
function renderRecipe() {
    allSetpContainer.textContent = '';
    allStape.forEach(currentStep => {
        const recipeList = createElement(currentStep);
        allSetpContainer.append(recipeList)
    })
}
function Delete(recipeStep) {
    allStape = allStape.filter(step => {
        return step !== recipeStep
    });
}
// get all recipe Information and submit it to localStorage
finalSubmit.addEventListener('click', async () => {
    // if some information is missing in from then return the notification
    const dropImage = document.querySelector('.drop_inputImage');
    if (recipeName.value === '') {
        notifiction.textContent = "Recipe must have a name";
        notifiction.classList.add("notifictionShow");
        setTimeout(() => {
            notifiction.classList.remove('notifictionShow')
        }, 2000)
        return
    }
    if (dropImage.value === '') {
        notifiction.textContent = "Recipe must have a Image";
        notifiction.classList.add("notifictionShow");
        setTimeout(() => {
            notifiction.classList.remove('notifictionShow')
        }, 2000)
        return
    }
    if (ingredientsContainer.innerHTML === '') {
        notifiction.textContent = "Recipe must have ingredients";
        notifiction.classList.add("notifictionShow");
        setTimeout(() => {
            notifiction.classList.remove('notifictionShow')
        }, 2000)
        return
    }
    if (allSetpContainer.innerHTML === '') {
        notifiction.textContent = "Recipe must have Steps";
        notifiction.classList.add("notifictionShow");
        setTimeout(() => {
            notifiction.classList.remove('notifictionShow')
        }, 2000)
        return
    }
    // all information is there the submit the form and reset the from
    submit()
    dropImage.value = '';
})
// submit and reset
function submit() {
    recipeList.ingredients = ingredients;
    recipeList.steps = allStape;
    recipeList.name = recipeName.value;
    recipeList.likes = 0;
    recipeList.iscomment = [];
    recipe.push(recipeList)
    localStorage.setItem('recipes', JSON.stringify(recipe))
    recipeName.value = '';
    ingredientsContainer.innerHTML = '';
    thumbElement.style.display = 'none';
    pompet.style.display = "block";
    allStape = [];
    renderRecipe()
}