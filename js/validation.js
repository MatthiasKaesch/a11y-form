const checkForEmptyInputs = (inputData, renderErrorMsg) => {
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

const checkForShortInputs = (inputData, renderErrorMsg) => {
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

const validateEmailInput = (inputData, renderErrorMsg) => {
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

const validatePasswordInput = (inputData, renderErrorMsg) => {
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
