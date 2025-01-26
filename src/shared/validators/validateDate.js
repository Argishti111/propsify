export function validateDate(date, minDate) {
  date = new Date(date);
  if (minDate) {
    minDate.setHours(0, 0, 0, 0);
    return !!date && minDate <= date;
  }
  return !!date && date.getTime() === date.getTime();
}
