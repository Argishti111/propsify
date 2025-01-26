import { actionEvent as defaultActionEvent } from "./events";
import pageTitles from "./pageTitles.json";
const PAGE_CATEGORY = "print-marketing";
const NEW_PRINT_CAMPAIGN = "new-print-campaign";

const actionEvent = (page_subcategory, page_title) =>
  defaultActionEvent(PAGE_CATEGORY, page_subcategory, page_title);

export default class PrintMarketingEventRecorder {
  static uploadCustomerList() {
    actionEvent(NEW_PRINT_CAMPAIGN, pageTitles.uploadCustomerList);
  }
  static configureEmailCampaign() {
    actionEvent(NEW_PRINT_CAMPAIGN, pageTitles.configureEmailCampaign);
  }
  static uploadArtwork() {
    actionEvent(NEW_PRINT_CAMPAIGN, pageTitles.uploadArtworkAndSchedule);
  }
  static reviewCampaign() {
    actionEvent(NEW_PRINT_CAMPAIGN, pageTitles.reviewCampaign);
  }
}
