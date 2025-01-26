import { SET_EMAIL_ADDRESS_MANAGER_OPEN } from "../types";

export function setEmailAddressManagerOpen(open) {
  return {
    type: SET_EMAIL_ADDRESS_MANAGER_OPEN,
    payload: { open },
  };
}
