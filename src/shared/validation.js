export const checkValidity = (value, rules) => {
  let isValid = true;
  if (!rules) {
    return true;
  }
  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
  }
  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }
  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }
  if (rules.isNumber) {
    isValid = !isNaN(value.trim()) && value !== "" && isValid;
  }
  if (rules.isEmail) {
    const indexOfAtSign = value.lastIndexOf("@");
    const indexOfDot = value.lastIndexOf(".");

    isValid =
      indexOfAtSign < indexOfDot &&
      indexOfAtSign > 0 &&
      value.indexOf("@@") === -1 &&
      indexOfDot > 2 &&
      value.length - indexOfDot > 2 &&
      isValid;
  }
  return isValid;
};
