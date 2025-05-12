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
const formInputs = Array.from(
  form.querySelectorAll('input:not([name="company"])'),
)
const countrySelect = document.getElementById('country')
const selectElements = document.querySelectorAll('[data-custom]')
selectElements.forEach((selectElement) => {
  new Select(selectElement)
})
const customSelectContainer = document.querySelector('.custom-select-container')
const toggleBtn = document.querySelector('.toggle-password')
const passwordInput = document.getElementById('password')

// Cancel Form submit
form.addEventListener('submit', (e) => {
  e.preventDefault()

  validateFormInputs()
  handleCountryValidation()

  const honeypot = form.querySelector('[name="company"]')
  if (honeypot.value.trim() !== '') {
    console.warn('Bot detected - form not submitted.')
    return
  }

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

    if (element.tagName === 'SELECT') {
      const customSelect = element.nextElementSibling
      if (customSelect?.classList.contains('custom-select-container')) {
        customSelect.removeAttribute('aria-invalid')
        customSelect.removeAttribute('aria-describedby')
      }
    }
  })
}

// Toggle password visiblity
toggleBtn.addEventListener('click', () => {
  const isPassword = passwordInput.type === 'password'
  passwordInput.type = isPassword ? 'text' : 'password'
  toggleBtn.setAttribute(
    'aria-label',
    isPassword ? 'Hide password' : 'Show password',
  )
  toggleBtn.setAttribute('aria-pressed', String(!isPassword))
})

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
