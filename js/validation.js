import { ERROR_MESSAGES } from './errorMessages.js'
import { renderErrorMessage } from './renderErrorMessage.js'

export const checkForEmptyInputs = (inputData, renderErrorMsg) => {
  let valid = true
  inputData.forEach((input) => {
    if (input.value.trim() === '') {
      valid = false
      if (!renderErrorMsg) return
      renderErrorMessage(input, ERROR_MESSAGES[input.name].empty)
    }
  })
  return valid
}

export const checkForShortInputs = (inputData, renderErrorMsg) => {
  let valid = true
  inputData.forEach((input) => {
    if (!checkForEmptyInputs([input])) return
    if (input.type !== 'text') return

    if (input.value.trim().length === 1) {
      valid = false
      if (!renderErrorMsg) return
      renderErrorMessage(input, ERROR_MESSAGES[input.name].length)
    }
  })
  return valid
}

export const validateEmailInput = (inputData, renderErrorMsg) => {
  let valid = true
  const emailRegex = /^[\p{L}0-9._%+-]+@[\p{L}0-9.-]+\.[\p{L}]{2,}$/u

  inputData.forEach((input) => {
    if (!checkForEmptyInputs([input])) return
    if (input.type !== 'email') return

    if (!emailRegex.test(input.value.trim())) {
      valid = false
      if (renderErrorMsg) {
        renderErrorMessage(
          input,
          ERROR_MESSAGES[input.name]?.invalid || 'Invalid email address',
        )
      }
    }
  })
  return valid
}

export const validatePasswordInput = (inputData, renderErrorMsg) => {
  let valid = true

  const allowedPasswordRegex = /^[A-Za-z0-9!@#$%&*._-]+$/

  inputData.forEach((input) => {
    if (!checkForEmptyInputs([input])) return
    if (input.name !== 'password') return

    const value = input.value.trim()

    if (!allowedPasswordRegex.test(value)) {
      valid = false
      if (renderErrorMsg) {
        renderErrorMessage(
          input,
          ERROR_MESSAGES[input.name]?.invalid ||
            'Password contains invalid characters',
        )
      }
    }
  })

  return valid
}

// password rules check setup
let hasAttachedInputListener = false
const passwordInput = document.getElementById('password')
if (!hasAttachedInputListener) {
  passwordInput.addEventListener('input', (e) => {
    updatePasswordChecklist(e.target.value)
  })
  hasAttachedInputListener = true
}

// rules
const ruleItems = {
  length: document.querySelector('[data-rule="length"]'),
  uppercase: document.querySelector('[data-rule="uppercase"]'),
  number: document.querySelector('[data-rule="number"]'),
  special: document.querySelector('[data-rule="special"]'),
}

// update checklist
const updatePasswordChecklist = (value) => {
  ruleItems.length.classList.toggle('valid', value.length >= 8)
  ruleItems.uppercase.classList.toggle('valid', /[A-Z]/.test(value))
  ruleItems.number.classList.toggle('valid', /\d/.test(value))
  ruleItems.special.classList.toggle('valid', /[!@#$%&*._-]/.test(value))
}

export const validatePasswordStrength = (inputData, renderErrorMsg) => {
  let valid = true

  // Run validation
  inputData.forEach((input) => {
    if (!checkForEmptyInputs([input])) return
    if (input.name !== 'password') return

    const value = input.value.trim()
    updatePasswordChecklist(value)

    if (
      value.length < 8 ||
      !/[A-Z]/.test(value) ||
      !/\d/.test(value) ||
      !/[!@#$%&*._-]/.test(value)
    ) {
      valid = false
    }
  })

  return valid
}

export const validateIfCountryWasSelected = (
  select,
  renderErrorMsg = false,
) => {
  const value = select.value
  const isValid = !!value && value.trim() !== ''

  if (!isValid && renderErrorMsg) {
    renderErrorMessage(select, ERROR_MESSAGES[select.name])
  }

  return isValid
}
