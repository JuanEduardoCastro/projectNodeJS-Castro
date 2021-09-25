

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