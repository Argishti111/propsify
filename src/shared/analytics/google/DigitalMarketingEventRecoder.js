import { actionEvent as defaultActionEvent } from "./events";
import pageTitles from "./pageTitles.json";
const PAGE_CATEGORY = "digital-marketing";
const DIGITAL_MARKETING = "digital-marketing";
const NEW_DIGITAL_CAMPAIGN = "new-digital-campaign";

const actionEvent = (page_subcategory, page_title) =>
  defaultActionEvent(PAGE_CATEGORY, page_subcategory, page_title);

export default class DigitalMarketingEventRecorder {
  static connectAdAccount() {
    actionEvent(DIGITAL_MARKETING, pageTitles.connectAdAccount);
  }
  static chooseAdAccount() {
    actionEvent(DIGITAL_MARKETING, pageTitles.chooseAdAccount);
  }
  static setupAdsAccount() {
    actionEvent(DIGITAL_MARKETING, pageTitles.setupGoogleAdsAccount);
  }

  static giveBusinessName() {
    actionEvent(NEW_DIGITAL_CAMPAIGN, pageTitles.giveUsYourBusinessName);
  }
  static adClickLocation() {
    actionEvent(NEW_DIGITAL_CAMPAIGN, pageTitles.adClickLocation);
  }
  static keywords() {
    actionEvent(NEW_DIGITAL_CAMPAIGN, pageTitles.keywordThemes);
  }
  static websiteReview() {
    actionEvent(NEW_DIGITAL_CAMPAIGN, pageTitles.afterClick);
  }
  static writeAd() {
    actionEvent(NEW_DIGITAL_CAMPAIGN, pageTitles.writeAd);
  }
  static adPlaces() {
    actionEvent(NEW_DIGITAL_CAMPAIGN, pageTitles.adPlaces);
  }
  static setBudget() {
    actionEvent(NEW_DIGITAL_CAMPAIGN, pageTitles.setBudget);
  }
  static reviewCampaign() {
    actionEvent(NEW_DIGITAL_CAMPAIGN, pageTitles.digitalCampaignReview);
  }
}
