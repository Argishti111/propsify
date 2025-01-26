/**
 *
 * @param {File} file
 * @returns {string} error message
 */
const errorMessage =
  "We could not upload your file because it isn't a format Propsify understands. Please choose only .xlsx ,.csv or .tsv file to upload. Try uploading the file again once you save it in a different format.";
const sizeError = "File size cannot exceed 4MB";

export function validateCustomerListFile(file) {
  if (!file) {
    return "Wrong data";
  }
  const fileType = file.name.split(".").pop();
  switch (true) {
    case !(fileType === "csv" || fileType === "tsv" || fileType === "xlsx"):
      return errorMessage;
    case file.size > 4300000:
      return sizeError;
    default:
      return "";
  }
}
