export default class Select {
  constructor(element) {
    this.element = element
    this.options = getFormattedOptions(element.querySelectorAll('option'))

    this.placeholder =
      this.options.find((opt) => opt.isPlaceholder)?.label || ''

    this.customElement = document.createElement('div')
    this.labelElement = document.createElement('span')
    this.optionsCustomElement = document.createElement('ul')

    setupCustomElement(this)

    element.style.display = 'none'
    element.after(this.customElement)
  }

  get selectedOption() {
    return this.options.find(
      (option) => option.selected && !option.isPlaceholder,
    )
  }

  get selectedOptionIndex() {
    return this.options.indexOf(this.selectedOption)
  }

  selectValue(value) {
    const newSelectedOption = this.options.find(
      (option) => option.value === value,
    )
    const prevSelectedOption = this.selectedOption

    // Update native select
    if (prevSelectedOption) {
      prevSelectedOption.selected = false
      prevSelectedOption.element.selected = false

      const prevCustomElement = this.optionsCustomElement.querySelector(
        `[data-value="${prevSelectedOption.value}"]`,
      )
      if (prevCustomElement) {
        prevCustomElement.classList.remove('selected')
        prevCustomElement.setAttribute('aria-selected', 'false')
      }
    }

    newSelectedOption.selected = true
    newSelectedOption.element.selected = true

    // Update label
    this.labelElement.innerText = newSelectedOption.label
    this.labelElement.classList.remove('placeholder')

    // ARIA: reference active option
    this.customElement.setAttribute(
      'aria-activedescendant',
      `option-${newSelectedOption.value}`,
    )

    // handle change of "selected" class and close after click
    const newCustomElement = this.optionsCustomElement.querySelector(
      `[data-value=${newSelectedOption.value}]`,
    )
    newCustomElement.classList.add('selected')
    newCustomElement.scrollIntoView({ block: 'nearest' })
  }
}

function setupCustomElement(select) {
  select.customElement.classList.add('custom-select-container')
  select.customElement.tabIndex = 0

  // ARIA: Custom select container
  select.customElement.setAttribute('role', 'combobox')
  select.customElement.setAttribute('aria-haspopup', 'listbox')
  select.customElement.setAttribute('aria-expanded', 'false')
  select.customElement.setAttribute(
    'aria-controls',
    `listbox-${select.element.id}`,
  )

  // ARIA: Label element
  select.labelElement.classList.add('custom-select-value')
  select.labelElement.id = `label-${select.element.id}`

  const selected = select.selectedOption
  if (selected) {
    select.labelElement.innerText = selected.label
    select.labelElement.classList.remove('placeholder')
  } else {
    select.labelElement.innerText = select.placeholder
    select.labelElement.classList.add('placeholder')
  }

  select.customElement.setAttribute('aria-labelledby', select.labelElement.id)
  select.customElement.append(select.labelElement)

  // ARIA: Option list
  select.optionsCustomElement.classList.add('custom-select-options')
  select.optionsCustomElement.setAttribute('role', 'listbox')
  select.optionsCustomElement.setAttribute('id', `listbox-${select.element.id}`)

  // Create custom options
  select.options.forEach((option) => {
    if (option.isPlaceholder) return
    const optionElement = document.createElement('li')
    optionElement.classList.add('custom-select-option')

    //ARIA: add aria attributes to li
    optionElement.setAttribute('role', 'option')
    optionElement.setAttribute('aria-selected', option.selected)

    optionElement.id = `option-${option.value}`
    optionElement.dataset.value = option.value
    optionElement.innerText = option.label

    if (option.selected) optionElement.classList.add('selected')

    optionElement.addEventListener('click', () => {
      select.selectValue(option.value)
      select.optionsCustomElement.classList.remove('show')
    })
    select.optionsCustomElement.append(optionElement)
  })

  select.customElement.append(select.optionsCustomElement)

  // Open/close toggle
  select.labelElement.addEventListener('click', () => {
    const isOpen = select.optionsCustomElement.classList.toggle('show')
    select.customElement.setAttribute('aria-expanded', String(isOpen))
  })

  // Close on blur
  select.customElement.addEventListener('blur', () => {
    select.optionsCustomElement.classList.remove('show')
    select.customElement.setAttribute('aria-expanded', 'false')
  })

  // Keyboard interaction
  let debounceTimeout
  let searchTerm = ''

  select.customElement.addEventListener('keydown', (e) => {
    switch (e.code) {
      case 'Space': {
        const isOpen = select.optionsCustomElement.classList.toggle('show')
        select.customElement.setAttribute('aria-expanded', String(isOpen))
        break
      }

      case 'ArrowUp': {
        const prevOption = select.options[select.selectedOptionIndex - 1]
        if (prevOption) {
          select.selectValue(prevOption.value)
        }
        break
      }

      case 'ArrowDown': {
        const nextOption = select.options[select.selectedOptionIndex + 1]
        if (nextOption) {
          select.selectValue(nextOption.value)
        }
        break
      }

      case 'Enter':
      case 'Escape':
        select.optionsCustomElement.classList.remove('show')
        select.customElement.setAttribute('aria-expanded', 'false')
        break

      default: {
        clearTimeout(debounceTimeout)
        searchTerm += e.key
        debounceTimeout = setTimeout(() => {
          searchTerm = ''
        }, 500)

        const searchedOption = select.options.find((option) => {
          return option.label.toLowerCase().startsWith(searchTerm)
        })

        if (searchedOption) select.selectValue(searchedOption.value)
      }
    }
  })
}

function getFormattedOptions(optionElements) {
  return [...optionElements].map((optionElement) => {
    return {
      value: optionElement.value,
      label: optionElement.label,
      selected: optionElement.selected,
      element: optionElement,
      isPlaceholder: optionElement.disabled && optionElement.hidden,
    }
  })
}
