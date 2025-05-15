import { ERROR_MESSAGES } from '../errors/errorMessages.js'
import { renderErrorMessage } from '../errors/renderErrorMessage.js'

export const validatePasswordInput = (input, renderErrorMsg) => {
  let valid = true
  const allowedPasswordRegex = /^[A-Za-z0-9!@#$%&*._-]+$/
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

export const validatePasswordStrength = (
  input,
  renderErrorMsg,
  passwordInputHasBeenTouched,
) => {
  if (!passwordInputHasBeenTouched) return

  let valid = true

  // Run validation
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

  if (!valid) {
    input.setAttribute('aria-invalid', true)
    if (renderErrorMsg) {
      renderErrorMessage(
        input,
        'Your password is missing one or more required elements',
      )
    }
  } else {
    input.setAttribute('aria-invalid', false)
  }

  return valid
}
