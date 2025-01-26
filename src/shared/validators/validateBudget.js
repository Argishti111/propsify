export function validateBudget(budget, min = 1.49, max = 9875.35) {
  // if (!budget) { //TODO: it was implemented as it was in google, but it got changed
  //   return "To continue enter a budget";
  // }
  // if (budget < min) {
  //   return `Minimum budget is $${min} per day`;
  // }
  // if (budget > max) {
  //   return `Maximum budget is $${max} per day`;
  // }
  if (!budget) {
    return "";
  }
  if (budget < min || budget > max) {
    return `Budget must be between ${min} and ${max} per day`;
  }
  return "";
}
