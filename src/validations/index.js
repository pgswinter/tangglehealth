import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
  let errorsInput = {};

  if (data.cost === "") {
    errorsInput.cost = 'This field is required';
  }
  if (data.description === ""){
    errorsInput.description = 'This field is required';
  }
  if(data.quantityPerson === ""){
    errorsInput.quantityPerson = 'This field is required';
  }

  return {
    errorsInput,
    isValidInput: isEmpty(errorsInput)
  }
}