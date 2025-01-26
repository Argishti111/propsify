export function getFormatedDate(date) {
  if (!date) {
    return "";
  }
  const d = new Date(date);
  return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
}

export function getFormatedDateTime(date) {
  if (!date) {
    return "";
  }
  const d = new Date(date);
  const hour = d.getHours(),
    minute = d.getMinutes();

  return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()} ${
    hour < 10 ? "0" + hour : hour
  }:${minute < 10 ? "0" + minute : minute}`;
}
