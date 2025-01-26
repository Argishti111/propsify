let subdomain = window.location.origin.split(".")[0].split("//")[1];

export let HOST;
switch (subdomain) {
  case "app":
    HOST = process.env.REACT_APP_PRODUCTION;
    break;
  case "staging":
    HOST = process.env.REACT_APP_STAGING;
    break;
  default:
    HOST = process.env.REACT_APP_DEVELOPMENT;
    break;
}
