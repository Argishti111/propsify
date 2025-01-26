export function toUtcString(datetime) {
  let d = new Date(datetime);
  let offset = d.getTimezoneOffset();
  d.setMinutes(d.getMinutes() + offset);
  return d;
}

export function toLocalDatetime(datetime) {
  let d = new Date(datetime);
  let offset = d.getTimezoneOffset();
  d.setMinutes(d.getMinutes() - offset);
  return d;
}
