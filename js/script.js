import Select from './select.js'
import {
  checkForEmptyInputs,
  checkForShortInputs,
  validateEmailInput,
  validatePasswordInput,
  validatePasswordStrength,
  validateIfCountryWasSelected,
} from './validation.js'
import { renderErrorMessage } from './renderErrorMessage.js'

import { ERROR_MESSAGES } from '../js/errorMessages.js'

const form = document.querySelector('#form-element')
const submitButton = document.querySelector('#submit-button')
const formInputs = Array.from(form.querySelectorAll('input'))
const countrySelect = document.getElementById('country')
const selectElements = document.querySelectorAll('[data-custom]')
selectElements.forEach((selectElement) => {
  new Select(selectElement)
})
const customSelectContainer = document.querySelector('.custom-select-container')

// Cancel Form submit
form.addEventListener('submit', (e) => {
  e.preventDefault()

  validateFormInputs()
  if (!enableSumbitButton(true)) {
    alert('Submitted succesfully')
  }
})

// Onblur validation for each input
formInputs.forEach((input) => {
  input.onblur = (e) => {
    validateFormInputs([e.target])
    enableSumbitButton()
  }
})

// Validation for country select
const handleCountryValidation = () => {
  clearErrorMessages([countrySelect])
  validateIfCountryWasSelected(countrySelect, true)
  enableSumbitButton()
}

// Onblur validation for country select
customSelectContainer.addEventListener('focusout', () => {
  handleCountryValidation()
})

// Change validation for country select
customSelectContainer.addEventListener('change', () => {
  handleCountryValidation()
})

// Clear error message(s)
const clearErrorMessages = (HTMLElements = []) => {
  HTMLElements.forEach((element) => {
    const errorContainer = document.getElementById(`${element.name}-error`)
    element.removeAttribute('aria-invalid')

    if (errorContainer) {
      errorContainer.innerHTML = ''
    }
  })
}

// Validate Inputs
const validateFormInputs = (inputElements = formInputs) => {
  clearErrorMessages(inputElements)

  // "2nd argument is to render error message"
  checkForEmptyInputs(inputElements, true)
  checkForShortInputs(inputElements, true)
  validateEmailInput(inputElements, true)
  validatePasswordInput(inputElements, true)
  validatePasswordStrength(inputElements, true)
}

// Check enabling of submitButton
const enableSumbitButton = (renderErrorMsg = false) => {
  clearErrorMessages([submitButton])

  const requirements = [
    // "2nd argument is to NOT render error message"
    checkForEmptyInputs(formInputs, false),
    checkForShortInputs(formInputs, false),
    validateEmailInput(formInputs, false),
    validatePasswordInput(formInputs, false),
    validatePasswordStrength(formInputs, false),
    validateIfCountryWasSelected(countrySelect, false),
  ]

  const enableSubmitButton = requirements.some((requirement) => {
    return requirement === false
  })

  if (enableSubmitButton) {
    submitButton.setAttribute('aria-disabled', 'true')
    if (renderErrorMsg) {
      renderErrorMessage(submitButton, ERROR_MESSAGES.button)
    }
  } else {
    submitButton.removeAttribute('aria-disabled')
  }

  return enableSubmitButton
}
