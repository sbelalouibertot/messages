import { apiService } from "../../utils/utils";
import { actionsConstants } from "../../constants/actions";
import { apiConstants } from "../../constants/api";

const {
  UPDATE_REALTOR_START,
  UPDATE_REALTOR_FULFILLED,
  UPDATE_REALTOR_FAILED,
  GET_REALTOR_MESSAGES_START,
  GET_REALTOR_MESSAGES_FULFILLED,
  GET_REALTOR_MESSAGES_FAILED,
} = actionsConstants;

const { GET_REALTOR_MESSAGES } = apiConstants;

/**
 * Update current selected realtor
 * @category Redux/actions
 */
export const updateRealtor =
  (realtorId, { onSuccess } = {}) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_REALTOR_START });

      const realtors = getState().userReducer.details.realtors;
      const currentSelectedRealtorId = realtors.find(
        (realtor) => realtor.id === parseInt(realtorId)
      )?.id;

      dispatch({
        type: UPDATE_REALTOR_FULFILLED,
        data: currentSelectedRealtorId,
      });
      onSuccess?.();
    } catch (error) {
      console.error(error);
      dispatch({ type: UPDATE_REALTOR_FAILED, data: error });
    }
  };

/**
 * Get messages of a realtor
 * @category Redux/actions
 */
export const getRealtorMessages =
  (realtorId, { page = 1, pageSize = 10, onSuccess } = {}) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_REALTOR_MESSAGES_START });
      const realtorMessages = (
        await apiService(GET_REALTOR_MESSAGES(realtorId, page, pageSize))
      ).data;

      dispatch({
        type: GET_REALTOR_MESSAGES_FULFILLED,
        data: realtorMessages,
        isNextPageData: page > 1,
      });
      onSuccess?.();
    } catch (error) {
      console.error(error);
      dispatch({ type: GET_REALTOR_MESSAGES_FAILED, data: error });
    }
  };
