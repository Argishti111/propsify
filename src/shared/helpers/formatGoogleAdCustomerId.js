export function formatGoogleAdCustomerId(id) {
  let stringId = `${id}`;
  let result = `${stringId.substring(0, 3)}-${stringId.substring(
    3,
    6
  )}-${stringId.substring(6)}`;
  return result;
}
