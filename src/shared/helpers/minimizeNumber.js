export function minimizeNumber(numberValue) {
  return numberValue >= 1000000
    ? Math.round(numberValue / 10000) / 100 + "M"
    : numberValue >= 10000
    ? Math.round(numberValue / 100) / 10 + "K"
    : numberValue >= 1000
    ? (function () {
        let [num, ratNum] = numberValue.toString().split(".");
        num = num.replaceAll(",", "");
        if (ratNum) {
          ratNum = "0." + ratNum;
          num = +num + Math.round(+ratNum);
        }
        let secondPart = num % 1000;
        return (
          Math.floor(num / 1000) +
          "," +
          (secondPart >= 100 ? secondPart : "0" + secondPart)
        );
      })()
    : Math.round(numberValue * 100) / 100;
}
