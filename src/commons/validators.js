function Validators(value, rules) {
  function isRequired(value) {
    return value.trim() !== "";
  }

  function minLength(value, minLength) {
    return value.length >= minLength;
  }

  function emailValidator(value) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(value).toLowerCase());
  }

  function usernameValidator(value) {
    const containsDigits = /\d/;
    return (
      value !== value.toLowerCase() &&
      value !== value.toUpperCase() &&
      containsDigits.test(String(value))
    );
  }

  function passwordValidator(value) {
    const containsDigits = /\d/;
    const containSpecialCharacter = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return (
      value !== value.toLowerCase() &&
      value !== value.toUpperCase() &&
      containsDigits.test(String(value)) &&
      containSpecialCharacter.test(String(value))
    );
  }

  function nameValidator(value) {
    var containsOnlyLetters = /^[a-zA-Z]+$/;
    return containsOnlyLetters.test(value);
  }

  let isValid = true;
  for (let rule in rules) {
    switch (rule) {
      case "isRequired":
        isValid = isValid && isRequired(value);
        break;
      case "minLength":
        isValid = isValid && minLength(value, rules[rule]);
        break;
      case "emailValidator":
        isValid = isValid && emailValidator(value);
        break;
      case "usernameValidator":
        isValid = isValid && usernameValidator(value);
        break;
      case "passwordValidator":
        isValid = isValid && passwordValidator(value);
        break;
      case "nameValidator":
        isValid = isValid && nameValidator(value);
        break;
      default:
        isValid = true;
    }
  }
  return isValid;
}
export default Validators;
