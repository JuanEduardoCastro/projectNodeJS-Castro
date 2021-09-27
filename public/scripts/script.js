

var plusIngredient = document.querySelector('#ingredientsPlusButton')

plusIngredient.addEventListener('click', () => {
    let ingredientBox = document.querySelector('.ingredientsLine')
    let addInputLine = document.createElement('div')
    addInputLine.innerHTML = '<input type="text" name="ingredients" id="ingredients" />'
    ingredientBox.appendChild(addInputLine)
})

var plusStep = document.querySelector('#stepsPlusButton')

plusStep.addEventListener('click', () => {
    let stepBox = document.querySelector('.stepsLine')
    let addInputLine = document.createElement('div')
    addInputLine.innerHTML = '<input type="text" name="steps" id="steps" />'
    stepBox.appendChild(addInputLine)
})


var lessIngredient = document.querySelector('#ingredientsLessButton')

lessIngredient.addEventListener('click', () => {
    let ingredientBox = document.querySelector('.ingredientsLine')
    if (ingredientBox.childElementCount > 1) {
        ingredientBox.removeChild(ingredientBox.lastElementChild)
    }
})

var lessStep = document.querySelector('#stepsLessButton')

lessStep.addEventListener('click', () => {
    let stepBox = document.querySelector('.stepsLine')
    if (stepBox.childElementCount > 1) {
        stepBox.removeChild(stepBox.lastElementChild)
    }
})