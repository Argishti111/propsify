export function formatPhone(phoneNumber) {
  if (!phoneNumber) {
    return "";
  }
  return phoneNumber
    .replaceAll(" ", "")
    .split("")
    .reduce((k, c, i) => k + (i % 3 === 0 && i < 7 ? " " : "") + c, "")
    .substring(1);
}
