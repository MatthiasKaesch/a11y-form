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

export const validatePasswordStrength = (inputData, renderErrorMsg) => {
  let valid = true

  const minLength = 8
  const allowedCharsRegex = /^[A-Za-z0-9!@#$%&*._-]+$/
  const hasNumber = /\d/
  const hasSpecial = /[!@#$%&*._-]/
  const hasUppercase = /[A-Z]/

  inputData.forEach((input) => {
    if (!checkForEmptyInputs([input])) return
    if (input.name !== 'password') return

    const value = input.value.trim()

    if (value.length < minLength) {
      valid = false
      if (renderErrorMsg) {
        renderErrorMessage(input, 'Password must be at least 8 characters long')
      }
    }

    if (!hasUppercase.test(value)) {
      valid = false
      if (renderErrorMsg) {
        renderErrorMessage(
          input,
          'Password must contain at least one uppercase letter',
        )
      }
    }

    if (!hasNumber.test(value)) {
      valid = false
      if (renderErrorMsg) {
        renderErrorMessage(input, 'Password must contain at least one number')
      }
    }

    if (!hasSpecial.test(value)) {
      valid = false
      if (renderErrorMsg) {
        renderErrorMessage(
          input,
          'Password must contain at least one special character (!@#$%&*._-)',
        )
      }
    }

    if (!allowedCharsRegex.test(value)) {
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
