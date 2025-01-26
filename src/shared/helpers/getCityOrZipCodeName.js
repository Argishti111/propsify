export const getCityOrZipCodeName = (findSellersOrBuyers) => {
  return !!findSellersOrBuyers.zipCode &&
    findSellersOrBuyers.zipCode !== "All ZIP Codes"
    ? findSellersOrBuyers.zipCode
    : findSellersOrBuyers.city;
};
