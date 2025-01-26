import { actionEvent as defaultActionEvent } from "./events";
import pageTitles from "./pageTitles.json";
const PAGE_CATEGORY = "email-marketing";
const NEW_EMAIL_CAMPAIGN = "new-email-campaign";
const TEMPLATE_SETTINGS = "template-settings";
const SENDERS_EMAIL_ADDRESS = "senders-email-address";

const actionEvent = (page_subcategory, page_title) =>
  defaultActionEvent(PAGE_CATEGORY, page_subcategory, page_title);

export default class EmailMarketingEventRecorder {
  static uploadEmailList() {
    actionEvent(NEW_EMAIL_CAMPAIGN, pageTitles.uploadEmailList);
  }
  static setupCampaign() {
    actionEvent(NEW_EMAIL_CAMPAIGN, pageTitles.setUpCampagin);
  }
  static chooseTemplate() {
    actionEvent(NEW_EMAIL_CAMPAIGN, pageTitles.chooseTemplate);
  }
  static personalizeCampaign() {
    actionEvent(NEW_EMAIL_CAMPAIGN, pageTitles.personalizeCampaign);
  }
  static reviewAndConfirm() {
    actionEvent(NEW_EMAIL_CAMPAIGN, pageTitles.reviewAndConfirm);
  }
  static templateSettings() {
    actionEvent(TEMPLATE_SETTINGS, pageTitles.templateSettings);
  }
  static sendersEmailAddress() {
    actionEvent(SENDERS_EMAIL_ADDRESS, pageTitles.sendersEmailAddress);
  }
  static editTemplate() {
    actionEvent(TEMPLATE_SETTINGS, pageTitles.editTemplate);
  }
}
