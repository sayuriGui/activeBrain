import { useState } from "react";

function useInput(validateValue) {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTocuhed, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTocuhed;

  const valueChangedHandler = (event) => {
    setEnteredValue(event.target.value);
  };
  const inputBlurHandler = (event) => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    hasError,
    isValid: valueIsValid,
    valueChangedHandler,
    inputBlurHandler,
    reset,
  };
}

export default useInput;
