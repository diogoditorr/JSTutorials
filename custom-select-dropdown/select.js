export default class Select {
    constructor(element) {
        this.element = element;
        this.options = getFormattedOptions(element.querySelectorAll('option'))
        this.customElement = document.createElement('div')
        this.labelElement = document.createElement('span')
        this.optionsCustomElement = document.createElement('ul')
        setupCustomElement(this)
        element.style.display = "none"
        element.after(this.customElement)
    }

    get selectedOption() {
        return this.options.find(option => option.selected)
    }

    selectValue(value) {
        const newSelectedOption = this.options.find(option => {
            return option.value === value
        })

        const previousSelectedOption = this.selectedOption
        previousSelectedOption.selected = false
        previousSelectedOption.element.selected = false

        newSelectedOption.selected = true
        newSelectedOption.element.selected = true

        this.labelElement.innerText = newSelectedOption.label
    }
}

function setupCustomElement(select) {
    select.customElement.classList.add('custom-select-container')
    select.customElement.tabIndex = 0;

    select.labelElement.classList.add('custom-select-value')
    select.labelElement.innerText = select.selectedOption.label
    select.customElement.append(select.labelElement)

    select.optionsCustomElement.classList.add('custom-select-options')
    select.options.forEach(option => {
        const optionElement = document.createElement('li')
        optionElement.classList.add('custom-select-option')
        optionElement.classList.toggle('selected', option.selected)
        optionElement.innerText = option.label
        optionElement.dataset.value = option.value
        optionElement.addEventListener('click', () => {
            select.selectedOption.element.classList.remove('selected')
            select.selectValue(option.value)
            optionElement.classList.add('selected')
            select.optionsCustomElement.classList.remove('show')
        })
        select.optionsCustomElement.append(optionElement)
    })
    select.customElement.append(select.optionsCustomElement)

    select.labelElement.addEventListener('click', () => {
        select.optionsCustomElement.classList.toggle('show')
    })
}

function getFormattedOptions(optionElements) {
    return [...optionElements].map(optionElement => {
        return {
            value: optionElement.value,
            label: optionElement.label,
            selected: optionElement.selected,
            element: optionElement
        }
    })
}