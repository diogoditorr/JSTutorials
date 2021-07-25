import Select from './select.js'

const selectElements = document.querySelectorAll('[data-custom]')

selectElements.forEach(selectElement => {
    console.log(new Select(selectElement))
})


// select.setValue("NE")