import { HOST } from "../../services";

export function websiteIsReachable(website, callback) {
  var ac = new AbortController();

  const headers = { Authorization: localStorage.getItem("token") };

  fetch(`${HOST}/ppc/checkWebsite?website=${website}`, {
    method: "GET",
    headers,
  })
    .then((res) => res.json())
    .then((data) => {
      callback(data.success);
    })
    .catch(() => callback(false));

  return ac;
}

export function checkWebsite(website) {
  if (!website) {
    return false;
  }

  let regex = new RegExp(
    /^(http:\/\/|https:\/\/){0,1}([a-z]|[A-B]|[0-9]|-){1,63}((\.)+([a-z]|[A-B]|[0-9]|-){1,63})+(\/){0,1}(([A-Z]|[a-z]|[0-9]|[-._~!$&'()\*\+,;=:@])+(\/{0,1}))*(\?([A-Z]|[a-z]|[0-9]|[~!@$%^&*()-_=+[{\]}\\|;:',\.\/\?])*(\/{0,1}))*(#([A-Z]|[a-z]|[0-9]|[~!@$%^&*()-_=+[{\]}\\|;:',\.\/\?])*){0,1}$/
  );

  return regex.test(website);
}
