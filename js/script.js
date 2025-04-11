const form = document.querySelector('#form-element')
const errorMsgTemplate = document.getElementById('error-msg')
const submitButton = document.querySelector('#submit-button')
const formInputs = Array.from(form.querySelectorAll('input'))

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

// Render error message
const renderErrorMessage = (HTMLElement, errorKey) => {
  const errorMsg = errorMsgTemplate.content.cloneNode(true)
  const errorContainer = document.getElementById(`${HTMLElement.name}-error`)

  if (HTMLElement.name !== 'button') {
    HTMLElement.setAttribute('aria-invalid', '')
  }

  errorMsg.querySelector('p').innerText = errorKey
  errorContainer.appendChild(errorMsg)
}

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
  ]

  const enableSubmitButton = requirements.some((requirement) => {
    return requirement === false
  })

  if (enableSubmitButton) {
    submitButton.setAttribute('aria-disabled', '')
    if (renderErrorMsg) {
      renderErrorMessage(submitButton, ERROR_MESSAGES.button)
    }
  } else {
    submitButton.removeAttribute('aria-disabled')
  }

  return enableSubmitButton
}
