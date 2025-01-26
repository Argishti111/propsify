export function checkBuyerInsightsData(data, properties) {
  const result = {};
  if (!data) {
    return null;
  }
  for (let property of properties) {
    for (let item of data) {
      if (item.group_name === property) {
        result[property] = item;
        break;
      }
    }
  }
  return result;
}
