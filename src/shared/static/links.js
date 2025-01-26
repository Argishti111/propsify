import { HOST } from "../../services";

const links = {
  csvTemplate: `${HOST}/PrintMarketing/RecipientTemplate?fileExtension=.csv`,
  tsvTemplate: `${HOST}/PrintMarketing/RecipientTemplate?fileExtension=.tsv`,
  xlsxTemplate: `${HOST}/PrintMarketing/RecipientTemplate?fileExtension=.xlsx`,

  csvEmailTemplate: `${HOST}/EmailMarketing/RecipientTemplate?fileExtension=.csv`,
  tsvEmailTemplate: `${HOST}/EmailMarketing/RecipientTemplate?fileExtension=.tsv`,
  xlsxEmailTemplate: `${HOST}/EmailMarketing/RecipientTemplate?fileExtension=.xlsx`,
};
export default links;
