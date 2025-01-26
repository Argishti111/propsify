export function placeVariablesToContent(value, firstName, lastName) {
  return value
    .replace("[[First Name]]", firstName)
    .replace("[[Last Name]]", lastName);
}
