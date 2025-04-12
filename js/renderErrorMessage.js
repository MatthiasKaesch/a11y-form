export const renderErrorMessage = (HTMLElement, errorKey) => {
  const errorMsgTemplate = document.getElementById('error-msg')
  const errorMsg = errorMsgTemplate.content.cloneNode(true)
  const errorContainer = document.getElementById(`${HTMLElement.name}-error`)

  if (HTMLElement.name !== 'button') {
    HTMLElement.setAttribute('aria-invalid', '')
  }

  errorMsg.querySelector('p').innerText = errorKey
  errorContainer.appendChild(errorMsg)
}
