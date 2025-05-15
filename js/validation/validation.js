import { ERROR_MESSAGES } from '../errors/errorMessages.js'
import { renderErrorMessage } from '../errors/renderErrorMessage.js'

export const checkForEmptyInputs = (inputData, renderErrorMsg = false) => {
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
