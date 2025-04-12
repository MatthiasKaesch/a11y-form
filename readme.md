## Accessibility Highlights

- ✅ **Semantic Structure**  
  Uses proper HTML5 elements like `<fieldset>`, `<legend>`, and `<label>` to group and describe form inputs meaningfully.

- ✅ **Live Error Feedback**  
  Error messages are announced to assistive technologies using `role="alert"` and linked to inputs via `aria-describedby`.

- ✅ **Custom Select with Full Keyboard Support**

  - Implemented using ARIA roles (`combobox`, `listbox`, `option`)
  - Supports arrow navigation, type-ahead search, ESC to close, and `aria-activedescendant` for screenreader tracking

- ✅ **Required Fields Clearly Indicated**  
  Each required input is marked visually (`*`) and programmatically using `aria-required="true"`.

- ✅ **Accessible Validation Feedback**  
  Invalid fields are announced with context using `aria-invalid`, and each input is connected to its corresponding error message.

- ✅ **Focus Management**  
  Form is fully operable via keyboard (Tab, Shift+Tab), and focus does not get lost during validation or dropdown interaction.
