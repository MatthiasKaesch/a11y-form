const checkForEmptyInputs = (inputData, renderErrorMsg) => {
  let valid = true
  inputData.forEach(input => {
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
  inputData.forEach(input => {
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
