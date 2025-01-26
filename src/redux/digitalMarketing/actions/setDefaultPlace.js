import { getGeoLocationsByName } from "../../../services";
import { SET_DEFAULT_PLACE } from "../types";

export const setDefaultPlace = (name) => {
  return (dispatch) => {
    getGeoLocationsByName(name).then((data) => {
      if (data.length) {
        dispatch({
          type: SET_DEFAULT_PLACE,
          payload: { place: data[0] },
        });
      }
    });
  };
};
