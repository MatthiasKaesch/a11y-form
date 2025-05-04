export const renderErrorMessage = (HTMLElement, errorKey) => {
  if (HTMLElement.tagName === 'BUTTON') return

  const errorMsgTemplate = document.getElementById('error-msg')
  const errorMsg = errorMsgTemplate.content.cloneNode(true)
  const errorContainer = document.getElementById(`${HTMLElement.name}-error`)

  if (HTMLElement.tagNname !== 'SELECT') {
    HTMLElement.setAttribute('aria-invalid', true)
  }

  if (HTMLElement.tagName === 'SELECT') {
    const customSelect = HTMLElement.nextElementSibling
    if (customSelect?.classList.contains('custom-select-container')) {
      customSelect.setAttribute('aria-invalid', 'true')
      customSelect.setAttribute('aria-describedby', `${HTMLElement.name}-error`)
    }
  }

  errorMsg.querySelector('p').innerText = errorKey
  errorContainer.appendChild(errorMsg)
}
