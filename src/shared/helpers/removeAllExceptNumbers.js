export function removeAllExceptNumbers(text) {
  if (!text) {
    return "";
  }
  return text.replaceAll(/[^0-9]/gm, "");
}
