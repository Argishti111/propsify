export function getMinAndMax(array, key = "value") {
  if (!array.length) {
    return [0, 0];
  }
  let max = array[array.length - 1][key];
  let min = max;
  array.forEach((item) => {
    min = Math.min(min, item[key]);
    max = Math.max(max, item[key]);
  });
  return [min, max];
}
