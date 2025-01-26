import { SET_TEMPLATE_MANAGER_OPEN } from "../types";

export function setTemplateManagerOpen(open) {
  return {
    type: SET_TEMPLATE_MANAGER_OPEN,
    payload: { open },
  };
}
