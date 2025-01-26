export function checkMarketInsightsData(data, properties) {
  for (let property of properties) {
    if (!!data[property]) {
      return true;
    }
  }
  return false;
}
