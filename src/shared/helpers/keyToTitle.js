export function keyToTitle(key = "") {
  let title = key.split("_").join(" ");
  return title[0].toUpperCase() + title.substring(1);
}
