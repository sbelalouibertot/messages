import { apiService } from "../../utils/utils";
import { actionsConstants } from "../../constants/actions";
import { apiConstants } from "../../constants/api";

const {
  GET_USER_DETAILS_START,
  GET_USER_DETAILS_FULFILLED,
  GET_USER_DETAILS_FAILED,
} = actionsConstants;

const { GET_USER_DETAILS } = apiConstants;

/**
 * Get user details (e.g related realtors, unread messages)
 * @category Redux/actions
 */
export const getUserDetails =
  ({ onSuccess } = {}) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_USER_DETAILS_START });
      const realtors = (await apiService(GET_USER_DETAILS())).data;
      dispatch({
        type: GET_USER_DETAILS_FULFILLED,
        data: { realtors },
      });
      onSuccess?.();
    } catch (error) {
      console.error(error);
      dispatch({ type: GET_USER_DETAILS_FAILED, data: error });
    }
  };
