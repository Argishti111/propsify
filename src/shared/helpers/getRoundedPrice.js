export function getRoundedPrice(price) {
  let cent = (Math.round(price * 100) % 100) / 100;
  return Math.floor(price) + cent;
}
