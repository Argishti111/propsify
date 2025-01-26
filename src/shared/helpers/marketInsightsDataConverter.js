export function convertMarketInsights(targets, data) {
  return targets.map((target) => {
    target.values = [];
    target.description = data[0][target.id]?.description; // get the description of the target ** tooltip text **
    for (let item of data) {
      let obj = item[target.id]; // get the targeted object
      target.values.push(obj?.displayValue);
    }
    return target;
  });
}
