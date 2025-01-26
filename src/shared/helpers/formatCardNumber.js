export function formatCardNumber(e) {
  let v = e.target.value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
  let matches = v.match(/\d{4,}/g);
  let match = (matches && matches[0]) || "";
  let parts = [];

  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }

  if (parts.length) {
    e.target.value = parts.join(" ");
  } else {
    e.target.value = e.target.value;
  }
  return e;
}
