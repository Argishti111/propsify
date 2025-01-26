export function validatePassword(password) {
  let errors = [];

  // check length
  if (password.length < 8 || password.length > 16) {
    errors.push("minimum 8 and maximum 16 characters");
  }

  // check if it contains lowwer case letter
  if (!/[a-z]/gm.test(password)) {
    errors.push("\na minimum of 1 lower case letter");
  }

  // check if it contains upper case letter
  if (!/[A-Z]/gm.test(password)) {
    errors.push("\na minimum of 1 upper case letter");
  }

  // check if it contains numberic character
  if (!/[0-9]/gm.test(password)) {
    errors.push("\na minimum of 1 numeric character");
  }

  // check if it contains special character
  if (!/[@$!%*.,_+(){}#?&><:;^]/gm.test(password)) {
    errors.push("a minimum of 1 special character (@$!%*.,_+(){}#?&><:;^)");
  }
  return errors;
}
