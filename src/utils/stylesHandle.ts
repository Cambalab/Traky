import "../components/LoginForm/LoginForm.css";

export const handleValidation = (fn: Function, data: any): boolean => {
  let validateResult = fn(data.data, data.event)
  if(data.elem && validateResult) {
    data.text.color = data.styles.correct
    data.elem.classList.remove(data.styles.classError)
  } else {
    data.text.color = data.styles.error
    data.elem.classList.add(data.styles.classError)
  }
  return validateResult
}
